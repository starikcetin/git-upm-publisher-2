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
    author:
      "git-upm-publisher <https://github.com/starikcetin/git-upm-publisher-2/>",
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
