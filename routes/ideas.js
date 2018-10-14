const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// 实例化路由
const router = express.Router()

// 解析数据
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
 // 引入模型
 require("../models/Idea") 

const Idea  = mongoose.model('ideas')

//课程 展示数据
router.get("/", function(req, res) {
    // 获取
    Idea.find({})
    .sort({date:"desc"})
    .then(ideas =>{
        res.render("ideas/index",{
            ideas: ideas
        })
    })
    //res.render("ideas/index");
  });
  // 添加数据
router.get("/add", function(req, res) {
  res.render("ideas/add");
});

// 编辑页面数据
router.get("/edit/:id", function(req, res) {
  //
  Idea.findOne({
    // 拿到地址栏传得Id 对应数据库得 _id
    _id: req.params.id
  })
  .then(idea =>{
    // 回传展示
    res.render("ideas/edit",{
      idea: idea
    });
  })

});


// 提交数据
router.post("/", urlencodedParser, function(req, res) {
  //  拿到要提交得数据  判空及其验证
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "请输入标题" });
  }
  if (!req.body.details) {
    errors.push({ text: "请输入详情" });
  }

  if (errors.length > 0) {
    // 有错误返回
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
   // console.log(req.body);
   // res.send("拿到数据了");
   const newUser = {
    title: req.body.title,
    details: req.body.details

   }
   new Idea(newUser)
   .save()
   .then(idea =>{
    req.flash('success_msg','信息添加成功了!!!');
       res.redirect('./ideas')
   })
    

  }
});

//  编辑后提交数据 
router.put("/:id",urlencodedParser,(req,res)=>{
  //res.send("put")
  // 拿到当前数据
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea =>{
    idea.title=req.body.title;
    idea.details=req.body.details;
    
    idea.save()
    .then(idea=>{
      req.flash('success_msg','信息编辑成功了!!!');
      res.redirect("/ideas")
    })
  })
})
// 实现删除
router.delete("/:id", function(req, res) {
 // 在数据库删除
 Idea.remove({
   _id: req.params.id 

 })
 .then(() =>{
   // 删除弹框信息提示
   req.flash('success_msg','信息删除成功');
   res.redirect("/ideas")
 })
});




// 输出路由
module.exports = router;