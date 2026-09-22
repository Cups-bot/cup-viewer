// The real Viewer methods and recorder are exercised; only file delivery is
// intercepted to make the PNG/video and assertions inspectable in the page.
const panel = document.createElement('section');
panel.id = 'capture-review';
const run = document.createElement('button');
run.textContent = 'Проверить снимок и видео';
const report = document.createElement('pre');
panel.append(run, report);
const reference = document.createElement('button');
reference.textContent = 'Контрольный кадр 3:2';
panel.prepend(reference);
reference.onclick = async () => {
  const viewer = window.cupViewer?.viewer;
  if (!viewer?.modelLoader.currentModel || run.disabled) return;
  run.disabled = true;
  results.length = 0;
  try {
    document.body.classList.add('capture-reference');
    if (viewer.autoRotate) viewer.toggleAutoRotate();
    viewer.modelLoader.currentModel.rotation.y = 0;
    viewer.resize();
    viewer.modelLoader.frameCurrentModel();
    await viewer.takeScreenshot();
    await Promise.all(results);
  } finally { run.disabled = false; }
};
document.body.append(panel);
const results = [];
const urls = [];
const write = (line) => { report.textContent += line + '\n'; };
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[download]');
  if (!run.disabled || !link?.href.startsWith('blob:')) return;
  event.preventDefault();
  results.push(fetch(link.href).then(async (response) => {
    const blob = await response.blob();
    const format = blob.type.startsWith('video/mp4') ? 'mp4' : blob.type.startsWith('video') ? 'webm' : 'png';
    if (location.port === '8001') await fetch(`/__capture_review/${format}`, { method: 'POST', body: blob });
    const url = URL.createObjectURL(blob);
    urls.push(url);
    const media = document.createElement(blob.type.startsWith('video') ? 'video' : 'img');
    media.src = url;
    if (media.tagName === 'VIDEO') {
      media.controls = true;
      media.muted = true;
      await new Promise((resolve, reject) => {
        media.onloadeddata = resolve;
        media.onerror = reject;
      });
      write(`Video: ${blob.type}, ${media.videoWidth}×${media.videoHeight}, ${media.duration.toFixed(2)} s`);
      if (Math.abs(media.duration - window.cupViewer.viewer.config.turnExport.duration) > 0.75) {
        throw new Error('Video duration does not match the configured turn duration');
      }
      const seek = document.createElement('button');
      seek.textContent = 'Кадр видео 6 секунд';
      seek.onclick = () => { media.currentTime = 6; };
      panel.append(seek);
    } else {
      await media.decode();
      write(`PNG: ${media.naturalWidth}×${media.naturalHeight}`);
    }
    panel.append(media);
  }));
}, true);
run.onclick = async () => {
  const viewer = window.cupViewer?.viewer;
  if (!viewer?.modelLoader.currentModel) { write('Модель ещё загружается'); return; }
  run.disabled = true;
  results.length = 0;
  report.textContent = '';
  if (viewer.autoRotate) viewer.toggleAutoRotate();
  if (!viewer.turntable.pinned) viewer.turntable.togglePinned();
  // Wait until the real ring fade is fully visible before the capture.
  await new Promise((resolve) => setTimeout(resolve, 500));
  const render = viewer.pipeline.render.bind(viewer.pipeline);
  let capturedFrames = 0;
  let ringLeaks = 0;
  viewer.pipeline.render = (...args) => {
    if (viewer.exporting || viewer.screenshotting) {
      capturedFrames++;
      if (viewer.turntable.group.visible) ringLeaks++;
    }
    return render(...args);
  };
  try {
    write(`Ring visible before: ${viewer.turntable.group.visible}`);
    const angle = viewer.getModelRotation();
    await viewer.takeScreenshot();
    write(`Ring restored after PNG: ${viewer.turntable.group.visible}`);
    await viewer.exportTurn();
    write(`Ring restored after video: ${viewer.turntable.group.visible}`);
    write(`Angle restored: ${Math.abs(viewer.getModelRotation() - angle) < 0.01}`);
    write(`Capture renders: ${capturedFrames}; ring leaks: ${ringLeaks}`);
    await Promise.all(results);
    write(ringLeaks === 0 && capturedFrames > 2 ? 'PASS' : 'FAIL');
  } catch (error) {
    write(`FAIL: ${error.stack}`);
  } finally {
    viewer.pipeline.render = render;
    run.disabled = false;
  }
};
window.addEventListener('pagehide', () => urls.forEach((url) => URL.revokeObjectURL(url)));
