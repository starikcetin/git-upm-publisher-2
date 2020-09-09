import simpleGit from "simple-git/promise";

/**
 * Checks if there is a remote with the given name.
 */
export async function hasRemote(git: simpleGit.SimpleGit, remoteName: string) {
  const remotes = await git.getRemotes(false);
  return remotes.some((r) => r.name === remoteName);
}
