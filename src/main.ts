import path from "path";
import { args } from "./args";
import { executeSnapshot } from "./execute-snapshot";
import { makeVersionCommit } from "./make-version-commit";
import { updateVersion } from "./update-version";
import { checkFileReadWrite } from "./utils/check-file-read-write";
import { checkRepoStatus } from "./utils/check-repo-status";
import { getPackageJsonPath } from "./utils/get-package-json-path";
import { makePathAbsolute } from "./utils/make-path-absolute";

const branch = args.branch;
const force = !!args.force;
const noAuthor = !!args.noAuthor;
const noPush = !!args.noPush;
const noCommit = !!args.noCommit;
const tagPrefix = args.tagPrefix;

let packageJsonPath: path.ParsedPath;

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
  console.log(`<main> New version: ${tagPrefix}${newVersion}`);

  if (!noCommit) {
    await makeVersionCommit(packageJsonPath, newVersion, noAuthor, tagPrefix);
  }

  await executeSnapshot(packageJsonPath, newVersion, branch, noPush, noAuthor, force, tagPrefix);
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
