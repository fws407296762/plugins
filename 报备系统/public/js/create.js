/**
 * Created by cnns-xz on 2016/1/27.
 */

define(function(require,exports,module){
    var $ = require("jquery"),
        common = require("common"),
        WdatePicker = require("WdatePicker"),
        Vue = require("Vue");

    require("PCASClass");
    $(function(){
        new PCAS("province","city","area")
        $("#estimateDateBox").on("click","#estimateDate",function(){
            WdatePicker({minDate:'%y-%M-{%d+1}'})
            $(this).trigger("blur");
        })
    })

    var createInfoBox = new Vue({
        el:"#createInfoBox",
        data:{
            products:[
                {
                    name:"长矛深度安全检测加强版(渗透测试)",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"长矛深度安全检测专业版(渗透测试)",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"长矛深度安全检测标准版(渗透测试)",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"长矛漏洞管理企业版(漏洞扫描)",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"长矛漏洞管理企业版(漏洞扫描)",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"Metasploit pro",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"Metasploit express",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"Nexpose Enterprise",
                    num:1,
                    selected:false,
                    isChange:false
                },
                {
                    name:"Nexpose express",
                    num:1,
                    selected:false,
                    isChange:false
                }
            ]
        },
        methods:{
            toggleSelected:function(index,$event){

                var isSelected = this.products[index].selected;
                this.products[index].selected = isSelected ? false : true;
            },
            changeNum:function(index,$event){
                console.log(this.products[index].isChange)
                this.products[index].isChange = true;
            }
        }
    });

})