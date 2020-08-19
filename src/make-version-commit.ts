import path from "path";
import simpleGit from "simple-git/promise";
import { findRepoRoot } from "./utils/find-repo-root";
import { getAuthor } from "./utils/get-author";

export async function makeVersionCommit(
  packageJsonPath: path.ParsedPath,
  version: string,
  noAuthor: boolean
) {
  const packageJsonPathStr = path.format(packageJsonPath);
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const git = simpleGit(gitRepoPathStr);

  const opts : simpleGit.Options = {};

  if (!noAuthor) {
    opts["--author"] = await getAuthor();
  }

  await git.add(packageJsonPathStr);
  await git.commit(
    `version change for upm release (${version})`,
    packageJsonPathStr,
    opts
  );
}
