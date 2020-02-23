import gitSnapshot from "git-snapshot";
import path from "path";

export async function executeSnapshot(
  packageJsonPath: path.ParsedPath,
  version: string
) {
  const pathStr = packageJsonPath.dir;

  return gitSnapshot({
    prefix: pathStr,
    branch: "upm",
    message: `Release ${version}`,
    author: "snapshot",
    force: false,
    tag: version,
    remote: "origin",
    dryRun: false,
    cwd: process.cwd()
  });
}
