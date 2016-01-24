/**
 * Created by fuwensong on 2016/1/23.
 */

var app = new Vue({
    ele:"#app"
});

var App = Vue.extend({})
var router = new VueRouter();
var Music = Vue.extend({
    components: require("../../views/music.vue")
})

router.map({
    "/":{
        component:Music
    },
    "/music":{
        component:Music
    }
});

router.start(App,"#app")

