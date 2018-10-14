// 引入 express 框架
const express = require("express");
// 引入 handlebars

const exphbs = require("express-handlebars");
//  引入  body-parder 解析数据  express 版本超过 4  直接引入 无需下载安装
const bodyParser = require("body-parser");
// 下载引入 mongoose
const mongoose = require("mongoose");

// 下载 引入  method-override
const methodOverride = require('method-override')

// 引入 express-session 
const session = require('express-session')
// 引入 flash
const flash = require('connect-flash');
// 引入静态资源路径
const path = require('path')

// 实例化对象
const app = express();
// 引入路由
const ideas = require('./routes/ideas')
const users = require('./routes/users')


// 链接数据库  端口 库名
mongoose.connect("mongodb://localhost/node-app",{useNewUrlParser:true})
  .then(() => {
    console.log("链接成功");
  })
  .catch(err => {
    console.log(err+"链接失败");
  });


 // 引入模型
 require("./models/Idea") 

const Idea  = mongoose.model('ideas')
// handlebars 视图 view
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 解析数据
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//  使用静态文件  当前文件下
app.use(express.static(path.join(__dirname,"public")));


// override with POST having ?_method=DELETE  实例化 使用
app.use(methodOverride('_method'))

// session  flash
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
 // cookie: { secure: true }
}))
 app.use(flash())
 // 配置全局变量  让其他得文件都可以使用
 app.use((req,res,next)=>{
   // 操作提示信息
   res.locals.success_msg= req.flash('success_msg');
   res.locals.error= req.flash('error');
   next();

 })


//配置路由  可以用 ES6
app.get("/", function(req, res) {
  // res.send("Index")

  var title = "大家好 我是王鹏";
  // 传递到 页面
  res.render("index", {
    title: title
  });
});
app.get("/about", function(req, res) {
  res.render("about");
});
//使用路由组件
app.use("/ideas",ideas )
app.use("/users",users)

const port = 8888;

// 监听服务器端口号
app.listen(port, () => {
  console.log("服务器 启动了 监听到了8888");
});
