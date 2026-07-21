import { CONFIG } from './config.js';
import { Viewer } from './Viewer.js';

/**
 * Application entry point. Boots the viewer once the DOM is ready and exposes
 * a tiny public API so a model or texture can be swapped in a single line —
 * from the console, another script, or your own UI:
 *
 *   loadModel('assets/models/8cups.glb');
 *   replaceTexture('assets/textures/mockup.jpg');
 *
 * For permanent changes, edit `js/config.js` instead — no logic required.
 */
function bootstrap() {
  const container = document.getElementById('canvas-container');
  if (!container) throw new Error('Missing #canvas-container element');

  const viewer = new Viewer(container, CONFIG);
  viewer.start();

  // Minimal, intentional global API (the single deliberate global).
  window.cupViewer = viewer;
  window.loadModel = (url) => viewer.loadModel(url);
  window.replaceTexture = (url) => viewer.textureManager.replaceTexture(url);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
