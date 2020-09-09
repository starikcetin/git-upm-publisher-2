import path from "path";
import simpleGit from "simple-git/promise";
import { findRepoRoot } from "./utils/find-repo-root";

export async function createGitInstance(packageJsonPath: path.ParsedPath) {
  const gitRepoPath = await findRepoRoot(packageJsonPath);
  const gitRepoPathStr = path.format(gitRepoPath);
  return simpleGit(gitRepoPathStr);
}
