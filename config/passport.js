const LocalStrategy  = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// 引入模型
const User = mongoose.model("users")

module.exports= (passport)=>{
    //app.js chuanru 
    //官网 
      passport.use(new  LocalStrategy(
        {usernameField: "email"},
        (email, password, done)=> {
           // console.log(email);
           // console.log(password)
            User.findOne({ email: email, })
            .then((user) => {
              if (!user) {
                return done(null,false,{message: "用户不存在"})
              }
         //密码验证
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
        
                if (isMatch) {
                    // 只有成功以后  有 user
                  return done(null,user,{message: "登录成功"})
                } else {
    
                  return done(null,false,{message: "密码错误"})
                }
              });
        
            }) 
        }
      ));

// 登录状态持久化
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });




}