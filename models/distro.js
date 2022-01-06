const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Distro {
  constructor(
    name,
    basedOn,
    imageUrl,
    desktopEnv,
    description,
    isActive,
    id,
    userId
  ) {
    this.name = name;
    this.basedOn = basedOn;
    this.imageUrl = imageUrl;
    this.desktopEnv = desktopEnv;
    this.description = description;
    this.isActive = isActive;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update
      dbOp = db
        .collection("distros")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert
      dbOp = db.collection("distros").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("distros")
      .find()
      .toArray()
      .then((distros) => {
        console.log(distros);
        return distros;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(distId) {
    const db = getDb();
    return db
      .collection("distros")
      .find({ _id: mongodb.ObjectId(distId) })
      .next()
      .then((distro) => {
        console.log(distro);
        return distro;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(distId) {
    const db = getDb();
    return db
      .collection("distros")
      .deleteOne({ _id: new mongodb.ObjectId(distId) })
      .then((result) => {
        console.log("Distro Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Distro;
