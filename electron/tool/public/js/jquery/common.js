$(function(){
    var windowHeight = $(window).outerHeight();
    $(".content-wrapper").css('min-height',windowHeight);
    $(window,'.content-wrapper').resize(function(){
        var windowHeight = $(window).outerHeight();
        $(".content-wrapper").css('min-height',windowHeight);
    });
})