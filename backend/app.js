const express = require("express");
const bodyParser = require("body-parser");

const indexRoutes = require("./routes/indexRoutes");
const apiRoutes = require("./routes/apiRoutes");

const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", apiRoutes);
app.use("/", indexRoutes);


module.exports = app;