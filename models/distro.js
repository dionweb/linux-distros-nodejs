const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "distros.json"
);

const getDistrosFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Distro {
  constructor(t) {
    this.title = t;
  }

  save() {
    getDistrosFromFile((distros) => {
      distros.push(this);
      fs.writeFile(p, JSON.stringify(distros), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getDistrosFromFile(cb);
  }
};
