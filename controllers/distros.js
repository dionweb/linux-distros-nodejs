const Distro = require("../models/distro");
/* const Hoppinglist = require("../models/hoppinglist");
 */

/* exports.getDistros = (req, res, next) => {
  Distro.fetchAll((distros) => {
    res.render("distros/distro-list", {
      distros: distros,
      docTitle: "All distros",
      path: "/distros",
    });
  });
}; */

exports.getDistros = (req, res, next) => {
  Distro.fetchAll()
    .then((distros) => {
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
  Distro.fetchAll()
    .then((distros) => {
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
    .getHoppinglist()
    .then((distros) => {
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
  /* let fetchedHoppinglist;
  let newQuantity = 1;
  req.user
    .getHoppinglist()
    .then((hoppinglist) => {
      fetchedHoppinglist = hoppinglist;
      return hoppinglist.getDistros({ where: { id: distId } });
    })
    .then((distros) => {
      let distro;
      if (distros.length > O) {
        distro = distros[0];
      }
      if (distro) {
        const oldQuantity = distro.hoppinglistItem.quantity;
        newQuantity = oldQuantity + 1;
        return distro;
      }
      return Distro.findById(distId);
    })
    .then((distro) => {
      return fetchedHoppinglist.addDistro(distro, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/hoppinglist");
    })
    .catch((err) => console.log(err)); */
};

exports.postHoppinglistDeleteDistro = (req, res, next) => {
  const distId = req.body.distroId;
  req.user
    .deleteItemFromHoppinglist(distId)
    .then((result) => {
      res.redirect("/hopping");
    })
    .catch((err) => console.log(err));
};

/* exports.getHoppinglist = (req, res, next) => {
  req.user
    .getHoppinglist()
    .then((hoppinglist) => {
      return hoppinglist
        .getProducts()
        .then((distros) => {
          res.render("distros/hopping", {
            path: "/hopping",
            pageTitle: "Your hopping list",
            distros: distros,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

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
 */
