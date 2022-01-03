const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "hopping-list.json"
);

module.exports = class HoppingList {
  static addDistro(id) {
    // Fetch the hopping list
    fs.readFile(p, (err, fileContent) => {
      let hoppinglist = { distros: [] };
      if (!err) {
        hoppinglist = JSON.parse(fileContent);
      }
      // Analyze the hopping list
      const existingDistroIndex = hoppinglist.distros.findIndex(
        (dist) => dist.id === id
      );
      const existingDistro = hoppinglist.distros[existingDistroIndex];
      let updatedDistro;
      // Add new distro
      if (existingDistro) {
        updatedDistro = { ...existingDistro };
        hoppinglist.distros = [...hoppinglist.distros];
        hoppinglist.distros[existingDistroIndex] = updatedDistro;
      } else {
        updatedDistro = { id: id };
        hoppinglist.distros = [...hoppinglist.distros, updatedDistro];
      }
      fs.writeFile(p, JSON.stringify(hoppinglist), (err) => {
        console.log(err);
      });
    });
  }
  static deleteDistro(id) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedList = { ...JSON.parse(fileContent) };
      const distro = updatedList.distros.find((dist) => dist.id === id);
      if (!distro) {
        return;
      }
      updatedList.distros = updatedList.distros.filter(
        (dist) => dist.id !== id
      );
      fs.writeFile(p, JSON.stringify(updatedList), (err) => {
        console.log(err);
      });
    });
  }

  static getHoppinglist(cb) {
    fs.readFile(p, (err, fileContent) => {
      const hoppinglist = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(hoppinglist);
      }
    });
  }
};
