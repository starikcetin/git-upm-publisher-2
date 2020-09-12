import path from 'path';
import { args } from './args';
import { executeSnapshot } from './execute-snapshot';
import { makeVersionCommit } from './make-version-commit';
import { updateVersion } from './update-version';
import { checkFileReadWrite } from './utils/check-file-read-write';
import { checkRepoStatus } from './utils/check-repo-status';
import { getPackageJsonPath } from './utils/get-package-json-path';
import { makePathAbsolute } from './utils/make-path-absolute';
import { pullUpmBranch } from './pull-upm-branch';
import { hasRemote } from './utils/has-remote';
import { hasRemoteBranch } from './utils/has-remote-branch';
import { hasLocalBranch } from './utils/has-local-branch';
import { learnVersion } from './utils/learn-version';

const branch = args.branch;
const force = !!args.force;
const noAuthor = !!args.noAuthor;
const noPush = !!args.noPush;
const noPull = !!args.noPull;
const noCommit = !!args.noCommit;
const tagPrefix = args.tagPrefix;
const remote = args.remote;

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

  const remoteExists = await hasRemote(packageJsonPath, remote);
  const remoteBranchExists = remoteExists && (await hasRemoteBranch(packageJsonPath, remote, branch));
  const localBranchExists = await hasLocalBranch(packageJsonPath, branch);

  const isFirstTime = !(remoteBranchExists || localBranchExists);

  if (localBranchExists && !remoteBranchExists) {
    console.warn(`<main> A branch named ${branch} exists locally, but not on the remote ${remote}. Pulling will be skipped.`);
  }

  if (isFirstTime) {
    console.log('<main> First time publishing. Version prompt will be skipped.');
  }

  if (!noPull && remoteBranchExists) {
    await pullUpmBranch(packageJsonPath, branch, remote);
  }

  const currentVersion = await learnVersion(packageJsonPath);
  const newVersion = isFirstTime ? currentVersion : await updateVersion(packageJsonPath, currentVersion);

  console.log(`<main> Version to publish: ${tagPrefix}${newVersion}`);

  if (!noCommit && !isFirstTime) {
    await makeVersionCommit(packageJsonPath, newVersion, noAuthor, tagPrefix);
  }

  await executeSnapshot(packageJsonPath, newVersion, branch, noPush, noAuthor, force, tagPrefix, remote);

  if (!noPull) {
    await pullUpmBranch(packageJsonPath, branch, remote);
  }
}

async function handleArgs() {
  if (force) {
    console.log('<args> Using force.');
  }

  if (args.package) {
    packageJsonPath = path.parse(args.package);
    await checkFileReadWrite(packageJsonPath);
  }
}
