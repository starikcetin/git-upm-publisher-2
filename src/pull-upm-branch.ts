import path from "path";
import simpleGit from "simple-git/promise";
import { findRepoRoot } from "./utils/find-repo-root";

export async function pullUpmBranch(
    packageJsonPath: path.ParsedPath,
    upmBranchName: string,
    remoteName: string
) {
    const gitRepoPath = await findRepoRoot(packageJsonPath);
    const gitRepoPathStr = path.format(gitRepoPath);
  
    const git = simpleGit(gitRepoPathStr);

    try {
        /** 
         * The syntax is `git fetch remote branch:branch` which basically pulls the `branch` from `remote/branch` without switching to it.
         * Source: https://stackoverflow.com/a/17722977/6301627
         * 
         * If this method ever fails, we have another option:
         * 
         * ```ts
         * const currentBranch = ...;
         * if(localExists) { 
         *      git checkout branch
         *      git pull remote branch
         * } else {
         *      git checkout --orphan branch remote/branch
         *      git pull remote branch
         * }
         * git checkout currentBranch
         * ```
         */
        await git.raw(["fetch", remoteName, `${upmBranchName}:${upmBranchName}`]);
        console.log(`<pull-upm-branch> Pulled ${upmBranchName} from ${remoteName} successfully.`);
    } catch (e) {
        throw `Pull unsuccessful. Error: ${e}`;
    }
}
