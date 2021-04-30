const path = require('path');
const exec = require('child_process').exec;

const clocPath = `cloc`;
// const clocPath = `D:/works/personal/comments-counter/node_modules/.bin/cloc.cmd`

exec(`${clocPath}  ./ `, (err, resultJSON) => {
  if (err) {
    console.log(err);
  } else {
    const result = JSON.parse(resultJSON);
    console.log(result);
  }
});