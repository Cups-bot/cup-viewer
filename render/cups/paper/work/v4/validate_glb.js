// node work/v4/validate_glb.js file.glb [out.json] — Khronos glTF-Validator report.
const fs = require('fs');
const path = require('path');
const validator = require(path.join(__dirname, '..', 'gltf_validation', 'node_modules', 'gltf-validator'));
const file = process.argv[2];
const data = new Uint8Array(fs.readFileSync(file));
validator.validateBytes(data, { uri: path.basename(file), maxIssues: 50 }).then((r) => {
  const out = { file: path.basename(file), issues: r.issues, info: r.info };
  if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 2));
  console.log(JSON.stringify({ errors: r.issues.numErrors, warnings: r.issues.numWarnings, infos: r.issues.numInfos,
    messages: r.issues.messages.slice(0, 10).map((m) => `${m.severity} ${m.code} ${m.message}`),
    drawCalls: r.info.drawCallCount, vertices: r.info.totalVertexCount, triangles: r.info.totalTriangleCount }));
}).catch((e) => { console.error(e); process.exit(1); });
