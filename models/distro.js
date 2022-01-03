const fs = require("fs");
const path = require("path");

const Hoppinglist = require("./hoppinglist");

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
  constructor(id, name, basedOn, imageUrl, desktopEnv, description, isActive) {
    this.id = id;
    this.name = name;
    this.basedOn = basedOn;
    this.imageUrl = imageUrl;
    this.desktopEnv = desktopEnv;
    this.description = description;
    this.isActive = isActive;
  }

  save() {
    /* this.id = this.name; */
    getDistrosFromFile((distros) => {
      if (this.id) {
        const existingDistroIndex = distros.findIndex(
          (dist) => dist.id === this.id
        );
        const updatedDistros = [...distros];
        updatedDistros[existingDistroIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedDistros), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        distros.push(this);
        fs.writeFile(p, JSON.stringify(distros), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getDistrosFromFile((distros) => {
      const distro = distros.find((dist) => dist.id === id);
      const updatedDistros = distros.filter((dist) => dist.id !== id);
      fs.writeFile(p, JSON.stringify(updatedDistros), (err) => {
        if (!err) {
          Hoppinglist.deleteDistro(id);
        }
      });
    });
  }

  static fetchAll(cb) {
    getDistrosFromFile(cb);
  }

  static findById(id, cb) {
    getDistrosFromFile((distros) => {
      const distro = distros.find((p) => p.id === id);
      cb(distro);
    });
  }
};
