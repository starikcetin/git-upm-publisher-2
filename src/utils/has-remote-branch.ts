import simpleGit from "simple-git/promise";

/**
 * Checks if the given branch exists on the given remote.
 *
 * This function does not check if the remote exists. For that purpose, use `hasRemote` function.
 */
export async function hasRemoteBranch(
  git: simpleGit.SimpleGit,
  remoteName: string,
  branchName: string
) {
  const listRemote = await git.listRemote(["--heads", remoteName, branchName]);
  const isResultEmpty = listRemote.trim().length <= 0;
  return !isResultEmpty;
}
