const path = require("path");

const express = require("express");

const distrosController = require("../controllers/distros");

const router = express.Router();

router.get("/", distrosController.getIndex);

router.get("/distros", distrosController.getDistros);

router.get("/distros/:distroId", distrosController.getDistro);

router.get("/hopping", distrosController.getHoppinglist);
router.post("/hopping", distrosController.postHoppinglist);

router.post(
  "/hopping-delete-item",
  distrosController.postHoppinglistDeleteDistro
);

module.exports = router;
