/**
 * Created by cnns-xz on 2016/1/20.
 */


define(function(require,exports,module){
    var $ = require('jquery');
    $(function(){
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


    function showChart(options){

        var option = {
            title:{
                x:"center",
                text:"客户报备情况"
            },
            legend:{
                top:"bottom",
                data:['客户']
            },
            grid:{
                left: '0%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            tooltip:{
                show:true,
                trigger:'axis'
            },
            toolbox:{
                show:true,
                feature:{
                    mark:{show:true},
                    dataView:{show:true,readOnly:false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage:{show:true}
                }
            },
            xAxis:[
                {
                    type:'category',
                    boundaryGap:false,  //X轴左右两边是否留白
                    data:[]   //当 type为 "category" 则必须要有 data 属性
                }
            ],
            yAxis:[{
                type:'value'
            }],
            dataZoom:{    //主要用于下面的滚动轴的显示
                type:'inside'  //inside将滚动轴隐藏，slider使显示
            },
            series:[]
        };

        $.extend(option,options.option);

        var showEcharts = echarts.init(document.getElementById(options.id));
        showEcharts.setOption(option);
        $(window).resize(function(){
            showEcharts.resize()
        });
    }

    function showMap(options){
        var option = {
            backgroundColor:"#478db7",
            tooltip : {
                trigger: 'item',
                formatter: '{a}<br />{b}<br/>{c} '
            },
            toolbox: {
                top:"5",
                show : true,
                iconStyle:{
                    normal:{
                        borderColor:"#fff"
                    }
                },
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series:[
                {
                    type: 'map',
                    roam:true
                }
            ]
        };
        $.extend(option,options.option);
        var showEcharts = echarts.init(document.getElementById(options.id));

        showEcharts.setOption(option);
        $(window).resize(function(){
            showEcharts.resize()
        });
    }
    //select 美化
    $.fn.selectMatch=function(a){var b="select",c="selected",d="disabled",e="active",f="reverse",g={prefix:"ui_",trigger:["change"]},h=$.extend({},g,a||{}),i=h.prefix+b,j=h.prefix.replace(/[a-z]/gi,""),k=function(a){var b=0,e="";return a.find("option").each(function(a){var f=[i+j+"datalist"+j+"li",this.className];this[c]&&(b=a,f.push(c)),this[d]&&f.push(d),e=e+'<li class="'+f.join(" ")+'" data-index='+a+">"+this.innerHTML+"</li>"}),{index:b,html:e}};return $(this).each(function(a,g){var l=$(this).hide().data(b);l||(l=$("<div></div>").on("click","a",function(){if($(g).prop(d))return!1;if(l.toggleClass(e),l.hasClass(e)){var a=l.find("ul"),b=a.offset().top+a.outerHeight()>Math.max($(document.body).height(),$(window).height());l[b?"addClass":"removeClass"](f);var h=l.data("scrollTop"),i=a.find("."+c);h&&h[1]==i.attr("data-index")&&h[2]==i.text()&&(a.scrollTop(h[0]),l.removeData("scrollTop"))}else l.removeClass(f)}).on("click","li",function(a,b){var d=$(this).attr("data-index"),f=$(this).parent().scrollTop();l.removeClass(e),l.data("scrollTop",[f,d,$(this).text()]),$(g).find("option").eq(d).get(0)[c]=!0,$(g).selectMatch(h),$.each(h.trigger,function(a,c){$(g).trigger(c,[b])})}),$(this).data(b,l),$(this).after(l),$(document).mouseup(function(a){var b=a.target;b&&l.hasClass(e)&&l.get(0)!==b&&0==l.get(0).contains(b)&&l.removeClass(e).removeClass(f)}));var m=k($(this)),n=$(this).find("option").eq(m.index);l.attr("class",g.className+" "+i).width($(this).outerWidth());var o='<a href="javascript:" class="'+i+j+'button"><span class="'+i+j+'text">'+n.html()+'</span><i class="'+i+j+'icon triangle-top"></i></a>',p='<ul class="'+i+j+'datalist">'+m.html+"</ul>";l.html(o+p)})}

    $("input[type='date-input']").each(function(){
        var style = $(this).attr('style'),
            className = $(this).attr('class'),
            id = $(this).attr('id'),
            name = $(this).attr('name'),
            onclick = $(this).attr('onclick'),
            onblur = $(this).attr('onblur'),
            onfocus = $(this).attr('onfocus'),
            placeholder = $(this).attr('placeholder');
        var styleHtml = '',
            onclickHtml = '',
            onblurHtml = '',
            onfocusHtml = '';

        style && (styleHtml = 'style="'+style+'"');
        onclick && (onclickHtml = 'onclick="'+onclick+'"')
        onblur && (onblurHtml = 'onblur="'+onblur+'"')
        onfocus && (onfocusHtml = 'onfocus="'+onfocus+'"')


        var newDateHtml = '<span class="date-box '+className+'" '+styleHtml+'>'+
            '<span class="date-input-box"><input placeholder="'+placeholder+'" readonly="readonly" type="text" '+onblurHtml+' '+onclickHtml+' '+onfocusHtml+'  class="date-input input-text" name="'+name+'" id="'+id+'" /></span>'+
            '<i class="icon-date"></i>'+
            '</span>'
        $(this).after(newDateHtml);
        $(this).remove();
    });

    module.exports = {
        showChart:showChart,
        showMap:showMap,
        init:function(a,b){
            a = a || $("select"),
            a.selectMatch(b)
        }
    }
})





