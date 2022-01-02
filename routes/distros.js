const path = require("path");

const express = require("express");

const distrosController = require("../controllers/distros");

const router = express.Router();

router.get("/", distrosController.getIndex);

router.get("/distros", distrosController.getDistros);

router.get("/hopping", distrosController.getHopping);

module.exports = router;
