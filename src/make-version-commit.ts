import path from 'path';
import simpleGit from 'simple-git/promise';
import { getAuthor } from './utils/get-author';

export async function makeVersionCommit(git: simpleGit.SimpleGit, packageJsonPath: path.ParsedPath, version: string, noAuthor: boolean, tagPrefix: string) {
  const packageJsonPathStr = path.format(packageJsonPath);
  const opts: simpleGit.Options = {};

  if (!noAuthor) {
    opts['--author'] = await getAuthor();
  }

  await git.add(packageJsonPathStr);
  await git.commit(`Version change for UPM release (${tagPrefix}${version})`, packageJsonPathStr, opts);
}
