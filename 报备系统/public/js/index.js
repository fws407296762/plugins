/**
 * Created by cnns-xz on 2016/1/21.
 */

$(function(){
    "use strict";

    $(".reminder-global-footer").on("click",function(){
        $(this).siblings(".reminder-global-body").slideToggle();
        $(this).parents(".reminder-global-box").toggleClass("active-reminder-box");
        $(this).find(".iconfont").toggleClass("icon-ux14002204091397903");
    });
    var base = +new Date(2015,9,3);
    var oneDay = 24*3600*1000;
    var date = [];

    var data = [Math.random () * 150];
    for(var i = 1;i<100;i++){
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(),now.getMonth() + 1,now.getDate()].join("-"));
        data.push((Math.random() - 0.4) * 20 + data[i - 1]);
    }

    showChart({
        option:{
            xAxis:{
                data:date
            },
            series:[{
                name:"客户报备",  //用于tooltip的显示
                type:'line',  //图表类型
                smooth:true,  //是否平滑曲线
                symbolSize:8,
                data:data
            }]
        },
        id:"customerProfileChart"
    });

});

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