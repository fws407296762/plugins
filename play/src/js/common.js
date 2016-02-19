/**
 * Created by fuwensong on 2016/1/23.
 */

var app = new Vue();

var App = Vue.extend({})
var router = new VueRouter();
Vue.directive("show-msg",{
    bind:function(){
        "use strict";
        console.log("绑定成功")
    },
    update:function(value){
        "use strict";

    }
});
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
    console.log("可以加载jquery...");
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

