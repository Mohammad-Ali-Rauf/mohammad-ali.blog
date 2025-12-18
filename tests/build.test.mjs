import { test, expect } from 'bun:test';
import { build } from '../scripts/build.mjs';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const __dirname = import.meta.dirname;
const PUBLIC_P_DIR = join(__dirname, '..', 'public', 'p');

test("build generates posts with content-based hashes", async () => {
  const count = await build();
  expect(count).toBeGreaterThan(0);

  const files = await readdir(PUBLIC_P_DIR);
  expect(files.length).toBe(count);

  for (const file of files) {
    expect(file).toMatch(/^[a-f0-9]{8}\.html$/);
    
    const htmlPath = join(PUBLIC_P_DIR, file);
    const html = await readFile(htmlPath, 'utf8');
    expect(html).toContain('<p>'); // marked wraps paragraphs in <p>
  }
});