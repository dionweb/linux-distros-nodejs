const Distro = require("../models/distro");

exports.getDistros = (req, res, next) => {
  Distro.find()
    .then((distros) => {
      console.log(distros);
      res.render("distros/distro-list", {
        distros: distros,
        docTitle: "All distros",
        path: "/distros",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDistro = (req, res, next) => {
  const distId = req.params.distroId;
  Distro.findById(distId)
    .then((distro) => {
      res.render("distros/distro-detail", {
        distro: distro,
        docTitle: distro.name,
        path: "/distros",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Distro.find()
    .sort({ $natural: -1 })
    .limit(3)
    .then((distros) => {
      console.log(distros);
      res.render("distros/index", {
        distros: distros,
        docTitle: "Index",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHoppinglist = (req, res, next) => {
  req.user
    .populate("hoppinglist.items.distroId")
    .then((user) => {
      const distros = user.hoppinglist.items;
      res.render("distros/hopping", {
        path: "/hopping",
        docTitle: "Your Hoppinglist",
        distros: distros,
      });
    })
    .catch((err) => console.log(err));
};

exports.postHoppinglist = (req, res, next) => {
  const distId = req.body.distroId;
  Distro.findById(distId)
    .then((distro) => {
      return req.user.addToHoppinglist(distro);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/hopping");
    });
};

exports.postHoppinglistDeleteDistro = (req, res, next) => {
  const distId = req.body.distroId;
  req.user
    .removeFromHoppinglist(distId)
    .then((result) => {
      res.redirect("/hopping");
    })
    .catch((err) => console.log(err));
};
