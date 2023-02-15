const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const distroSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  basedOn: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  desktopEnv: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Distro", distroSchema);
