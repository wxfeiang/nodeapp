###  npm  root -g 查看全局安装得路径
###  npm install  express-handlebars  模板 和 vue 很像

### 相同得内容  抽离到公共部分
### 规定得 文件夹 
*  views > layouts >min.headlebar   
*  partials   {{>_navbar}}
##  下载 mongo DB   
##  解压以后  放到安全得  文件夹   (菜鸟教程)

##   express-session 
##  connect-flash
### 实现登录注册 


###  代码优化分离

###  密码加密 
* bcrypt-nodejs

` bcrypt.hash(newUser.password, null, null, function (err, hash) {
            if (err) throw err;
            // 密码加密
            newUser.password = hash;)}`