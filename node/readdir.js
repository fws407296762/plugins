/**
 * Created by fuwensong on 2016/1/16.
 */

var fs = require('fs');

var src = "E:\KuGou";
fs.readdir(src,(err,files)=>{
    if(err) throw err;
    console.log(files);
})