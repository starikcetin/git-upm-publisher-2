import yargs from "yargs";

export const args = yargs
  .option("branch", {
    alias: "b",
    type: "string",
    default: "upm",
    description: "Name of the branch to publish the UPM package to."
  })
  .option("force", {
    alias: "f",
    type: "boolean",
    description: "Disable checks and execute snapshot with force flag."
  })
  .option("noAuthor", {
    alias: "a",
    type: "boolean",
    description: "Disable overriding the commit author for auto-commits made by this tool."
  })
  .option("noPush", {
    alias: "n",
    type: "boolean",
    description: "Disable auto-pushing of the UPM package branch to the origin."
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
