const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router()

// 解析数据
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// longin && register
router.get("/login", function(req, res) {
  res.render("users/login")
  });
  
router.get("/register", function(req, res) {
  res.render("users/register");
});
  

  module.exports = router;