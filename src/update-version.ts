import path from "path";
import { askNewVersion } from "./utils/ask-new-version";
import { learnVersion } from "./utils/learn-version";
import { writeVersionToPackageJson } from "./utils/write-version-to-package-json";

export async function updateVersion(packageJsonPath: path.ParsedPath) {
  const currentVersion = await learnVersion(packageJsonPath);
  const newVersion = await askNewVersion(currentVersion);
  await writeVersionToPackageJson(packageJsonPath, newVersion);
  return newVersion;
}
