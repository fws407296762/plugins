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

        $.fn.selectMatch = function(options){
            var select = "select",
                selected = "selected",
                disabled = "disabled",
                active = "active",
                reverse = "reverse",
                changedObj = {
                    prefix:'ui_',
                    trigger:['change']
                },
                merge = $.extend({},changedObj,options||{}),
                eleClass = merge.prefix+select,
                underline = merge.prefix.replace(/[a-z]]/gi,""),
                layoutObj = function(select){
                    var index = 0,
                        html = "";
                    return select.find('option').each(function(i){
                        var classAry = [eleClass+underline+"datalist"+underline+"li",this.className];
                        this[selected] && (index = i,classAry.push(selected));
                        this[disabled] && classAry.push(disabled);
                        html = html + '<li class="'+classAry.join(" ")+'" data-index='+i+'>' + this.innerHTML +'</li>';
                    }),{
                        index:index,
                        html:html
                    }
                };

                return $(this).each(function(index,ele){
                    var
                })

        }

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

    module.exports = {
        showChart:showChart,
        showMap:showMap,
        echarts:echarts
    }
})





