const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const rootDir = require("./util/path");

const app = express();

const adminData = require("./routes/admin");
const distrosRoutes = require("./routes/distros");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(distrosRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
