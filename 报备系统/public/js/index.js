/**
 * Created by cnns-xz on 2016/1/21.
 */

define(function(require,exports,module){
    var $ = require('jquery');
    var common = require('common');
    var showChart = common.showChart,
        showMap = common.showMap,
        echarts = common.echarts;
    $(function(){
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

        $.get("/public/js/shanxi.json",function(shanxiJSON){
            echarts.registerMap('shanxi', shanxiJSON);
            showMap({
                id:"customerMapChart",
                option:{
                    tooltip : {
                        trigger: 'item',
                        formatter: '{a}<br />{b}<br/>{c}'
                    },
                    visualMap: {
                        min: 0,
                        max: 2000,
                        text:['高','低'],
                        realtime: false,
                        calculable : true,
                        color: ['orangered','yellow','lightskyblue']
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'shanxi',
                            roam:true,
                            label:{
                                normal:{show:true},
                                emphasis:{show:true}
                            },
                            data:[
                                {name:"贵阳市", value:20},
                                {name:"阳泉市", value:2000},
                                {name:"长治市", value:500},
                                {name:"武汉市", value:500}
                            ]
                        }
                    ]

                }
            })
        })

    });

});


