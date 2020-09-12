import fs from 'fs';
import p from 'path';

export async function checkFileReadWrite(path: p.ParsedPath) {
  const pathStr = p.format(path);
  return access(pathStr, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK);
}

async function access(path: fs.PathLike, mode?: number | undefined) {
  return new Promise((resolve, reject) => {
    fs.access(path, mode, err => {
      if (err) {
        reject(`File access exception (${err.message})`);
      } else {
        resolve();
      }
    });
  });
}
