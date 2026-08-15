import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

type BoundaryRule = Readonly<{ forbidden: RegExp; root: string }>;

const rules: readonly BoundaryRule[] = [
  { root: 'src/domain', forbidden: /(?:react-native|expo|@\/src\/(?:bootstrap|design-system|features|services|test))/ },
  { root: 'src/services', forbidden: /@\/src\/(?:app|bootstrap|design-system|features|navigation|test)/ },
  { root: 'src/features', forbidden: /@\/src\/(?:bootstrap|services|test\/fixtures)/ },
  { root: 'src/design-system', forbidden: /@\/src\/(?:bootstrap|domain|features|services|test)/ },
  { root: 'app', forbidden: /@\/src\/(?:domain|services)/ },
];

function productionFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const filePath = path.join(directory, entry);
    if (statSync(filePath).isDirectory()) return productionFiles(filePath);
    return /\.(ts|tsx)$/.test(entry) && !/\.test\.(ts|tsx)$/.test(entry) ? [filePath] : [];
  });
}

describe('architecture import boundaries', () => {
  it.each(rules)('$root does not reach across forbidden layers', ({ forbidden, root }) => {
    const violations = productionFiles(root).filter((filePath) => forbidden.test(readFileSync(filePath, 'utf8')));
    expect(violations).toEqual([]);
  });
});
