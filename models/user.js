const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hoppinglist: {
    items: [
      {
        distroId: {
          type: Schema.Types.ObjectId,
          ref: "Distro",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToHoppinglist = function (distro) {
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
      distroId: distro._id,
      quantity: newQuantity,
    });
  }

  const updatedHoppinglist = {
    items: updatedHoppinglistItems,
  };
  this.hoppinglist = updatedHoppinglist;
  return this.save();
};

userSchema.methods.removeFromHoppinglist = function (distroId) {
  const updatedHoppinglistItems = this.hoppinglist.items.filter((item) => {
    return item.distroId.toString() !== distroId.toString();
  });
  this.hoppinglist.items = updatedHoppinglistItems;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
