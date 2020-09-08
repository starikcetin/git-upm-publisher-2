import path from "path";
import simpleGit from "simple-git/promise";
import { findRepoRoot } from "./find-repo-root";

/**
 * Checks if the given branch exists on the given remote.
 * 
 * This function does not check if the remote exists. For that purpose, use `hasRemote` function.
 */
export async function hasRemoteBranch(
  packageJsonPath: path.ParsedPath,
  remoteName: string,
  branchName: string
) {
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const git = simpleGit(gitRepoPathStr);
  
  const listRemote = await git.listRemote(["--heads", remoteName, branchName]);
  const isResultEmpty = listRemote.trim().length <= 0;
  return !isResultEmpty;
}
