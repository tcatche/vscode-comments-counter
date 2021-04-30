const path = require('path');
const exec = require('child_process').exec;

const calc = (filePath: String): Promise<CommentType> => {
  return new Promise((resolve, reject) => {
    const clocPath = path.resolve(`${__dirname}/../node_modules/.bin/cloc`);
    exec(`${clocPath} ${filePath} '--json'`, (err: Error, resultJSON: string) => {
      if (err) {
        reject(err);
      } else {
        const result = JSON.parse(resultJSON);

        resolve(result.SUM);
      }
    });
  });
};

export default calc;