// Оверлей производительности для разработки: ?debug=perf. Подключается только
// там, где разрешён отладочный API (config.security.debugApi), — в проде его нет.
//
// Кадры считаются по реальным отрисовкам конвейера: рендер идёт по
// требованию, и частота rAF ничего не говорит о нагрузке.

export function mountPerfOverlay(viewer) {
  const box = document.createElement('pre');
  box.style.cssText =
    'position:fixed;z-index:999;left:8px;top:8px;margin:0;padding:8px 10px;font:11px/1.45 ui-monospace,Consolas,monospace;' +
    'color:#d7ffd9;background:rgba(0,0,0,.78);border-radius:8px;pointer-events:none;white-space:pre';
  document.body.appendChild(box);

  const gl = viewer.renderer.getContext();
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const gpu = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);

  let frames = 0;
  let frameMs = 0;
  // Статистика за весь кадр, а не за последний проход постобработки.
  viewer.renderer.info.autoReset = false;
  const render = viewer.pipeline.render.bind(viewer.pipeline);
  viewer.pipeline.render = () => {
    const start = performance.now();
    viewer.renderer.info.reset();
    render();
    frameMs += performance.now() - start;
    frames++;
  };

  let last = performance.now();
  setInterval(() => {
    const now = performance.now();
    const seconds = (now - last) / 1000;
    last = now;
    const { calls, triangles } = viewer.renderer.info.render;
    const { textures, geometries } = viewer.renderer.info.memory;
    const heap = performance.memory ? `${Math.round(performance.memory.usedJSHeapSize / 1048576)} МБ` : '—';
    box.textContent = [
      `кадров/с  ${(frames / seconds).toFixed(1)}`,
      `CPU кадра ${frames ? (frameMs / frames).toFixed(1) : '—'} мс`,
      `вызовов   ${calls}  треугольников ${triangles}`,
      `текстур   ${textures}  геометрий ${geometries}`,
      `JS heap   ${heap}  DPR ${viewer.renderer.getPixelRatio()}`,
      gpu,
    ].join('\n');
    frames = 0;
    frameMs = 0;
  }, 1000);
}
