import glob from "glob-promise";
import prompts from "prompts";
import path from "path";

export async function getPackageJsonPath(): Promise<path.ParsedPath> {
  const allPackageJsonsPaths = await glob("**/package.json");

  if (!allPackageJsonsPaths || allPackageJsonsPaths.length === 0) {
    throw "No 'package.json' found.";
  }

  if (allPackageJsonsPaths.length === 1) {
    console.log("Single package.json found:", allPackageJsonsPaths[0]);
    return path.parse(allPackageJsonsPaths[0]);
  } else {
    console.log("Multiple package.json files found:");

    for (let i = 0; i < allPackageJsonsPaths.length; i++) {
      const iteratingPackageJsonPath = allPackageJsonsPaths[i];
      console.log(`\t ${i}: ${iteratingPackageJsonPath}`);
    }

    const selectedPackageJsonIndex = (
      await prompts({
        type: "number",
        name: "index",
        message: "Pick an index:",
        validate: value =>
          value >= 0 && value < allPackageJsonsPaths.length
            ? true
            : "Invalid index."
      })
    ).index;

    const selectedPath = allPackageJsonsPaths[selectedPackageJsonIndex];
    return path.parse(selectedPath);
  }
}
