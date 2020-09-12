const pjson = require('../../package.json');

export async function getAuthor() {
  return `${pjson.name} <${pjson.homepage}>`;
}
