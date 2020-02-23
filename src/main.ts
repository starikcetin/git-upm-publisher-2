import { getPackageJsonPath } from "./get-package-json-path";
import { executeSnapshot } from "./execute-snapshot";
import path from "path";
import { updateVersion } from "./update-version";

export async function main() {
  const packageJsonPath = await getPackageJsonPath();
  console.log("<main> Selected package.json:", path.format(packageJsonPath));
  const newVersion = await updateVersion(packageJsonPath);
  console.log("<main> New version:", newVersion);
  await executeSnapshot(packageJsonPath, newVersion);
}
