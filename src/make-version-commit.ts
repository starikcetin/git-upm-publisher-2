import path from "path";
import { findRepoRoot } from "./utils/find-repo-root";
import simpleGit from "simple-git/promise";

export async function makeVersionCommit(
  packageJsonPath: path.ParsedPath,
  version: string
) {
  const packageJsonPathStr = path.format(packageJsonPath);
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const git = simpleGit(gitRepoPathStr);

  await git.add(packageJsonPathStr);
  await git.commit(
    `version change for upm release (${version})`,
    packageJsonPathStr,
    {
      "--author":
        "git-upm-publisher <https://github.com/starikcetin/git-upm-publisher-2/>"
    }
  );
}
