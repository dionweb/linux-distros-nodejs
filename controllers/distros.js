const Distro = require("../models/distro");
const Hoppinglist = require("../models/hoppinglist");

exports.getDistros = (req, res, next) => {
  Distro.fetchAll((distros) => {
    res.render("distros/distro-list", {
      distros: distros,
      docTitle: "All distros",
      path: "/distros",
    });
  });
};

exports.getDistro = (req, res, next) => {
  const distId = req.params.distroId;
  Distro.findById(distId, (distro) => {
    res.render("distros/distro-detail", {
      distro: distro,
      docTitle: distro.name,
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

exports.getHoppinglist = (req, res, next) => {
  Hoppinglist.getHoppinglist((hoppinglist) => {
    Distro.fetchAll((distros) => {
      const hoppinglistDistros = [];
      for (distro of distros) {
        const hoppinglistDistroData = hoppinglist.distros.find(
          (dist) => dist.id === distro.id
        );
        if (hoppinglistDistroData) {
          hoppinglistDistros.push({
            distroData: distro,
            qty: hoppinglistDistroData.qty,
          });
        }
      }
      res.render("distros/hopping", {
        docTitle: "Your hopping list",
        path: "/hopping",
        distros: hoppinglistDistros,
      });
    });
  });
};

exports.postHoppinglist = (req, res, next) => {
  const distId = req.body.distroId;
  Distro.findById(distId, (distro) => {
    Hoppinglist.addDistro(distId);
  });
  res.redirect("/hopping");
};

exports.postHoppingDeleteDistro = (req, res, next) => {
  const distId = req.body.distroId;
  Distro.findById(distId, (distro) => {
    Hoppinglist.deleteDistro(distId);
    res.redirect("/hopping");
  });
};
