import gitSnapshot from "git-snapshot";
import path from "path";
import { findRepoRoot } from "./utils/find-repo-root";
import { getAuthor } from "./utils/get-author";

export async function executeSnapshot(
  packagePath: path.ParsedPath,
  version: string,
  branch: string,
  noPush: boolean,
  noAuthor: boolean,
  force: boolean,
  tagPrefix: string
) {
  const packagePathStr = packagePath.dir;
  const gitRepoPath = await findRepoRoot(packagePath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const opts: any = {
    prefix: packagePathStr,
    branch,
    message: `UPM release ${tagPrefix}${version}`,
    force,
    tag: tagPrefix + version,
    dryRun: false,
    cwd: gitRepoPathStr
  };

  if (!noPush) {
    opts.remote = "origin";
  }

  if (!noAuthor) {
    opts.author = await getAuthor();
  }

  return gitSnapshot(opts);
}
