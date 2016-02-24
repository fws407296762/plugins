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
                                <input type="text" v-model="localMusic" value="{{localMusic}}" class="form-control" placeholder="输入本地根目录"/>
                            </div>
                            <div class="form-group">
                                <label>上传目录</label>
                                <input type="text" v-model="serverMusic" value="{{serverMusic}}" class="form-control" placeholder="请输入项目存放音乐的目录"/>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">上传音乐</button>
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
                        <ul v-for="music in musics">
                            <li>
                                <span class="music-action-box">
                                    <a>删除</a>
                                    <a>置顶</a>
                                </span>
                                <span class="music-name" v-text="music.name"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="upload-tip" :style="{'top': isUploaded ? '0px' : '-50px'}">
        <v-alert :type="isError ? 'error' : 'success'" :message="uploadedMsg" :closable="true" :on-close="_close"></v-alert>
    </div>
</template>

<style scoped>
    .upload-tip{ 
        position: absolute;
        width: 100%;
        top: -50px;
        text-align: center;
        transition: all .5s ease-in-out;
    }
    .upload-tip .alert-box{
        display: inline-block;
    }
    .upload-tip.upload-tip-close{
        top:-50px;
    }
</style>

<script>
    import vAlert from "../component/alert"
    export default{
        data(){
            return {
                localMusic:"E:/musics",
                serverMusic:"music",
                isError:false,
                isUploaded:0,
                uploadedMsg:"",
                musics:[],
            }
        },
        components:{vAlert},
        methods:{
            loadMusic () {
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
                    var data = res.data,
                        code = parseInt(data.code);
                    if(code){
                        self.isError = true;
                        self.uploadedMsg = data.msg;
                        return false;
                    }
                    self.isError = false;
                    self.uploadedMsg = '更新音乐成功';
                },function(err){
                    self.uploadedMsg = err.msg;
                });
            },
            _close () {
                this.isUploaded = 0;
            }
        }
    }
</script>
