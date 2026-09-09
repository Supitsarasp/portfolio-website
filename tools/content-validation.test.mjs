import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assertValidPortfolioContent, normalizePortfolioContent } from '../src/data/normalizePortfolio.js';
import { createEmailDraft, validateContactForm } from '../src/utils/contact.js';

const current = JSON.parse(await readFile(new URL('../src/data/portfolioContent.json', import.meta.url), 'utf8'));

test('current portfolio content is valid and preserves all collections', () => {
  const result = assertValidPortfolioContent(current);
  assert.equal(result.projects.length, 8);
  assert.equal(result.activities.length, 3);
  assert.equal(result.certificates.length, 7);
  assert.deepEqual(Object.keys(result.skills), ['testing', 'tools', 'development', 'uxui', 'softSkills']);
});

test('reports precise paths for malformed content, duplicates, and unsafe schemes', () => {
  const broken = structuredClone(current);
  broken.projects[2].evidence = 'missing';
  broken.projects[1].id = broken.projects[0].id;
  broken.projects[0].links.github = 'javascript:alert(1)';
  const { errors } = normalizePortfolioContent(broken);
  assert.ok(errors.some(error => error.includes('projects[2].evidence')));
  assert.ok(errors.some(error => error.includes('projects[1].id')));
  assert.ok(errors.some(error => error.includes('projects[0].links.github')));
});

test('contact validation rejects whitespace and invalid email, then builds an encoded mail draft', () => {
  assert.equal(validateContactForm({ name: ' ', email: 'a@b.com', subject: 'งาน', message: 'สวัสดี' }).valid, false);
  assert.equal(validateContactForm({ name: 'อ๋อง', email: 'bad\n@example.com', subject: 'งาน', message: 'สวัสดี' }).valid, false);
  const draft = createEmailDraft('owner@example.com', { name: ' อ๋อง ', email: 'aong@example.com', subject: 'นัดสัมภาษณ์ & QA', message: ' สวัสดีครับ ' });
  assert.match(draft.mailto, /^mailto:owner@example\.com\?/);
  assert.ok(draft.mailto.includes('%26'));
  assert.ok(draft.preview.includes('อ๋อง'));
});
