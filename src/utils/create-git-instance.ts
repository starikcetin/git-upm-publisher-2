import path from 'path';
import simpleGit from 'simple-git/promise';
import { findRepoRoot } from './find-repo-root';

/**
 * Creates a `SimpleGit` instance that uses the git repository containing the given `packageJsonPath`
 */
export async function createGitInstance(packageJsonPath: path.ParsedPath) {
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);
  return simpleGit(gitRepoPathStr);
}
