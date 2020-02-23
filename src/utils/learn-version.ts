import jsonfile from "jsonfile";
import path from "path";

export async function learnVersion(packageJsonPath: path.ParsedPath) {
  const pathStr = path.format(packageJsonPath);
  const jsonData = await jsonfile.readFile(pathStr);
  return jsonData["version"];
}
