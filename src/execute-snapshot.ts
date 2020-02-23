import gitSnapshot from "git-snapshot";
import path from "path";
import { findRepoRoot } from "./utils/find-repo-root";

export async function executeSnapshot(
  packagePath: path.ParsedPath,
  version: string,
  noPush: boolean,
  force: boolean,
  tagPrefix: string
) {
  const packagePathStr = packagePath.dir;
  const gitRepoPath = await findRepoRoot(packagePath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const opts: any = {
    prefix: packagePathStr,
    branch: "upm",
    message: `upm release ${version}`,
    author: "git-upm-publisher",
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
