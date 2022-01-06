const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const distrosRoutes = require("./routes/distros");

const req = require("express/lib/request");
const { CallTracker } = require("assert");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61d5a5dd97645fb36a5d1c40")
    .then((user) => {
      req.user = new User(user.name, user.email, user.hoppinglist, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(distrosRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
