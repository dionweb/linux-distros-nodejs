const Distro = require("../models/distro");

exports.getAddDistro = (req, res, next) => {
  res.render("admin/add-distro", {
    docTitle: "Add distro",
    path: "/admin/add-distro",
  });
};

exports.postAddDistro = (req, res, next) => {
  const name = req.body.name;
  const basedOn = req.body.basedOn;
  const imageUrl = req.body.imageUrl;
  const desktopEnv = req.body.desktopEnv;
  const description = req.body.description;
  const isActive = req.body.isActive;
  const distro = new Distro(
    name,
    basedOn,
    imageUrl,
    desktopEnv,
    description,
    isActive
  );
  distro.save();
  res.redirect("/");
};

exports.getDistros = (req, res, next) => {
  Distro.fetchAll((distros) => {
    res.render("admin/distros", {
      distros: distros,
      docTitle: "Admin distros",
      path: "admin/distros",
    });
  });
};
