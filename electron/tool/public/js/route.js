"use strict";

const toolApp = angular.module("toolApp",["ngRoute","ngAnimate"]);

toolApp.config(function($routeProvider){
    $routeProvider.when("/crawler",{
        templateUrl:"view/crawler.html",
        controller:'crawlerController'
    }).when("/markdown",{
        templateUrl:"view/markdown.html",
        controller:'markdownController'
    })
});