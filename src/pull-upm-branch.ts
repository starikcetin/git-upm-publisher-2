import simpleGit from "simple-git/promise";

export async function pullUpmBranch(
  git: simpleGit.SimpleGit,
  upmBranchName: string,
  remoteName: string
) {
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
    console.log(
      `<pull-upm-branch> Pulled ${upmBranchName} from ${remoteName} successfully.`
    );
  } catch (e) {
    throw `Pull unsuccessful. Error: ${e}`;
  }
}
