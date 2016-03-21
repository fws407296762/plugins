"use strict";

const https = nodeRequire("https");
const http = nodeRequire("http");
const url = nodeRequire("url");
const iconv = nodeRequire("iconv-lite");
const cheerio = nodeRequire("cheerio");

/*爬虫控制器*/
toolApp.controller("crawlerController",function($scope){
    $scope.url = "http://www.dytt.com/";
    $scope.match = "";
    $scope.crawleEvent = function(){
        var urlObj = url.parse($scope.url);
        var host = urlObj.host,
            hostname = urlObj.hostname,
            href = urlObj.href,
            path = urlObj.path,
            protocol = urlObj.protocol;
        var options = {
            host:host,
            hostname:hostname,
            method:"GET",
            path:path
        }

        var req = http.request(options,function(res){
            
            var html = ""
            res.on('data',function(chunk){
               var decode = iconv.decode(chunk, 'gbk');
               html += decode;
            });
            res.on('end',function(){
                console.log('No more data in response.')
                var $ = cheerio.load(html);
               $(".boutlist ul li").each(function(){
                   console.log($(this).find(".s1").find("a").text());
               })
            })
        });
        req.end();
    }
})
