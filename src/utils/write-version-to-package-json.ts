import jsonfile from "jsonfile";
import path from "path";

export async function writeVersionToPackageJson(
  packageJsonPath: path.ParsedPath,
  version: string
) {
  const pathStr = path.format(packageJsonPath);
  let packageJsonData = await jsonfile.readFile(pathStr);
  packageJsonData["version"] = version;
  return jsonfile.writeFile(pathStr, packageJsonData, {
    spaces: 2
  });
}
