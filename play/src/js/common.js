/**
 * Created by fuwensong on 2016/1/23.
 */

var app = new Vue();

var App = Vue.extend({})
var router = new VueRouter();

router.map({
    "/":{
        component:require("../../views/music.vue")
    },
    "/music":{
        component:require("../../views/music.vue")
    }
});

router.start(App,"#app");

$(function(){
    console.log("¿ÉÒÔ¼ÓÔØjquery...");
    init();
    $(window,".wrapper").resize(function(){
        init();
    });

})

function init(){
    var neg = $(".main-header").outerHeight() + $(".main-footer").outerHeight(),
        silderHeight = $(".slider").height(),
        windowHeight = $(window).height();

    if(windowHeight >= silderHeight){
        $(".content-wrapper").css("min-height",windowHeight - neg);
    }else{
        $(".content-wrapper").css("min-height",silderHeight);
    }
}
