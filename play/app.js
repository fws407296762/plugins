/**
 * Created by fuwensong on 2016/1/16.
 */

/**
 * 歌词 API：http://geci.me/api/lyric/海阔天空
 *
 * */

var express = require('express');
var app = express();
var path = require('path');
var loadMusics = require("./nodeModule/loadMusics")
app.use(express.static("public"));
app.use(express.static("musics",{    //设置 mp3 的静态目录
    setHeaders:function(res,path,stat){
        res.set('Content-Type','audio/mpeg');
        res.set('Content-Length',stat.size);
    }
}));
app.engine('html',require("ejs").renderFile);  //将 ejs 的后缀转换为 html
app.set('view engine','html');  //设置视图引擎为 html
app.set('views','views')
app.get('/',function(req,res){
    res.render('index')
});

app.get("/musics",function(req,res){
    var query = req.query;
    var sourceMusic = query.sourceMusic,
        destMusic = query.destMusic;
    if(!sourceMusic){
        res.json({
            code:1,
            msg:"请输入音乐目录"
        });
        return false;
    }
    var loadMusicsPromise = loadMusics(sourceMusic,destMusic);
    loadMusicsPromise.then(function(randomMusics){
        res.json({code:0,musics:randomMusics})
    });
    loadMusicsPromise.catch(function(err){
        res.json(err);
    })
})

app.listen(3000);