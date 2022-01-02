const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const distros = adminData.distros;
  res.render("distros", { distros: distros, docTitle: "Distros", path: "/" });
});

module.exports = router;
