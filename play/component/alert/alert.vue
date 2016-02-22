
<template>
    <div class="alert-box">
        测试弹窗提示
        <i class="iconfont icon-success"></i>
    </div>
</template>

<script>
    export default {
        props:{    // 各种属性验证
            prefixCls:"play-alert",
            type:String,
            closable:Boolean,
            message:String,
            description:String,
            closeText:String,
            onClose:()=>{}
        },
        data () {
            return {   //数据
                iconClass:"",
                closeName:"",
                closing:true,
                closed:false
            }
        },
        computed:{
            iconClass () {   //根据描述调整 class
                let iconClass = this.description ? "alert-with-description-icon icon-" : "alert-icon icon-";
                switch (this.type){
                    case "success":
                        iconClass += 'success';
                        break;
                    case "error":
                        iconClass += 'error';
                        break;
                    case "info":
                        iconClass += 'info';
                        break;
                    case "warn":
                        iconClass += 'exclamation';
                        break;
                }

                return iconClass;
            },
            closeName () {
                return !this.closing ? " " + this.prefixCls + "-close" :"";
            }
        }
    }
</script>
