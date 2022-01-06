const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
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
  User.findById("61d6e2e8b67a102b126aff5e")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(distrosRoutes);

app.use(errorController.get404);

mongoose
  .connect("")
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Dion",
          email: "dion@dionweb.me",
          hoppinglist: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
