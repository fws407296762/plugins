"use strict";
/*爬虫控制器*/
toolApp.controller("crawlerController",function($scope){
    $scope.url = "";
    $scope.match = "";
    $scope.crawleEvent = function(){
        console.log($scope.url,$scope.match)
    }
})
