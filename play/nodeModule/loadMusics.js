/**
 * Created by fuwensong on 2016/1/18.
 */

"use strict"
var fs = require("fs"),
    path = require('path'),
    statSync = fs.statSync;
//var id3js = require("id3js");
var jsmediatags = require("jsmediatags");
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
            var getRandomSize = getRandomNum(1,2);
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
                    readStream.on('end',function(){
                        destStream.end();
                    })
                }
                console.log(destFile)
                jsmediatags.read(destFile,{
                    onSuccess:function(id3){
                        let tags = id3.tags;
                        console.log(tags)
                        let obj = {src:destFile};
                        obj.title = tags.title;
                        obj.album = tags.album;
                        mp3Duration(destFile,pushFilterMp3sRandom(obj,getFilterMp3sRandom));

                    },
                    onError:function(error){
                        reject({
                            code:1,
                            msg:error
                        });
                    }
                })
            }

            var index = 0;
            function pushFilterMp3sRandom(obj,callback){
                console.log(obj)
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
            fs.close();
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