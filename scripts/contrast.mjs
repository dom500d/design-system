// Fails if a token pair drops below WCAG AA in either theme, and if the two
// dark blocks in tokens.css drift apart.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(root, 'src/tokens.css'), 'utf8');

const tokens = (block) =>
  Object.fromEntries([...block.matchAll(/--ds-([a-z0-9-]+):\s*(#[0-9a-f]{6})/g)].map((m) => [m[1], m[2]]));

const blocks = [...css.matchAll(/(:root(?:\[data-theme='dark'\]|:not\(\[data-theme='light'\]\))?) \{([^}]*)\}/g)];
const pick = (selector) => blocks.find((b) => b[1] === selector)[2];

const light = tokens(pick(':root'));
const os = tokens(pick(":root:not([data-theme='light'])"));
const explicit = tokens(pick(":root[data-theme='dark']"));

const failures = [];
if (JSON.stringify(os) !== JSON.stringify(explicit)) failures.push('The two dark blocks differ');

const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = 4.5;
const GRAPHIC = 3;
const pairs = [
  ['fg', 'bg', TEXT], ['fg', 'surface', TEXT], ['fg2', 'bg', TEXT], ['fg2', 'surface', TEXT], ['fg2', 'sunken', TEXT],
  ['accent', 'bg', TEXT], ['accent', 'surface', TEXT], ['on-fill', 'fill', TEXT], ['on-fill', 'fill-hover', TEXT],
  ['second', 'bg', TEXT], ['second', 'surface', TEXT],
  ['good', 'surface', TEXT], ['warn', 'surface', TEXT], ['bad', 'surface', TEXT],
  ['good', 'bg', TEXT], ['warn', 'bg', TEXT], ['bad', 'bg', TEXT],
  ['bg', 'fg', TEXT],
  ['line-strong', 'surface', GRAPHIC], ['line-strong', 'bg', GRAPHIC],
  ['series-1', 'surface', GRAPHIC], ['series-2', 'surface', GRAPHIC], ['series-3', 'surface', GRAPHIC], ['series-4', 'surface', GRAPHIC],
];

for (const [name, theme] of [['light', light], ['dark', os]]) {
  for (const [a, b, min] of pairs) {
    const r = ratio(theme[a], theme[b]);
    if (r < min) failures.push(`${name}: ${a} on ${b} is ${r.toFixed(2)}:1, needs ${min}:1`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Contrast OK: ${pairs.length} pairs in 2 themes`);
