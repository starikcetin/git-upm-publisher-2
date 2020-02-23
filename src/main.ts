import path from "path";
import { args } from "./args";
import { executeSnapshot } from "./execute-snapshot";
import { updateVersion } from "./update-version";
import { checkFileReadWrite } from "./utils/check-file-read-write";
import { checkRepoStatus } from "./utils/check-repo-status";
import { getPackageJsonPath } from "./utils/get-package-json-path";

const force = !!args.force;
const noPush = !!args.noPush;
const noCommit = !!args.noCommit;
let packagePath: path.ParsedPath;
let tagPrefix = args.tagPrefix;

export async function main() {
  await handleArgs();

  if (!packagePath) {
    packagePath = await getPackageJsonPath();
    console.log("<main> 'package.json' path:", path.format(packagePath));
  }

  if (!force) {
    await checkRepoStatus(packagePath);
    console.log("<main> Git working tree is clean.");
  }

  const newVersion = await updateVersion(packagePath);
  console.log("<main> New version:", newVersion);

  await executeSnapshot(packagePath, newVersion, noPush, force, tagPrefix);
}

async function handleArgs() {
  if (force) {
    console.log("<args> Using force.");
  }

  if (args.package) {
    packagePath = path.parse(args.package);
    await checkFileReadWrite(packagePath);
  }
}
