import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assertValidPortfolioContent } from '../src/data/normalizePortfolio.js';

const root = resolve(import.meta.dirname, '..');
const contentPath = resolve(root, 'src/data/portfolioContent.json');

function localAsset(value) {
  if (typeof value !== 'string' || !value.trim() || /^(https?:\/\/|mailto:|#)/i.test(value)) return null;
  return value.replace(/^\/+/, '');
}

try {
  const raw = await readFile(contentPath, 'utf8');
  const content = assertValidPortfolioContent(JSON.parse(raw));
  const references = [content.personal.image, content.personal.resume];
  for (const project of content.projects) {
    references.push(project.image, ...Object.values(project.links), ...project.evidence.map(item => item.url));
  }
  for (const certificate of content.certificates) references.push(certificate.image);

  const missing = [];
  for (const value of new Set(references.map(localAsset).filter(Boolean))) {
    try { await access(resolve(root, 'public', value)); }
    catch { missing.push(value); }
  }
  if (missing.length) throw new Error(`ไม่พบ local asset:\n- ${missing.join('\n- ')}`);
  console.log(`ตรวจข้อมูลผ่าน: ${content.projects.length} โปรเจกต์, ${content.activities.length} กิจกรรม, ${content.certificates.length} ใบรับรอง, 5 กลุ่มทักษะ`);
} catch (error) {
  console.error(`ตรวจข้อมูลไม่ผ่าน\n${error.message}`);
  process.exitCode = 1;
}
