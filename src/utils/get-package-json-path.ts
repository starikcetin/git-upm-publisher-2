import glob from 'glob-promise';
import path from 'path';

export async function getPackageJsonPath(): Promise<path.ParsedPath> {
  const allPackageJsonsPaths = await glob('./package.json');

  if (!allPackageJsonsPaths || allPackageJsonsPaths.length === 0) {
    throw "No 'package.json' file was found in the working directory.";
  } else if (allPackageJsonsPaths.length === 1) {
    return path.parse(allPackageJsonsPaths[0]);
  } else {
    throw "Multiple 'package.json' files are found in the working directory.";
  }
}
