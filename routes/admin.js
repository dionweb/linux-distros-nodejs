const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const distros = [];

// admin/add-distro
router.get("/add-distro", (req, res, next) => {
  res.render("add-distro", {
    docTitle: "Add distro",
    path: "/admin/add-distro",
  });
});

router.post("/add-distro", (req, res, next) => {
  distros.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.distros = distros;
/* module.exports = router;
 */
