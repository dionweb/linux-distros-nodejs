const Distro = require("../models/distro");

exports.getAddDistro = (req, res, next) => {
  res.render("add-distro", {
    docTitle: "Add distro",
    path: "/admin/add-distro",
  });
};

exports.postAddDistro = (req, res, next) => {
  const distro = new Distro(req.body.title);
  distro.save();
  res.redirect("/");
};

exports.getDistros = (req, res, next) => {
  const distros = Distro.fetchAll((distros) => {
    res.render("distros", { distros: distros, docTitle: "Distros", path: "/" });
  });
};
