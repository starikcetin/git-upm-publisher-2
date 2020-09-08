import path from "path";
import simpleGit from "simple-git/promise";
import { findRepoRoot } from "./find-repo-root";

/**
 * Checks if the given branch exists locally.
 */
export async function hasLocalBranch(
  packageJsonPath: path.ParsedPath,
  branchName: string
) {
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const git = simpleGit(gitRepoPathStr);
  
  const localBranches = await git.branchLocal();
  return localBranches.branches.hasOwnProperty(branchName);
}
