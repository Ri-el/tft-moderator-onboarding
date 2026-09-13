import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const output = path.join(root, 'build');

async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const full = path.join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${full}`);
    return entry.isDirectory() ? filesIn(full) : [full];
  }));
  return nested.flat();
}

async function validateReference(reference, from) {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) return;
  const local = reference.split(/[?#]/)[0];
  if (!local) return;
  const target = path.resolve(path.dirname(from), local);
  assert.ok(target.startsWith(source + path.sep), `Asset leaves public directory: ${reference}`);
  await fs.access(target);
}

const files = await filesIn(source);
await fs.access(path.join(source, 'index.html'));
for (const file of files) {
  assert.ok(!/(?:^|[\\/])(?:\.env(?:\..*)?|[^\\/]+\.(?:pem|key))$/i.test(file), 'Private configuration in public assets');
  const ext = path.extname(file);
  if (ext === '.js') {
    const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    assert.equal(check.status, 0, check.stderr);
  }
  if (!['.html', '.js', '.css'].includes(ext)) continue;
  const text = await fs.readFile(file, 'utf8');
  const patterns = ext === '.html'
    ? [/(?:src|href)="([^"]+)"/g]
    : ext === '.css' ? [/url\(['"]?([^'"\)]+)['"]?\)/g]
    : [/from\s+['"]([^'"]+)['"]/g, /(?:src|href)="(assets\/[^"$]+)"/g];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) await validateReference(match[1], file);
  }
}

// Only this fixed, generated directory may be replaced by the build.
assert.equal(path.dirname(output), root);
assert.equal(path.basename(output), 'build');
await fs.rm(output, { recursive: true, force: true });
await fs.cp(source, output, { recursive: true });
for (const file of files) {
  const built = path.join(output, path.relative(source, file));
  assert.ok((await fs.readFile(file)).equals(await fs.readFile(built)), `Build changed ${file}`);
}
console.log(`Build succeeded: ${files.length} files validated and copied unchanged to build/.`);
