import path from "path";
import { isRepoDirty } from "./is-repo-dirty";

export async function checkRepoStatus(packagePath: path.ParsedPath) {
  const isDirty = await isRepoDirty(packagePath);

  if (isDirty) {
    throw "You have outstanding changes in the working tree. Refusing to continue.";
  }
}
