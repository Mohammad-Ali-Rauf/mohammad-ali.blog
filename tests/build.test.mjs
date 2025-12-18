import { test } from 'bun:test';
import { readdir, readFile } from 'fs/promises';
import { build } from '../scripts/build.mjs'; // export build() from build.mjs

test("build generates deterministic URLs", async () => {
  await build(); // make it a function
  const files = await readdir('./public/p');
  const hashes = files.map(f => f.replace('.html', ''));
  // assert all are 8-char hex
  hashes.forEach(h => {
    if (!/^[a-f0-9]{8}$/.test(h)) throw new Error(`Bad hash: ${h}`);
  });
});

test("base template interpolation works", async () => {
  await build();
  const html = await readFile('./public/p/0b8f7238.html', 'utf8');
  if (!html.includes('<h1>printer-pwn</h1>')) throw new Error("Title missing");
});