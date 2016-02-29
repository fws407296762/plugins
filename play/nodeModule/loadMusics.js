/**
 * Created by fuwensong on 2016/1/18.
 */

"use strict"
var fs = require("fs"),
    path = require('path'),
    statSync = fs.statSync;
var id3js = require("id3js");
var mp3Duration = require('mp3-duration');
var iconvLite = require('iconv-lite');
var mp3Reg = /\.mp3$/g;
var process = require("process");
var getRandomNum = function(start,end){
    return Math.round(Math.random() * (end - start) + start);
}
var loadMusics = function(src,dst){
    var promise = new Promise(function(resolve,reject){
        var dirDst = path.join(process.cwd(),dst);   // __dirname 返回执行文件的目录 process.cwd() 返回项目所在目录
        var dirPromise = new Promise(function(res,rej){
            fs.readdir(src,function(err,dirs){
                if(err){
                    rej(err);
                    return false;
                }
                res(dirs);
            });
        });

        dirPromise.then(function(dirs){
            var filterMp3s= dirs.filter(function(dir){
                var dirPath = path.join(src,dir);
                var stats = statSync(dirPath);
                return stats.isFile() && mp3Reg.test(dir);
            });
            var getRandomSize = getRandomNum(5,10);
            var getRandomIndex = getRandomSize;
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
                    statSync(dirDst);
                }catch(e){
                    fs.mkdirSync(dirDst);
                }
                let sourceFile = path.join(src,filterMp3s[tempMp3Index]),
                    destFile = path.join(dirDst,filterMp3s[tempMp3Index]);

                try{
                    statSync(destFile);
                }catch(e){
                    let readStream = fs.createReadStream(sourceFile),
                        destStream = fs.createWriteStream(destFile);
                    readStream.pipe(destStream);
                }
                id3js({file:destFile,type:id3js.OPEN_LOCAL},function(err,tags){
                    if(err){
                        reject({
                            code:1,
                            msg:err
                        });
                        return false;
                    }
                    let obj = {src:destFile};
                    obj.title = tags.title;
                    console.log(tags)
                    obj.album = tags.album;
                    mp3Duration(destFile,pushFilterMp3sRandom(obj,getFilterMp3sRandom));
                });
            }
            var index = 0;
            function pushFilterMp3sRandom(obj,callback){

                return function(err,data){
                    if (err){
                        reject({
                            code:1,
                            msg:err
                        });
                    };
                    obj.duration = parseInt(data/60)+":"+parseInt(data%60);
                    filterMp3sRandom.push(obj);
                    index++;
                    if(index === getRandomIndex){
                        callback(filterMp3sRandom)
                    }
                }
            }
            function getFilterMp3sRandom(filterMp3sRandom){
                resolve(filterMp3sRandom);
            }
        });
        dirPromise.catch(function(err){
            reject({
                code:1,
                msg:err.path + " 目录不存在"
            });
        });
    });

    return promise;
}

module.exports = loadMusics;