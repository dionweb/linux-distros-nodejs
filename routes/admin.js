const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-distro", adminController.getAddDistro);

router.get("/distros", adminController.getDistros);

router.post("/add-distro", adminController.postAddDistro);

router.get("/edit-distro/:distroId", adminController.getEditDistro);

router.post("/edit-distro", adminController.postEditDistro);

router.post("/delete-distro", adminController.postDeleteDistro);

module.exports = router;
