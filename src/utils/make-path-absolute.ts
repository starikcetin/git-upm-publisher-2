import path from "path";

export function makePathAbsolute(
  relativePath: path.ParsedPath
): path.ParsedPath {
  return path.parse(path.resolve(path.format(relativePath)));
}
