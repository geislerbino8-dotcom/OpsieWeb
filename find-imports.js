const fs = require('fs'), path = require('path');
const SRC = 'C:/OJT/OpsieWebsite/frontend/src';
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (/\.tsx?$/.test(e.name)) files.push(p);
});
walk(SRC);
const texts = files.map(f => ({ f, s: fs.readFileSync(f, 'utf8') }));

const targets = [
  { name: 'ContentContext', from: '@/App' },
  { name: 'WebContentContext', from: 'WebContentFrom' },
  { name: 'useConfirm', from: 'ConfirmContext' },
  { name: 'useAuth', from: 'useAuth' },
  { name: 'AuthProvider', from: 'useAuth' },
];

for (const t of targets) {
  console.log('\n=== ' + t.name + ' ===');
  for (const x of texts) {
    const rel = path.relative(SRC, x.f);
    // import { a, b } from '<from>'
    const re = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(x.s))) {
      const names = m[2].split(',').map(s => s.trim()).filter(Boolean);
      if (!names.some(n => n.replace(/^type\s+/, '') === t.name)) continue;
      const mod = m[3];
      const ok = mod === t.from || mod.endsWith('/' + t.from);
      if (!ok) continue;
      if (rel.replace(/\.tsx?$/, '') === t.from.split('/').pop()) continue; // self
      console.log('  ' + rel + '  <-  ' + names.join(', ') + '  from "' + mod + '"');
    }
  }
}
