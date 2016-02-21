<template>
    <div class="content-header">
        <h1>音乐播放器</h1>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-md-6">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">添加音乐</h3>
                    </div>
                    <form v-on:submit.prevent="loadMusic">
                        <div class="box-body">
                            <div class="form-group">
                                <label>本地目录</label>
                                <input type="text" value="{{localMusic}}" class="form-control" placeholder="输入本地根目录"/>
                            </div>
                            <div class="form-group">
                                <label>上传目录</label>
                                <input type="text" value="{{serverMusic}}" class="form-control" placeholder="请输入项目存放音乐的目录"/>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">上传音乐</button>
                            <msg-show></msg-show>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <h3 class="box-title">音乐列表</h3>
                    </div>
                    <div class="box-body">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                localMusic:"E:/musics",
                serverMusic:"music",
                isError:false,
                isUploaded:0,
                uploadedMsg:""
            }
        },
    methods:{
            loadMusic:function(){
                var self = this;
                this.isUploaded = 1;
                this.$http({
                    url:"/musics",
                    data:{
                        sourceMusic:this.localMusic,
                        destMusic:this.serverMusic
                    },
                    method:"GET"
                }).then(function(res){
                    var data = res.data;
                    console.log(res.data);
                    if(data){
                        self.isError = true;
                        self.uploadedMsg = data.msg;
                        return false;
                    }
                },function(err){
                    console.log(err.msg);
                });
            }
        }
    }
</script>
