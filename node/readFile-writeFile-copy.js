/**
 * Created by fuwensong on 2016/1/16.
 */
var fs = require('fs');

fs.readFile('old/阿悄 - 我是我的情人.mp3',(err,data) =>{
    if(err) throw err;
    fs.writeFile("new/阿悄 - 我是我的情人.mp3",data,'utf8',(err) =>{
        if(err) throw err;
    })
});

