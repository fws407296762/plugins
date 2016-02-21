/**
 * Created by fuwensong on 2016/1/23.
 */

<template id="alert">
    <div>测试一下 {{ alertType }}</div>
</template>

var app = new Vue();

var Alert = Vue.extend({
    props:{
        alertType:{
            type:Number,
            default:1
        }
    },
    template:"#alert"
})

Vue.component('msg-show',MsgShow);

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
    console.log("加载jquery...");
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

