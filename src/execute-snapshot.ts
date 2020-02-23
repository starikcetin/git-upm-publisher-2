import gitSnapshot from "git-snapshot";
import path from "path";
import { findRepoRoot } from "./utils/find-repo-root";

export async function executeSnapshot(
  packageJsonPath: path.ParsedPath,
  version: string,
  noPush: boolean,
  force: boolean,
  tagPrefix: string
) {
  const packagePathStr = packageJsonPath.dir;
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const opts: any = {
    prefix: packagePathStr,
    branch: "upm",
    message: `upm release ${version}`,
    author: "snapshot",
    force: force,
    tag: tagPrefix + version,
    dryRun: false,
    cwd: gitRepoPathStr
  };

  if (!noPush) {
    opts.remote = "origin";
  }

  return gitSnapshot(opts);
}
