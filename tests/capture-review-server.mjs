// Proxy only for the local review fixture: allow playback of captured blobs.
// Production CSP and server stay unchanged.
import { createServer, request } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
createServer(async (req, res) => {
  const name = { '/__capture_review/png': 'capture.png', '/__capture_review/mp4': 'turn.mp4', '/__capture_review/webm': 'turn.webm' }[req.url];
  if (req.method === 'POST' && name) {
    if (req.headers.origin !== 'http://127.0.0.1:8001') {
      res.writeHead(403); res.end('Local review origin required'); return;
    }
    const parts = [];
    let size = 0;
    for await (const part of req) {
      size += part.length;
      if (size > 40_000_000) { res.writeHead(413); res.end(); return; }
      parts.push(part);
    }
    const output = new URL('./output/', import.meta.url);
    await mkdir(output, { recursive: true });
    await writeFile(new URL(name, output), Buffer.concat(parts));
    res.writeHead(200); res.end(name); return;
  }
  const upstream = request({ hostname: 'localhost', port: 8000, path: req.url, method: req.method }, (reply) => {
    const headers = { ...reply.headers };
    if (headers['content-security-policy']) headers['content-security-policy'] += "; media-src 'self' blob:";
    res.writeHead(reply.statusCode, headers);
    reply.pipe(res);
  });
  upstream.on('error', () => { res.writeHead(502); res.end('Start npm run serve on port 8000'); });
  req.pipe(upstream);
}).listen(8001, '127.0.0.1', () => console.log('http://127.0.0.1:8001/capture-review.local.html'));
