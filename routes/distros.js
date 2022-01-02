const path = require("path");

const express = require("express");

const distrosController = require("../controllers/distros");

const router = express.Router();

router.get("/", distrosController.getDistros);

module.exports = router;
