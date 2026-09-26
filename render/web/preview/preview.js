// Лёгкое превью кадра (ТЗ §6): снимок фона из камеры ракурса + настоящие
// 3D-стаканы поверх. Камера three.js — та же камера Blender, кадр — то же окно
// на плоскости изображения (fit.js), поэтому силуэты совпадают с рендером.
//
// Сцена живёт в осях Blender (Z вверх): вся она лежит в группе world,
// повёрнутой на −90° вокруг X. Модели стаканов (web/cups) выгружены в тех же
// осях и метрах; на сцену они встают через пустышку с масштабом сцены —
// ровно как в engine/bk/compose.py.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { ASPECTS, frameFor, size, stagePoint } from './fit.js';

const DEG = Math.PI / 180;

// Вид стакана в превью — нейтральный по типу; макет ляжет на этапе 4.
function lookFor(type) {
  if (type === 'pet') {
    return new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transmission: 0.92,
      thickness: 0.0003, ior: 1.57, transparent: true, opacity: 1 });
  }
  if (type === 'pp') {
    return new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2, roughness: 0.45, transmission: 0.55,
      thickness: 0.001, ior: 1.49 });
  }
  return new THREE.MeshStandardMaterial({ color: 0xf4f2ee, roughness: 0.75 });
}

// Контактная тень: мягкое пятно под дном. Тень от главного источника её не
// заменяет — у дна свет из панорамы перекрыт самим стаканом.
let contactTexture = null;
function contactShadow(rBotM) {
  if (!contactTexture) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(0,0,0,0.75)');
    grd.addColorStop(0.55, 'rgba(0,0,0,0.45)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    contactTexture = new THREE.CanvasTexture(c);
  }
  const size = rBotM * 2 * 1.45;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, toneMapped: false }));
  m.position.z = 0.0002;
  m.renderOrder = -1;
  m.userData.contact = true;
  return m;
}

