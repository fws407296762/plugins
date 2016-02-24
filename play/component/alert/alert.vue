
<template>
    <div :class="!description ? 'alert-box alert-'+type+'-box' : 'alert-box alert-description-box alert-'+type+'-box'">
        <i :class="'iconfont' + iconClass"></i>
        <p class="alert-message" v-text="message"></p>
        <p v-if="description" class="alert-description" v-text="description"></p>
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
                let iconClass = this.description ? " alert-icon alert-with-description-icon icon-" : " alert-icon icon-";
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
