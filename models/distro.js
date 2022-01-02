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
  constructor(name, basedOn, imageUrl, desktopEnv, description, isActive) {
    this.name = name;
    this.basedOn = basedOn;
    this.imageUrl = imageUrl;
    this.desktopEnv = desktopEnv;
    this.description = description;
    this.isActive = isActive;
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
