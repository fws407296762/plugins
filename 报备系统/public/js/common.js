/**
 * Created by cnns-xz on 2016/1/20.
 */


$(function(){
    "use strict";
    var screenSizes = {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    };
    init();
    $(window, ".wrapper").resize(function () {
        init();
    });

    $(document).on("click","[data-toggle='offcanvas']",function(e){
        e.preventDefault();
        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
            if ($("body").hasClass('sidebar-collapse')) {
                $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            } else {
                $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            }
        }
        //Handle sidebar push menu for small screens
        else {
            if ($("body").hasClass('sidebar-open')) {
                $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            } else {
                $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
            }
        }
    });
    $("body").on("collapsed.pushMenu",function(){
        console.log("收缩");
    });
    $("body").on("expanded.pushMenu",function(){
        console.log("展开");
    });
});

function init(){
    var neg = $(".main-header").outerHeight() + $(".main-footer").outerHeight();
    var windowHeight = $(window).height(),
        sidebarHeight = $(".sidebar").height();
    var postSetWidth;
    if(windowHeight >= sidebarHeight){
        $(".content-wrapper, .right-side").css('min-height', windowHeight - neg);
    }else{
        $(".content-wrapper, .right-side").css('min-height', sidebarHeight);
    }
}