import path from 'path';
import simpleGit from 'simple-git/promise';
import { findRepoRoot } from './find-repo-root';

/**
 * Checks if there is a remote with the given name.
 */
export async function hasRemote(packageJsonPath: path.ParsedPath, remoteName: string) {
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);

  const git = simpleGit(gitRepoPathStr);

  const remotes = await git.getRemotes(false);
  return remotes.some(r => r.name === remoteName);
}
