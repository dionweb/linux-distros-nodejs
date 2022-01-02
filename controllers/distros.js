const Distro = require("../models/distro");

exports.getDistros = (req, res, next) => {
  Distro.fetchAll((distros) => {
    res.render("distros/distro-list", {
      distros: distros,
      docTitle: "All distros",
      path: "/distros",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Distro.fetchAll((distros) => {
    res.render("distros/index", {
      distros: distros,
      docTitle: "Index",
      path: "/",
    });
  });
};

exports.getHopping = (req, res, next) => {
  res.render("distros/hopping", {
    docTitle: "Your hopping list",
    path: "/hopping",
  });
};
