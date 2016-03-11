/**
 * Created by fuwensong on 2016/1/16.
 */

/**
 * 歌词 API：http://geci.me/api/lyric/海阔天空
 *
 * */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
var loadMusics = require("./nodeModule/loadMusics");
var upload = multer({
    dest:"./musices/"
});
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
var cpUpload = upload.fields([{name: 'music'}])
app.post("/upload",cpUpload,function(req,res){
    res.render("upload");
    console.log(req.files)
    for(var i in req.files){
        var filesAry = req.files[i];
        for(var j = 0,len = filesAry.length;j < len;j++){
            if(filesAry[j].size === 0){
                fs.unlinkSync(filesAry[j].path);
                console.log('成功删除空文件');
            }else{
                var target_path = './musices/' + filesAry[j].originalname;
                // 使用同步方式重命名一个文件
                //console.log(req.files[i]);
                fs.renameSync(filesAry[j].path, target_path);
                console.log('Successfully renamed a file!');
            }
        }
    }
})
app.listen(3000);