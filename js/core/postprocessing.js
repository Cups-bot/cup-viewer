import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { AO_GROUND_LAYER, OBJECT_LAYER } from './layers.js';

// Конвейер отрисовки: сцена → затенение складок (AO) → тонмаппинг на экран.
//
// ЗАЧЕМ. Без ambient occlusion предмет выглядит плоским: свет из окружения
// приходит со всех сторон одинаково, и места, куда он физически не мог бы
// достать — внутренний угол стакана, стык стенки с донышком, зазор под
// ободком, — остаются такими же светлыми, как открытая стенка. Глаз читает это
// как «наклейка», а не «предмет». AO находит такие места по глубине и нормалям
// в уже отрисованном кадре и притемняет их.
//
// Взят GTAO (ground-truth AO) — из трёх реализаций в three.js он даёт самый
// правдоподобный результат при сравнимой цене.
//
// ПОРЯДОК ПРОХОДОВ ВАЖЕН. AO должен применяться к линейному изображению, ДО
// тонмаппинга: если притемнять уже сжатую в экранный диапазон картинку, тени
// уходят в грязь. Поэтому OutputPass (тонмаппинг + перевод в sRGB) стоит
// последним, а рендер до него идёт в буфер с расширенным диапазоном.
//
// Три.js сам отключает тонмаппинг, когда рисует не на экран, а в буфер, — так
// что двойного применения не происходит.

export class RenderPipeline {
  constructor({ renderer, scene, camera, config }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.config = config;

    const quality = config.quality ?? {};
    this.enabled = quality.postProcessing !== false;

    if (!this.enabled) return;

    const size = renderer.getDrawingBufferSize(new THREE.Vector2());

    // Собственный буфер вместо стандартного: нужен и расширенный диапазон
    // (HalfFloat), и аппаратное сглаживание. Композер по умолчанию создаёт
    // буфер без сглаживания, и края модели становятся лестницей — при переходе
    // на постобработку это первое, что бросается в глаза.
    this.target = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: quality.msaaSamples ?? 4,
    });

    this.composer = new EffectComposer(renderer, this.target);
    this.composer.setPixelRatio(renderer.getPixelRatio());

    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);

    // Невидимая опора под предметом — только для расчёта затенения.
    this.aoGround = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial(),
    );
    this.aoGround.name = 'AOGround';
    this.aoGround.layers.set(AO_GROUND_LAYER);
    scene.add(this.aoGround);

    // Отдельная камера для AO — копия основной, но со своей маской слоёв: без
    // вспомогательной обвязки и с невидимым полом.
    this.aoCamera = camera.clone();
    this.aoCamera.layers.set(OBJECT_LAYER);
    this.aoCamera.layers.enable(AO_GROUND_LAYER);

    this.gtao = new GTAOPass(scene, this.aoCamera, size.x, size.y);
    this.gtao.output = GTAOPass.OUTPUT.Default;
    this.setAmbientOcclusion(quality.ambientOcclusion ?? {});
    this.composer.addPass(this.gtao);

    // Тонмаппинг и перевод в sRGB. Настройки берёт с рендерера, поэтому
    // config.renderer.toneMapping продолжает работать как раньше.
    this.composer.addPass(new OutputPass());
  }

  // Параметры затенения складок. radius — в мировых единицах: модель
  // нормализована к размеру 0.5, поэтому осмысленные значения — сотые доли.
  setAmbientOcclusion(options = {}) {
    if (!this.gtao) return;
    const ao = { ...(this.config.quality?.ambientOcclusion ?? {}), ...options };

    this.gtao.enabled = ao.enabled !== false;
    this.gtao.blendIntensity = ao.intensity ?? 1;
    this.gtao.updateGtaoMaterial({
      radius: ao.radius ?? 0.06,
      distanceExponent: ao.distanceExponent ?? 1,
      thickness: ao.thickness ?? 0.3,
      scale: ao.scale ?? 1,
      samples: ao.samples ?? 16,
      screenSpaceRadius: false,
    });
  }

  // Ставит невидимую опору на уровень основания модели.
  setGroundHeight(y) {
    if (this.aoGround) this.aoGround.position.y = y;
  }

  // Показать только карту AO — чтобы подбирать radius и scale вживую.
  // Из консоли: cupViewer.debugAO(true)
  showAmbientOcclusionOnly(on) {
    if (!this.gtao) return;
    this.gtao.output = on ? GTAOPass.OUTPUT.Denoise : GTAOPass.OUTPUT.Default;
  }

  render() {
    if (!this.enabled) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    // Камера AO повторяет основную, но со своей маской слоёв. copy() переносит
    // и маску, поэтому её приходится восстанавливать после каждого копирования.
    this.aoCamera.copy(this.camera);
    this.aoCamera.layers.set(OBJECT_LAYER);
    this.aoCamera.layers.enable(AO_GROUND_LAYER);
    this.composer.render();
  }

  setSize(width, height) {
    if (!this.enabled) return;
    const ratio = this.renderer.getPixelRatio();
    this.composer.setPixelRatio(ratio);
    this.composer.setSize(width, height);
    this.gtao.setSize(width * ratio, height * ratio);
  }

  dispose() {
    if (!this.enabled) return;
    this.aoGround.geometry.dispose();
    this.aoGround.material.dispose();
    this.aoGround.removeFromParent();
    this.gtao.dispose?.();
    this.composer.dispose?.();
    this.target.dispose();
  }
}
