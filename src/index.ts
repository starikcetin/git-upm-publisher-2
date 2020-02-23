#!/usr/bin/env node

import { main } from "./main";

main()
  .then(() => console.log("Success."))
  .catch(e => console.log("Failure: ", e));
