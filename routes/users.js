const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const router = express.Router()

// 解析数据res
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//  加载 model模型
require("../models/User")
const User = mongoose.model('users')

// longin && register
router.get("/login", function (req, res) {
  res.render("users/login")
});

router.get("/register", function (req, res) {
  res.render("users/register");
});
// 登录
router.post("/login", urlencodedParser,function (req, res) {
 //console.log(req.body)
 //  拿到数据  查询数据库 两次匹配
 User.findOne({ email: req.body.email, })
  .then((user)=>{
    if(!user){
      req.flash("error_msg", "用户不存在");
      res.redirect("/users/login");
      return ;
    }

    // bcrypt.compare("req.body.password", user.password, (err, result)=>{
    //   if (err) throw err;
    //   if(result){

    //   }
    // })
    // 匹配密码
    bcrypt.compare("req.body.password", user.password, (err, res)=>{
      if (err) throw err;
      if(res){
        req.flash("success_msg", "登录成功");
        res.redirect("/ideas");
        console.log(req.body.password);
        console.log(user.password);
      }else{
        req.flash("error_msg", "密码不正确");
        res.redirect("/users/login");
      }
    });
      

  })


});



// 注册
router.post("/register", urlencodedParser, function (req, res) {
  // console.log(req.body)

  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({ text: "两次密码不一致" })
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "密码长度不能小于4位" })
  }
  if (!req.body.name) {
    errors.push({ text: "请输入用户名" })
  }
  if (!req.body.email) {
    errors.push({ text: "请输入正确的邮箱号" })
  }
  if (errors.length > 0) {
    // 有错误返回 把输入的内容回传
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password

    })
  } else {

    // 查询数据库  邮箱是否被注册
    User.findOne({ email: req.body.email, })
      .then((user) => {
        if (user) {
          //  console.log("user注册失败了")
          req.flash("error_msg", "邮箱已经存在, 请更换邮箱注册~!");
          res.redirect("/users/register");

        } else {
          //  没有问题  存储    对密码加密
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
          //  存之前加密 密码

          bcrypt.hash(newUser.password, null, null, function (err, hash) {
            if (err) throw err;
            // 密码加密
            newUser.password = hash;



            // 存储数据
            newUser.save()
              .then((user) => {
                req.flash("success_msg", "注册成功了");
                res.redirect("/users/login");
              })
              .catch((err) => {
                if (err) throw err;
                req.flash("error_msg", "注册失败了");
                res.redirect("/users/register");

              })

          })

        }


      })

  }

});

module.exports = router;