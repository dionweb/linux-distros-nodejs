const Distro = require("../models/distro");

exports.getAddDistro = (req, res, next) => {
  res.render("admin/edit-distro", {
    docTitle: "Add distro",
    path: "/admin/add-distro",
    editing: false,
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
    null,
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

exports.getEditDistro = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const distId = req.params.distroId;
  Distro.findById(distId, (distro) => {
    if (!distro) {
      return res.redirect("/");
    }
    res.render("admin/edit-distro", {
      docTitle: "Edit distro",
      path: "/admin/edit-distro",
      editing: editMode,
      distro: distro,
    });
  });
};

exports.postEditDistro = (req, res, next) => {
  const distId = req.body.distroId;
  const updatedName = req.body.name;
  const updatedBasedOn = req.body.basedOn;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesktopEnv = req.body.desktopEnv;
  const updatedDescription = req.body.description;
  const updatedIsActive = req.body.isActive;
  const updatedDistro = new Distro(
    distId,
    updatedName,
    updatedBasedOn,
    updatedImageUrl,
    updatedDesktopEnv,
    updatedDescription,
    updatedIsActive
  );
  updatedDistro.save();
  res.redirect("/admin/distros");
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

exports.postDeleteDistro = (req, res, next) => {
  const distId = req.body.distroId;
  Distro.deleteById(distId);
  res.redirect("/admin/distros");
};
