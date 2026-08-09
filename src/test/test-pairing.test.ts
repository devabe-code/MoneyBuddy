import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const enforcedRoots = ['src/design-system', 'src/features', 'src/navigation', 'src/test/fixtures'];
const exemptFiles = new Set(['src/design-system/components.ts']);

function productionModules(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const absolutePath = path.join(directory, entry);
    if (statSync(absolutePath).isDirectory()) return productionModules(absolutePath);
    if (!/\.(ts|tsx)$/.test(entry) || /\.test\.(ts|tsx)$/.test(entry)) return [];
    return [absolutePath];
  });
}

describe('test pairing convention', () => {
  it('keeps an adjacent test beside every production module in enforced source areas', () => {
    const missingTests = enforcedRoots
      .flatMap(productionModules)
      .filter((modulePath) => !exemptFiles.has(modulePath))
      .filter((modulePath) => {
        const extension = path.extname(modulePath);
        return !statSafe(modulePath.slice(0, -extension.length) + `.test${extension}`);
      });

    expect(missingTests).toEqual([]);
  });
});

function statSafe(filePath: string) {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}
