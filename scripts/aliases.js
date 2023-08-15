// @ts-check

// based on vue/core mono repo build system

// these aliases are shared between vitest and rollup
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const resolveEntryForPkg = (p) =>
  path.resolve(fileURLToPath(import.meta.url), `../../packages/${p}/src/index.js`);

const dirs = readdirSync(new URL('../packages', import.meta.url));

const entries = {
  medialayer: resolveEntryForPkg('medialayer')
};

const nonSrcPackages = ['utils', 'size-check'];

for (const dir of dirs) {
  const key = `@medialayer/${dir}`;
  if (
    dir !== 'medialayer' &&
    !nonSrcPackages.includes(dir) &&
    !(key in entries) &&
    statSync(new URL(`../packages/${dir}`, import.meta.url)).isDirectory()
  ) {
    entries[key] = resolveEntryForPkg(dir);
  }
}

export { entries };
