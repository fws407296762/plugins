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
                            <button type="submit" class="btn btn-primary">添加本地音乐</button>
                        </div>
                    </form>


                </div>
                <div class="play-box">
                    <span class="music-icon">
                        <img src="/images/icon-music.jpg" alt=""/>
                    </span>
                    <h3 class="play-music-name" v-text="playMusic.title"></h3>
                    <div class="track-box">
                        <div class="track-default"></div>
                        <div class="track-loaded"></div>
                        <span class="track-point"></span>
                    </div>
                    <div class="action-box">
                        <a class="action-btn prev-btn iconfont icon-shangyiqu"></a>
                        <a v-if="!isPlaying" @click="boxPlay($event)" class="action-btn play-btn iconfont icon-bofang"></a>
                        <a v-if="isPlaying" @click="boxPause($event)" style="vertical-align: -2px;" class="action-btn play-btn iconfont icon-zanting"></a>
                        <a class="action-btn next-btn iconfont icon-xiayiqu"></a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <h3 class="box-title">音乐列表</h3>
                    </div>
                    <div class="box-body">
                        <ul class="music-list">
                            <li v-for="(index,music) in musics">
                                <span class="music-action-box">
                                    <a @click="playSelected(music,$event)">播放</a>
                                    <a>删除</a>
                                    <a>置顶</a>
                                </span>
                                <span class="music-name">{{index + 1}}.{{music.title}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--<audio id="audioBox" controls="controls" :src="playMusic.src"></audio>-->
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
    .music-list{
        list-style: none;
        padding: 0 10px;
        margin: 0;
    }
    .music-list li{
        border-bottom: 1px solid #f0f0f0;
        padding: 10px 5px;
    }
    .music-action-box{ float: right;}
    .play-box{ position: relative; background: #333;border-radius: 4px;padding: 15px 10px 10px 100px; margin-top: 20px; overflow: hidden;}
    .music-icon{ width: 80px; height:80px;border-radius: 50%; float: left;text-align: center; margin-left: -90px;}
    .music-icon img{ width: 100%; height: 100%;border-radius: 50%;}
    .play-music-name{ color: #fff; font-size: 16px; margin-top: 8px;}
    .track-box{ position: relative; height: 6px; margin-top: 15px;}
    .track-default{ left: 0; top: 0; background: #000;box-shadow: inset 0 0 5px #666; position: absolute; width: 100%; height: 100%;border-radius: 6px;}
    .track-loaded{ left: 0; top: 0; background: linear-gradient(#fff,#e0e0e0); position: absolute; width: 0; height: 100%;border-radius: 6px; z-index: 10;}
    .track-point{ position: absolute;background: linear-gradient(#fff,#e0e0e0); width: 12px; height: 12px; border-radius: 100%; top: -3px; cursor: pointer;}
    .action-box{ margin-top: 10px;}
    .action-box a{ padding: 0 5px 0 0;text-align: center;background-image: linear-gradient(#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent; font-size: 20px; cursor: pointer;}
    .play-btn{ margin-left: 8px; margin-right: 5px;}
</style>

<script>
    import vAlert from "../component/alert"

    export default{
        components:{vAlert},
        data(){
            return {
                localMusic:"D:\\project\\plugins\\music",
                serverMusic:"musics",
                isError:false,
                isUploaded:false,
                uploadedMsg:"",
                musics:[],
                playMusic:{},
                isPlaying:false,
                audio:null
            }
        },
        watch:{
            'isPlaying':function(val, oldVal){
                console.log(val, oldVal);
            }
        },
        methods:{
            loadMusic () {
                var self = this;
                this.isUploaded = true;
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
                    this.musics = data.musics;
                },function(err){
                    self.uploadedMsg = err.msg;
                });

            },
            _close () {
                this.isUploaded = false;
            },
            playSelected(music,$event){
                this.playMusic = {
                    title:music.title,
                    src:music.src
                }
                this.audio = new Audio(music.src);
            },
            boxPlay($event){
                this.audio.play();
                this.isPlaying = true;
            },
            boxPause($event){
                this.audio.pause();
                this.isPlaying = false;
            }
        }
    }
</script>
