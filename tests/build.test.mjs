import { test, expect } from 'bun:test';
import { build } from '../scripts/build.mjs';
import { readdir, readFile } from 'fs/promises';

test("build generates posts with content-based hashes", async () => {
  const count = await build();
  expect(count).toBeGreaterThan(0);

  const files = await readdir('./public/p');
  for (const file of files) {
    expect(file).toMatch(/^[a-f0-9]{8}\.html$/);
    
    const html = await readFile(`./public/p/${file}`, 'utf8');
    expect(html).toContain('<article>'); // or whatever your rendered HTML has
  }
});