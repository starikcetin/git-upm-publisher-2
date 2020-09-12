import isGitDirty from 'is-git-dirty';
import path from 'path';
import { findRepoRoot } from './find-repo-root';

export async function isRepoDirty(packagePath: path.ParsedPath) {
  const repoPathStr = path.format(await findRepoRoot(packagePath));

  return new Promise((resolve, reject) => {
    const isDirty = isGitDirty(repoPathStr);

    if (isDirty === null) {
      reject(`Not a git repository (${repoPathStr}).`);
    } else {
      resolve(isDirty);
    }
  });
}
