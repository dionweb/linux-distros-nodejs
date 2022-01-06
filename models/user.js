const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, hoppinglist, id) {
    this.name = username;
    this.email = email;
    this.hoppinglist = hoppinglist;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").inserOne(this);
  }

  addToHoppinglist(distro) {
    const hoppinglistDistroIndex = this.hoppinglist.items.findIndex((cp) => {
      return cp.distroId.toString() === distro._id.toString();
    });
    let newQuantity = 1;
    const updatedHoppinglistItems = [...this.hoppinglist.items];

    if (hoppinglistDistroIndex >= 0) {
      newQuantity = this.hoppinglist.items[hoppinglistDistroIndex].quantity + 1;
      updatedHoppinglistItems[hoppinglistDistroIndex].quantity = newQuantity;
    } else {
      updatedHoppinglistItems.push({
        distroId: new ObjectId(distro._id),
        quantity: newQuantity,
      });
    }

    const updatedHoppinglist = {
      items: updatedHoppinglistItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { hoppinglist: updatedHoppinglist } }
      );
  }

  getHoppinglist() {
    const db = getDb();
    const distroIds = this.hoppinglist.items.map((i) => {
      return i.distroId;
    });
    return db
      .collection("distros")
      .find({ _id: { $in: distroIds } })
      .toArray()
      .then((distros) => {
        return distros.map((p) => {
          return {
            ...p,
            quantity: this.hoppinglist.items.find((i) => {
              return i.distroId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromHoppinglist(distroId) {
    const updatedHoppinglistItems = this.hoppinglist.items.filter((item) => {
      return item.distroId.toString() !== distroId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { hoppinglist: { items: updatedHoppinglistItems } } },
        { upsert: true }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
