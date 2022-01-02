const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("distros.js", adminData.distros);
  res.sendFile(path.join(rootDir, "views", "distros.html"));
});

module.exports = router;
