import { readFileSync } from 'node:fs';
import path from 'node:path';

type PackageManifest = Readonly<{
  scripts?: Readonly<Record<string, string>>;
}>;

const repositoryRoot = process.cwd();

const manifest = JSON.parse(
  readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'),
) as PackageManifest;

const workflow = readFileSync(path.join(repositoryRoot, '.github', 'workflows', 'ci.yml'), 'utf8');

describe('pull-request quality contract', () => {
  it('provides every required local quality script', () => {
    expect(manifest.scripts).toMatchObject({
      'format:check': 'prettier --check . --ignore-unknown',
      lint: 'eslint app src jest.setup.ts',
      test: 'jest --runInBand',
      typecheck: 'tsc --noEmit',
    });
  });

  it('includes formatting in the aggregate local completion gate', () => {
    expect(manifest.scripts?.check).toBe(
      'npm run format:check && npm run lint && npm run typecheck && npm run test',
    );
  });

  it.each([
    'npm ci',
    'npm run format:check',
    'npm run lint',
    'npm run typecheck',
    'npm run test',
    'npx expo-doctor@latest',
    'npx expo export --platform web --output-dir dist',
  ])('runs "%s" in CI', (command) => {
    expect(workflow).toContain(`run: ${command}`);
  });

  it('runs for pull requests and pushes targeting main', () => {
    expect(workflow).toMatch(/pull_request:\s*\n\s+branches: \[main\]/);
    expect(workflow).toMatch(/push:\s*\n\s+branches: \[main\]/);
  });

  it('keeps the required job name stable', () => {
    expect(workflow).toMatch(/verify:\s*\n\s+name: verify/);
  });

  it('does not allow required steps to fail silently', () => {
    expect(workflow).not.toContain('continue-on-error: true');
  });

  it('uses read-only repository permissions', () => {
    expect(workflow).toMatch(/permissions:\s*\n\s+contents: read/);
  });
});
