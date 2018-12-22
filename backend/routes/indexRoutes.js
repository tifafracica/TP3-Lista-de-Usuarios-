const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/estaspensandolomismoqueyobananin", (req, res) => {   
    console.log("claro que si bananon"); 
    res.send("claro que si bananon");
  });

router.get("/users/new", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "new.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

router.get("/users/test", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "test.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

router.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "users.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

router.get("/users/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "edit.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

module.exports = router;