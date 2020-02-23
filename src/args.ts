import yargs from "yargs";

export const args = yargs
  .option("force", {
    alias: "f",
    type: "boolean",
    description: "Disable checks and execute snapshot with force flag."
  })
  .option("noPush", {
    alias: "n",
    type: "boolean",
    description: "Disable auto-pushing of the upm branch to the origin."
  })
  .option("noCommit", {
    alias: "c",
    type: "boolean",
    description:
      "Disable the auto-commit before publishing that includes the version change in the 'package.json'."
  })
  .option("package", {
    alias: "p",
    type: "string",
    description:
      "Skip searching and use this package.json path (must include the 'package.json')."
  })
  .option("tagPrefix", {
    alias: "t",
    type: "string",
    default: "",
    description: "A prefix for the git tag."
  }).argv;
