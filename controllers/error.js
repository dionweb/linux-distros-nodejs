exports.get404 = (req, res, next) => {
  res.status(404).render("distros/404", {
    docTitle: "404",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};
