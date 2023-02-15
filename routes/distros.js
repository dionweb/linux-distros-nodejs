const path = require("path");

const express = require("express");

const distrosController = require("../controllers/distros");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", distrosController.getIndex);

router.get("/distros", distrosController.getDistros);

router.get("/distros/:distroId", distrosController.getDistro);

router.get("/hopping", isAuth, distrosController.getHoppinglist);
router.post("/hopping", isAuth, distrosController.postHoppinglist);
router.post(
  "/hopping-delete-item",
  isAuth,
  distrosController.postHoppinglistDeleteDistro
);

module.exports = router;
