/**
 * Created by fuwensong on 2016/1/16.
 */

var express = require('express');
var app = express();
var path = require('path');
var loadMusics = require("./nodeModule/loadMusics")
app.use(express.static("public"));
app.engine('html',require("ejs").renderFile);  //将 ejs 的后缀转换为 html
app.set('view engine','html');  //设置视图引擎为 html
app.set('views','views')
app.get('/',function(req,res){
    res.render('index')
});

app.get("/musics",function(req,res){
    var query = req.query;
    var sourceMusic = query.sourceMusic,
        destMusic = path.join(__dirname,query.destMusic || "music") ;
    if(!sourceMusic){
        res.json({
            code:1,
            msg:"请输入音乐目录"
        });
        return false;
    }
    loadMusics(sourceMusic,destMusic);
    res.json({musics:[
        {music:"22222"}
    ]})
})

app.listen(3000);