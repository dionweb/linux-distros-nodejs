const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-distro", isAuth, adminController.getAddDistro);

router.get("/distros", isAuth, adminController.getDistros);

router.post("/add-distro", isAuth, adminController.postAddDistro);

router.get("/edit-distro/:distroId", isAuth, adminController.getEditDistro);

router.post("/edit-distro", isAuth, adminController.postEditDistro);

router.post("/delete-distro", isAuth, adminController.postDeleteDistro);

module.exports = router;
