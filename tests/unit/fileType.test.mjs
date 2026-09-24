import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aspectMismatch, detectFileType, fitWithin, UNWRAP_LIMITS } from '../../js/design/fileType.js';

const bytes = (...parts) => Uint8Array.from(parts.flatMap((p) => (typeof p === 'string' ? [...p].map((c) => c.charCodeAt(0)) : p)));

test('сигнатуры поддерживаемых форматов', () => {
  assert.equal(detectFileType(bytes([0x89], 'PNG', [0x0d, 0x0a, 0x1a, 0x0a, 0, 0])), 'png');
  assert.equal(detectFileType(bytes([0xff, 0xd8, 0xff, 0xe0])), 'jpeg');
  assert.equal(detectFileType(bytes('%PDF-1.7\n')), 'pdf');
});

test('узнанные, но неподдерживаемые: EPS, AI до CS, CDR', () => {
  assert.equal(detectFileType(bytes('%!PS-Adobe-3.0 EPSF-3.0')), 'postscript');
  assert.equal(detectFileType(bytes([0xc5, 0xd0, 0xd3, 0xc6, 0, 0])), 'eps');
  assert.equal(detectFileType(bytes('RIFF', [1, 2, 3, 4], 'CDRAvrsn')), 'cdr');
});

test('переименованный .exe — неизвестный тип', () => {
  assert.equal(detectFileType(bytes('MZ', [0x90, 0])), 'unknown');
  assert.equal(detectFileType(new Uint8Array(0)), 'unknown');
});

test('вписывание в пределы canvas iOS', () => {
  const [w, h] = fitWithin(20000, 5000, UNWRAP_LIMITS);
  assert.ok(w <= 8192 && h <= 8192 && w * h <= 16_777_216, `${w}×${h}`);
  assert.ok(Math.abs(w / h - 4) < 0.01, 'пропорции сохранены');
  const [a, b] = fitWithin(6000, 6000, UNWRAP_LIMITS);
  assert.ok(a * b <= 16_777_216 && a === b, `${a}×${b}`);
  assert.deepEqual(fitWithin(3000, 2000, UNWRAP_LIMITS), [3000, 2000], 'меньше пределов — без изменений');
});

test('расхождение пропорций', () => {
  assert.ok(aspectMismatch([3000, 2100], [300, 210]) < 0.001);
  assert.ok(aspectMismatch([3000, 2000], [300, 210]) > 0.02);
});
