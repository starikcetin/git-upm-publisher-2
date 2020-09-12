import findUp from 'find-up';
import path from 'path';

export async function findRepoRoot(fromPath: path.ParsedPath) {
  const fromPathStr = path.format(fromPath);

  const gitFolderStr = await findUp('.git', {
    cwd: fromPathStr,
    type: 'directory',
  });

  if (!gitFolderStr) {
    throw `Could not find the git repo root.`;
  }

  const gitFolderPathSegments = gitFolderStr.split(path.sep);
  const dotGit = gitFolderPathSegments.pop();

  if (dotGit !== '.git') {
    throw "The last segment of the path is not '.git'. This might be a bug with git-upm-publisher-2; please send a bug report at https://github.com/starikcetin/git-upm-publisher-2/issues";
  }

  const gitRootPath = gitFolderPathSegments.join(path.sep);

  return path.parse(gitRootPath);
}
