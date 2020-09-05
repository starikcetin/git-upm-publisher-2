#!/usr/bin/env node

import { main } from "./main";

main()
  .then(() => {
    console.log("Success.");
    process.exitCode = 0;
  })
  .catch(e => {
    console.error("Failure:", e);
    process.exitCode = 1;
  });
