import path from "path";
import { args } from "./args";
import { executeSnapshot } from "./execute-snapshot";
import { updateVersion } from "./update-version";
import { checkFileReadWrite } from "./utils/check-file-read-write";
import { checkRepoStatus } from "./utils/check-repo-status";
import { getPackageJsonPath } from "./utils/get-package-json-path";
import { makeVersionCommit } from "./make-version-commit";
import { makePathAbsolute } from "./utils/make-path-absolute";

const force = !!args.force;
const noPush = !!args.noPush;
const noCommit = !!args.noCommit;
let packageJsonPath: path.ParsedPath;
let tagPrefix = args.tagPrefix;

export async function main() {
  await handleArgs();

  if (!packageJsonPath) {
    packageJsonPath = await getPackageJsonPath();
  }

  packageJsonPath = makePathAbsolute(packageJsonPath);
  console.log("<main> 'package.json' path:", path.format(packageJsonPath));

  if (!force) {
    await checkRepoStatus(packageJsonPath);
  }

  const newVersion = await updateVersion(packageJsonPath);
  console.log("<main> New version:", newVersion);

  if (!noCommit) {
    await makeVersionCommit(packageJsonPath, newVersion);
  }

  await executeSnapshot(packageJsonPath, newVersion, noPush, force, tagPrefix);
}

async function handleArgs() {
  if (force) {
    console.log("<args> Using force.");
  }

  if (args.package) {
    packageJsonPath = path.parse(args.package);
    await checkFileReadWrite(packageJsonPath);
  }
}
