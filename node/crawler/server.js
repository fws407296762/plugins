/**
 * Created by cnns-xz on 2016/3/21.
 */

var http = require("http"),
    urlModule = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require("eventproxy"),
    iconv = require("iconv-lite");

var ep = new eventproxy(),
    urlsArray = [],  //存放爬取网址
    pageUrls = [],   //存放收集文章页面网站
    pageNum = 200;   //要爬的文章页数
var userAgent = ["Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)","Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2)","Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)"]

for(var i=1;i<=2;i++){
    var randomUserAgent = Math.round(Math.random() * (userAgent.length - 1));
    var options = {
        host:"www.dytt.com",
        path:i > 1 ? "/fenlei/15_"+i+".html" : "/fenlei/15.html",
        headers:{
            "Accept-Encoding":"*",
            "User-Agent":userAgent[randomUserAgent]
        }
    };
    pageUrls.push(options);
}

//主程序

function start(){
    "use strict";
    function onRequest(req,res){
        pageUrls.forEach(function(option){
            var request = http.request(option,function(res){
                var html = ""
                res.on("data",function(chunk){
                    var text = iconv.decode(chunk,"gbk");
                    html += text;
                });
                res.on("end",function(){
                    console.log('No more data in response.')
                    var $ = cheerio.load(html);
                    var $movielist = $(".movielist");
                    var $a = $movielist.find("li").find("a");
                    for(var i = 0;i<$a.length;i++){
                        var movieName = $a.eq(i).text(),
                            movieHref = 'http://www.dytt.com'+$a.eq(i).attr("href");
                        urlsArray.push({name:movieName,src:movieHref});
                        ep.emit('movieDatailHtml',movieHref);
                    }
                })
            });
            request.on("error",function(e){
                console.log(e);
            });
            request.end();
        });

        ep.after('movieDatailHtml',pageUrls.length * 20,function(movieHref){
            var curCount = 0;
            var reptilMove = function(url,callback){
                var delay = parseInt((Math.random() * 30000000) % 1000,10);
                curCount++;
                console.log('现在的并发数是：',curCount,'，正在抓取的是',url,'，耗时'+delay+'毫秒');
                var urlObj = urlModule.parse(url);
                var options = {
                    protocol:urlObj.protocol,
                    host:urlObj.host,
                    path:urlObj.path,
                    headers:{
                        "Accept-Encoding":"*"
                    }
                }
                var request = http.request(options,function(res){
                    var html = "";
                    res.on("data",function(chunk){
                        var text = iconv.decode(chunk,"gbk");
                        html += text;
                    });
                    res.on("end",function(){
                        console.log('No more data in response.');
                        console.log(html);
                    })
                });
                request.on("error",function(e){
                    console.log(e);
                });
                request.end();
            };

            async.mapLimit(movieHref,5,function(url,callback){
                reptilMove(url,callback);
            },function(err,result){
                console.log(err,result);
            })
        })
    }
    http.createServer(onRequest).listen(3000);
}

exports.start = start;

