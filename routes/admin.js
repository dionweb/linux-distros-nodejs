const path = require("path");

const express = require("express");

const distrosController = require("../controllers/distros");

const router = express.Router();

// admin/add-distro
router.get("/add-distro", distrosController.getAddDistro);

router.post("/add-distro", distrosController.postAddDistro);

module.exports = router;
