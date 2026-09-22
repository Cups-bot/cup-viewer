# Local capture review

1. `npm run build`
2. `npm run serve` (port 8000)
3. `node tests/capture-review.mjs`
4. `node tests/capture-review-server.mjs` (local-only port 8001)
5. Open `http://127.0.0.1:8001/capture-review.local.html` and click
   **Проверить снимок и видео**. Keep the tab visible during recording.

The fixture uses the real screenshot and video export methods with the manual
rotation ring enabled. It checks capture-frame visibility, restores the ring
and model angle, and reads the duration of the recorded video (12 s ± 0.75 s).
Inspect the PNG, video, and the button showing the 6-second frame visually.
The generated PNG/MP4 are written to `tests/output/` for closer review.

The test proxy permits local blob-video playback; production CSP is unchanged.
No photo-scene assets are modified by the fixture. Generated HTML and output
media are ignored by Git. Stop the test proxy after review.