export class Preview {
  constructor(canvas, { root = '..' } = {}) {
    this.root = root;
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Снимок фона уже прошёл цветовой конвейер Blender и тонмаппинг не
    // получает (sRGB-фон three.js не тонмапит); стаканам — экспозиция фона.
    this.renderer.toneMapping = THREE.LinearToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.three = new THREE.Scene();
    this.world = new THREE.Group();
    this.world.rotation.x = -Math.PI / 2;           // Blender Z-вверх → three.js Y-вверх
    this.three.add(this.world);
    this.camera = new THREE.PerspectiveCamera();
    this.camera.matrixAutoUpdate = false;
    this.world.add(this.camera);
    this.cupLayer = new THREE.Group();
    this.world.add(this.cupLayer);
    // Тень стаканов на опору: плоскость-ловушка под площадкой и главный свет сцены.
    this.key = new THREE.DirectionalLight(0xffffff, 1.5);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.radius = 6;
    this.world.add(this.key, this.key.target);
    this.catcher = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.35 }));
    this.catcher.receiveShadow = true;
    this.world.add(this.catcher);
    const draco = new DRACOLoader().setDecoderPath(`${root}/vendor/draco/`);
    this.gltf = new GLTFLoader().setDRACOLoader(draco);
    this.models = new Map();
    this.backdrops = new Map();
    this.frameId = '1:1';
    this.cups = [];
    this.window = null;
  }

  async json(path) {
    const r = await fetch(`${this.root}/${path}`);
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    return r.json();
  }

  async loadCatalog() {
    if (!this.catalog) {
      const data = await this.json('cups/index.json');
      this.catalog = new Map(data.cups.map((c) => [c.id, c]));
    }
    return this.catalog;
  }

  async loadScene(id) {
    await this.loadCatalog();
    this.scene = await this.json(`scenes/${id}/scene.json`);
    this.sceneId = id;
    this.three.environment = null;
    this.stageLight();
    await this.setPreset(this.scene.presets[0].id);
    return this.scene;
  }

  // Свет и ловушка тени по scene.json: центр площадки, масштаб, главный источник.
  stageLight() {
    const sc = this.scene;
    const k = sc.unitsPerM;
    const o = new THREE.Vector3().fromArray(sc.stage.origin);
    this.renderer.toneMappingExposure = 2 ** (sc.color?.exposure || 0);
    const half = 0.4 * k;                              // ловушка 80×80 см вокруг места героя
    this.catcher.scale.set(2 * half, 2 * half, 1);
    this.catcher.position.copy(o).add(new THREE.Vector3(0, 0, 0.0002 * k));
    const dir = new THREE.Vector3().fromArray(sc.key?.direction || [0.3, -0.5, 0.8]).normalize();
    this.key.position.copy(o).addScaledVector(dir, 1.5 * k);
    this.key.target.position.copy(o);
    const cam = this.key.shadow.camera;
    cam.left = cam.bottom = -0.3 * k;
    cam.right = cam.top = 0.3 * k;
    cam.near = 0.01 * k;
    cam.far = 4 * k;
    cam.updateProjectionMatrix();
    this.key.shadow.bias = -0.0005;
  }

  async loadEnvironment() {
    if (!this.scene.environment) return;          // выгрузка без рендера: панорамы ещё нет
    const url = `${this.root}/scenes/${this.sceneId}/${this.scene.environment}`;
    const hdr = await new RGBELoader().loadAsync(url);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.three.environment = pmrem.fromEquirectangular(hdr).texture;
    hdr.dispose();
    pmrem.dispose();
  }

  async backdrop(preset) {
    if (!preset.backdrop) return null;             // снимка ещё нет — серый фон
    const url = `${this.root}/scenes/${this.sceneId}/${preset.backdrop}`;
    if (!this.backdrops.has(url)) {
      const tex = await new THREE.TextureLoader().loadAsync(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      this.backdrops.set(url, tex);
    }
    return this.backdrops.get(url);
  }

  async setPreset(id) {
    const preset = this.scene.presets.find((p) => p.id === id);
    if (!preset) throw new Error(`ракурса ${id} нет в ${this.sceneId}`);
    this.preset = preset;
    this.camera.matrix.fromArray(preset.camera.matrix);
    this.camera.near = preset.camera.near;
    this.camera.far = preset.camera.far;
    this.texture = await this.backdrop(preset);
    return preset;
  }

  setFrame(frameId) {
    if (!(frameId in ASPECTS)) throw new Error(`формат ${frameId}`);
    this.frameId = frameId;
  }

  async model(info) {
    if (!this.models.has(info.file)) {
      // Материалов у модели несколько (печать, внутренняя стенка, кромка) —
      // в glTF это отдельные примитивы, поэтому берётся вся сцена файла.
      this.models.set(info.file, this.gltf.loadAsync(`${this.root}/cups/${info.file}`).then((g) => g.scene));
    }
    return this.models.get(info.file);
  }

  // cups: [{id, posMm: [вправо, вглубь], floorMm, rotate}], первый — главный.
  async setCups(list) {
    const catalog = await this.loadCatalog();
    this.cupLayer.clear();
    this.cups = [];
    const s = this.scene.unitsPerM;
    const rot = this.scene.stage.cupRotationDeg;
    for (const c of list) {
      const info = catalog.get(c.id);
      if (!info) throw new Error(`стакана ${c.id} нет в web/cups/index.json`);
      // вариант модели — как в задании; по умолчанию тот же, что берёт рендер
      const file = info.variantFiles?.[c.variant] || info.file;
      const template = await this.model({ ...info, file });
      const holder = new THREE.Group();                 // пустышка сцены: место, поворот, масштаб
      holder.position.fromArray(stagePoint(this.scene, c.posMm || [0, 0], c.floorMm || 0));
      holder.rotation.set(rot[0] * DEG, rot[1] * DEG, rot[2] * DEG, 'ZYX');   // Euler XYZ Blender
      holder.scale.setScalar(s);
      const mesh = template.clone(true);
      const look = lookFor(info.type);
      mesh.traverse((o) => { if (o.isMesh) { o.material = look; o.castShadow = true; } });
      mesh.rotation.z = (c.rotate || 0) * DEG;          // --rotate: поворот в сетке вокруг оси
      holder.add(mesh);
      holder.add(contactShadow(info.rBotMm * 0.001));
      this.cupLayer.add(holder);
      this.cups.push({ ...c, posMm: c.posMm || [0, 0], floorMm: c.floorMm || 0, info, mesh });
    }
  }

  // Кадр, как его выберет рендер при тех же местах стаканов.
  autoFit() {
    const fit = frameFor(this.scene, this.preset, this.cups, this.frameId);
    this.window = fit.window;
    return fit;
  }

  setWindow(win) {
    this.window = win;
  }

  // Размер холста в пикселях при длинной стороне longSide — как у рендера.
  pixelSize(longSide) {
    const [w, h] = size(this.window);
    const a = w / h;
    return a >= 1 ? [longSide, Math.max(1, Math.round(longSide / a))]
      : [Math.max(1, Math.round(longSide * a)), longSide];
  }

  render({ longSide = 800, mask = false } = {}) {
    const [x0, x1, y0, y1] = this.window;
    const [pw, ph] = this.pixelSize(longSide);
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(pw, ph, false);
    const cam = this.camera;
    const n = cam.near;
    cam.projectionMatrix.makePerspective(x0 * n, x1 * n, y1 * n, y0 * n, n, cam.far);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
    // Снимок фона снят с запасом: кадр — вырез из него.
    const area = this.preset.backdropWindow;
    const [aw, ah] = size(area);
    if (mask) {
      this.three.background = new THREE.Color(0x000000);
    } else if (!this.texture) {
      this.three.background = new THREE.Color(0x8a8a8e);
    } else {
      const t = this.texture;
      t.repeat.set((x1 - x0) / aw, (y1 - y0) / ah);
      t.offset.set((x0 - area[0]) / aw, (y0 - area[2]) / ah);
      t.updateMatrix();
      this.three.background = t;
    }
    const white = mask ? new THREE.MeshBasicMaterial({ color: 0xffffff }) : null;
    const saved = [];
    if (white) {
      for (const c of this.cups) {
        c.mesh.traverse((o) => { if (o.isMesh) { saved.push([o, o.material]); o.material = white; } });
      }
    }
    const env = this.three.environment;
    if (mask) this.three.environment = null;
    this.catcher.visible = !mask;
    this.key.visible = !mask;
    this.cupLayer.traverse((o) => { if (o.userData.contact) o.visible = !mask; });
    this.three.updateMatrixWorld(true);
    this.renderer.render(this.three, cam);
    for (const [o, m] of saved) o.material = m;
    this.three.environment = env;
    return [pw, ph];
  }

  // Точка холста (пиксели) → луч в мир (оси Blender).
  rayAt(px, py, canvasW, canvasH) {
    const [x0, x1, y0, y1] = this.window;
    const tx = x0 + (px / canvasW) * (x1 - x0);
    const ty = y1 - (py / canvasH) * (y1 - y0);
    const m = new THREE.Matrix4().fromArray(this.preset.camera.matrix);
    const origin = new THREE.Vector3().setFromMatrixPosition(m);
    const dir = new THREE.Vector3(tx, ty, -1).transformDirection(m);
    return { origin, dir };
  }

  // Пересечение луча с полом площадки на высоте floorMm → место в мм.
  stageAt(px, py, canvasW, canvasH, floorMm = 0) {
    const { origin, dir } = this.rayAt(px, py, canvasW, canvasH);
    const sc = this.scene;
    const k = 0.001 * sc.unitsPerM;
    const z = sc.stage.origin[2] + floorMm * k;
    if (Math.abs(dir.z) < 1e-9) return null;
    const t = (z - origin.z) / dir.z;
    if (t <= 0) return null;
    const p = origin.addScaledVector(dir, t);
    const d = [p.x - sc.stage.origin[0], p.y - sc.stage.origin[1]];
    const r = sc.stage.right, f = sc.stage.fwd;
    return [(d[0] * r[0] + d[1] * r[1]) / k, (d[0] * f[0] + d[1] * f[1]) / k];
  }

  // Какой стакан под точкой холста (индекс) или -1.
  pick(px, py, canvasW, canvasH) {
    const { origin, dir } = this.rayAt(px, py, canvasW, canvasH);
    const toThree = (v) => new THREE.Vector3(v.x, v.z, -v.y);
    const ray = new THREE.Raycaster(toThree(origin), toThree(dir).normalize());
    let best = -1, dist = Infinity;
    this.cups.forEach((c, i) => {
      const hit = ray.intersectObject(c.mesh, true)[0];
      if (hit && hit.distance < dist) { dist = hit.distance; best = i; }
    });
    return best;
  }

  // Передвинуть стакан без пересборки (перетаскивание).
  moveCup(i, posMm, floorMm, rotate) {
    const c = this.cups[i];
    c.posMm = posMm;
    c.floorMm = floorMm;
    if (rotate != null) {
      c.rotate = rotate;
      c.mesh.rotation.z = rotate * DEG;
    }
    c.mesh.parent.position.fromArray(stagePoint(this.scene, posMm, floorMm));
  }

  // Подсветить стакан, которому место не годится.
  markCup(i, bad) {
    this.cups[i].mesh.traverse((o) => {
      if (o.isMesh) o.material.emissive?.setHex(bad ? 0x661111 : 0x000000);
    });
  }
}
