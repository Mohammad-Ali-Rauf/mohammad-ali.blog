#!/usr/bin/env bun

import fs from 'fs/promises';
import { createHash } from 'crypto';
import { marked } from 'marked'; // lightweight, no DOM nonsense

const TEMPLATES_DIR = './templates';
const POSTS_DIR = './posts';
const PUBLIC_DIR = './public';
const OUT_POSTS_DIR = `${PUBLIC_DIR}/p`;

await fs.mkdir(OUT_POSTS_DIR, { recursive: true });

const baseTemplate = await fs.readFile(`${TEMPLATES_DIR}/base.html`, 'utf8');

const files = await fs.readdir(POSTS_DIR);
for (const file of files) {
  if (!file.endsWith('.md')) continue;

  const mdPath = `${POSTS_DIR}/${file}`;
  const content = await fs.readFile(mdPath, ' utf8');
  const htmlContent = marked.parse(content);

  // hash based on content (not filename) → prevents URL rot if you rename
  const hash = createHash('sha1').update(content).digest('hex').slice(0, 8);
  const outPath = `${OUT_POSTS_DIR}/${hash}.html`;

  const finalHtml = baseTemplate
    .replace('{{content}}', htmlContent)
    .replace('{{title}}', file.replace('.md', '')); // dumb but works

  await fs.writeFile(outPath, finalHtml);
}

// regenerate index.html manually or with a simple list
console.log('✅ Built posts');