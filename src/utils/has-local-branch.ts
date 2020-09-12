import simpleGit from 'simple-git/promise';

/**
 * Checks if the given branch exists locally.
 */
export async function hasLocalBranch(git: simpleGit.SimpleGit, branchName: string) {
  const localBranches = await git.branchLocal();
  return localBranches.branches.hasOwnProperty(branchName);
}
