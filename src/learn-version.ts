import path from "path";
import jsonfile from "jsonfile";

export async function learnVersion(packageJsonPath: path.ParsedPath) {
  const pathStr = path.format(packageJsonPath);
  const jsonData = await jsonfile.readFile(pathStr);
  return jsonData["version"];
}
