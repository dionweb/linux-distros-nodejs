const db = require("../util/database");

const Hoppinglist = require("./hoppinglist");

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
    return db.execute(
      "INSERT INTO distros (name, basedOn, imageUrl, desktopEnv, description, isActive) VALUES(?,?,?,?,?,?)",
      [
        this.name,
        this.basedOn,
        this.imageUrl,
        this.desktopEnv,
        this.description,
        this.isActive,
      ]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM distros");
  }

  static findById(id) {
    return db.execute("SELECT * FROM distros WHERE distros.id = ?", [id]);
  }
};
