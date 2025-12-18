#!/usr/bin/env bun

import fs from 'fs/promises';
import { createHash } from 'crypto';
import { marked } from 'marked';
import { join } from 'path';

const __dirname = import.meta.dirname;

const TEMPLATES_DIR = join(__dirname, '..', 'templates');
const POSTS_DIR = join(__dirname, '..', 'posts');
const OUT_POSTS_DIR = join(__dirname, '..', 'public', 'p');

export async function build() {
  await fs.mkdir(OUT_POSTS_DIR, { recursive: true });

  const baseTemplatePath = join(TEMPLATES_DIR, 'base.html');
  const baseTemplate = await fs.readFile(baseTemplatePath, 'utf8');
  if (!baseTemplate.includes('{{content}}')) {
    throw new Error(`FATAL: ${baseTemplatePath} missing {{content}}`);
  }

  const files = await fs.readdir(POSTS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const mdPath = join(POSTS_DIR, file);
    let content = await fs.readFile(mdPath, 'utf8');
    content = content.replace(/^\uFEFF/, ''); // strip BOM

    const htmlContent = marked.parse(content);
    const hash = createHash('sha1').update(content).digest('hex').slice(0, 8);
    const outPath = join(OUT_POSTS_DIR, `${hash}.html`);

    const finalHtml = baseTemplate
      .replace('{{content}}', htmlContent)
      .replace('{{title}}', file.slice(0, -3));

    await fs.writeFile(outPath, finalHtml);
  }

  return files.filter(f => f.endsWith('.md')).length;
}

if (import.meta.main) {
  const count = await build();
  console.log(`✅ Built ${count} posts`);
}