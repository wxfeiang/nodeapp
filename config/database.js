//mongodb://<dbuser>:<dbpassword>@ds053459.mlab.com:53459/node-app-pr
if(process.env.NODE_ENV =="production"){
    module.exports =
    {mongoURL:" mongodb:Mr wang:wp258258***@ds053459.mlab.com:53459/node-app-pr" }
}else{
    // 开发环境
    module.exports =
    {mongoURL:"mongodb://localhost/node-app" }
}