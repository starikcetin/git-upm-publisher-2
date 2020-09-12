import path from 'path';

export async function checkPathEndsWith(pathToCheck: path.ParsedPath, expectedLastSegment: string) {
  const acualLastSegment = path.format(pathToCheck).split(path.sep).pop();

  if (acualLastSegment !== expectedLastSegment) {
    throw `Expected ${path} to end with ${expectedLastSegment}, but it ends with ${acualLastSegment}.`;
  }
}
