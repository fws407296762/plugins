/**
 * Created by cnns-xz on 2016/1/25.
 */

define(function(require,exports,module){
    var $ = require('jquery'),
        common = require('common'),
        Vue = require("Vue"),
        WdatePicker = require("WdatePicker");



    $(function(){
        common.init();
        $("#searchForm").on("click",".searchType",function(){
            var $ui_select_datalist = $(this).find(".ui_select_datalist");
            $ui_select_datalist.on("click","li",function(){
                var dataIndex = parseInt($(this).data("index"));
                $("#customerName")[dataIndex === 0? "show" : "hide"]();
                $("div.searchState").css("display",dataIndex === 1 ? "inline-block" : "none");
                $(".create-date-input").css("display",dataIndex === 2 ? "inline-block" : "none");

            });
        });
        $("#searchForm").on("focus","#createDateTime",function(){
            WdatePicker()
            $(this).trigger("blur");
        });
    });



});