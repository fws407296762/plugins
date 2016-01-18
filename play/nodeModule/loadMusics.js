/**
 * Created by fuwensong on 2016/1/18.
 */

    "use strict"

/**
 * BUG：偶尔会出现获取的音乐重复的BUG，非常不常见，待检验
 * 待续：判断音乐是否已经在目录中了，如果已经在了就不用继续执行了传入操作了；将音乐目录传递到前台，形成列表以及开始播放
 * */


var fs = require("fs"),
    path = require('path'),
    statSync = fs.statSync;
var mp3Reg = /\.mp3$/g;

var getRandomNum = function(start,end){
    return Math.round(Math.random() * (end - start) + start);
}
var loadMusics = function(src,dst){
    var dirPromise = new Promise(function(resolve,reject){
        fs.readdir(src,function(err,dirs){
            if(err){
                reject(err);
                return false;
            }
            resolve(dirs);
        });
    });
    dirPromise.then(function(dirs){
        var filterMp3s= dirs.filter(function(dir){
            var dirPath = path.join(src,dir);
            var stats = statSync(dirPath);
            return stats.isFile() && mp3Reg.test(dir);
        });
        var getRandomSize = getRandomNum(5,10);
        var filterMp3sLen = filterMp3s.length;
        var filterMp3sRandom = [];
        while(getRandomSize--){
            let tempMp3Index = getRandomNum(0,filterMp3sLen-1);
            let isContain = filterMp3sRandom.indexOf(tempMp3Index);
            if(isContain > -1){
                while(filterMp3sRandom.indexOf(tempMp3Index) > -1){
                    tempMp3Index = getRandomNum(0,filterMp3sLen-1);
                }
            }
            try{
                statSync(dst);
            }catch(e){
                fs.mkdirSync(dst);
            }
            let sourceFile = path.join(src,filterMp3s[tempMp3Index]),
                destFile = path.join(dst,filterMp3s[tempMp3Index]);
            let readStream = fs.createReadStream(sourceFile),
                destStream = fs.createWriteStream(destFile);
            readStream.pipe(destStream);
            filterMp3sRandom.push({
                music:filterMp3s[tempMp3Index]
            });
        }
        console.log(filterMp3sRandom)
    });
    dirPromise.catch(function(err){
        return {
            code:1,
            msg:"文件目录有误"
        }
    });
}

module.exports = loadMusics;