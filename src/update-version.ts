import { learnVersion } from "./learn-version";
import prompts from "prompts";
import jsonfile from "jsonfile";
import path from "path";

export async function updateVersion(packageJsonPath: path.ParsedPath) {
  const currentVersion = await learnVersion(packageJsonPath);
  console.log("Current version:", currentVersion);
  const newVersion = await askNewVersion();
  await writeVersionToPackageJson(packageJsonPath, newVersion);
  return newVersion;
}

async function writeVersionToPackageJson(
  packageJsonPath: path.ParsedPath,
  version: string
) {
  const pathStr = path.format(packageJsonPath);
  let packageJsonData = await jsonfile.readFile(pathStr);
  packageJsonData["version"] = version;
  return jsonfile.writeFile(pathStr, packageJsonData);
}

async function askNewVersion() {
  while (true) {
    const newVersion = (
      await prompts({
        type: "text",
        name: "version",
        message: "New version:",
        validate: value => (value.toLowerCase() === "y" ? true : false)
      })
    ).version;

    if (await askApproval(newVersion)) {
      return newVersion;
    }
  }
}

async function askApproval(version: string) {
  console.log("Provisional new version:", version);

  return (
    await prompts({
      type: "confirm",
      name: "value",
      message: "Does it look correct?"
    })
  ).value;
}
