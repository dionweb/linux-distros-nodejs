const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// admin/add-distro .... admin/distros ==> GET
router.get("/add-distro", adminController.getAddDistro);

router.get("/distros", adminController.getDistros);

// admin/add-distro .... admin/distros ==> POST
router.post("/add-distro", adminController.postAddDistro);

module.exports = router;
