const distros = [];

exports.getAddDistro = (req, res, next) => {
  res.render("add-distro", {
    docTitle: "Add distro",
    path: "/admin/add-distro",
  });
};

exports.postAddDistro = (req, res, next) => {
  distros.push({ title: req.body.title });
  res.redirect("/");
};

exports.getDistros = (req, res, next) => {
  res.render("distros", { distros: distros, docTitle: "Distros", path: "/" });
};
