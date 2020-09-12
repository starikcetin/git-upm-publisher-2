import path from 'path';
import { askNewVersion } from './utils/ask-new-version';
import { writeVersionToPackageJson } from './utils/write-version-to-package-json';

export async function updateVersion(packageJsonPath: path.ParsedPath, currentVersion: string) {
  const newVersion = await askNewVersion(currentVersion);
  await writeVersionToPackageJson(packageJsonPath, newVersion);
  return newVersion;
}
