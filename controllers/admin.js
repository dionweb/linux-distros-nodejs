const { is } = require("express/lib/request");
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
  const distro = new Distro({
    name: name,
    basedOn: basedOn,
    imageUrl: imageUrl,
    desktopEnv: desktopEnv,
    description: description,
    isActive: isActive,
    userId: req.user,
  });
  distro
    .save()
    .then((result) => {
      console.log("Created Distro");
      res.redirect("/admin/distros");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditDistro = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const distId = req.params.distroId;
  Distro.findById(distId)
    .then((distro) => {
      if (!distro) {
        return res.redirect("/");
      }
      res.render("admin/edit-distro", {
        docTitle: "Edit distro",
        path: "/admin/edit-distro",
        editing: editMode,
        distro: distro,
      });
    })
    .catch((err) => {
      console.log(err);
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

  Distro.findById(distId)
    .then((distro) => {
      if (distro.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      distro.name = updatedName;
      distro.basedOn = updatedBasedOn;
      distro.imageUrl = updatedImageUrl;
      distro.desktopEnv = updatedDesktopEnv;
      distro.description = updatedDescription;
      distro.isActive = updatedIsActive;
      return distro.save().then((result) => {
        console.log("Updated Distro");
        res.redirect("/admin/distros");
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.getDistros = (req, res, next) => {
  Distro.find({ userId: req.user._id })
    /* .select("name imageUrl -_id")
    .populate("userId", "name") */
    .then((distros) => {
      console.log(distros);
      res.render("admin/distros", {
        distros: distros,
        docTitle: "Admin distros",
        path: "/admin/distros",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteDistro = (req, res, next) => {
  const distId = req.body.distroId;
  Distro.deleteOne({ _id: distId, userId: req.user._id })
    .then(() => {
      console.log("Destroyed Distro");
      res.redirect("/admin/distros");
    })
    .catch((err) => {
      console.log(err);
    });
};
