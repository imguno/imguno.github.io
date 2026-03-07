/**
 * 빌드 전에 최근 블로그 글 목록을 JSON으로 생성.
 * index.astro는 이 파일만 import하여 사용 (getCollection 호출 없음).
 *
 * 실행: node scripts/generate-recent-blog-posts.mjs
 * package.json build 스크립트에서 prebuild 또는 build 전에 실행.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const OUT_PATH = path.join(__dirname, '../src/generated/recent-blog-posts.json');
const TOP_N = 5;

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const block = match[1];
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      let value = m[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) value = new Date(value);
      data[m[1]] = value;
    }
  }
  return data;
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
const posts = [];

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = extractFrontmatter(content);
  if (!data || data.draft === true) continue;
  const slug = file.replace(/\.mdx$/, '');
  const publishDate = data.publishDate instanceof Date ? data.publishDate : new Date(data.publishDate);
  posts.push({
    slug,
    title: data.title || slug,
    publishDate,
  });
}

posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
const top = posts.slice(0, TOP_N).map((p) => ({
  slug: p.slug,
  title: p.title,
  date: p.publishDate.toISOString(),
  dateFormatted: p.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
}));

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(top, null, 2), 'utf-8');
console.log(`Wrote ${OUT_PATH} (${top.length} posts)`);
