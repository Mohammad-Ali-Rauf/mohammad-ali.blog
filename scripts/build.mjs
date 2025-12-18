#!/usr/bin/env bun

import fs from 'fs/promises';
import { createHash } from 'crypto';
import { marked } from 'marked';

export async function build() {
  const TEMPLATES_DIR = './templates';
  const POSTS_DIR = './posts';
  const OUT_POSTS_DIR = './public/p';

  await fs.mkdir(OUT_POSTS_DIR, { recursive: true });

  const baseTemplate = await fs.readFile(`${TEMPLATES_DIR}/base.html`, 'utf8');
  if (!baseTemplate.includes('{{content}}')) {
    throw new Error("FATAL: base.html missing {{content}}");
  }

  const files = await fs.readdir(POSTS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const mdPath = `${POSTS_DIR}/${file}`;
    let content = await fs.readFile(mdPath, 'utf8');
    content = content.replace(/^\uFEFF/, '');

    const htmlContent = marked.parse(content);
    const hash = createHash('sha1').update(content).digest('hex').slice(0, 8);
    const outPath = `${OUT_POSTS_DIR}/${hash}.html`;

    const finalHtml = baseTemplate
      .replace('{{content}}', htmlContent)
      .replace('{{title}}', file.slice(0, -3));

    await fs.writeFile(outPath, finalHtml);
  }

  return files.filter(f => f.endsWith('.md')).length;
}

// Allow direct execution
if (import.meta.main) {
  const count = await build();
  console.log(`✅ Built ${count} posts`);
}