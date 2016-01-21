/**
 * Created by cnns-xz on 2016/1/21.
 */

$(function(){
    "use strict";
    $(".reminder-global-footer").on("click",function(){
        $(this).siblings(".reminder-global-body").slideToggle();
        $(this).parents(".reminder-global-box").toggleClass("active-reminder-box");
        $(this).find(".iconfont").toggleClass("icon-ux14002204091397903");
    })
});