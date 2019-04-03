<template>
    <div class="item" style="width: 100%;height: 500px;background-color: black">
        <video class="vjs-custom-skin" style="width: 100%;height: 100%;display: inline"
                   controls="controls" id="video" playsinline autoplay
                   preload="auto" oncontextmenu="return false">
        </video>
        <iframe id="iframeVideo" style="width: 100%;height: 500px;display: none" src="" ></iframe>
    </div>
</template>

<script>
    import "videojs-contrib-hls.js";
    import $ from "jquery";
    export default {
        name:'videoBox',
        props:['sendData'], // 用来接收父组件传给子组件的数据
        data(){
            return {
                intervalId:null,
                video:null
            }
        },
        methods: {
            playerM3u8(playUrl){
                var hls = new Hls();
                hls.loadSource(playUrl);
                hls.attachMedia(this.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    this.video.play();
                });
             },
            playerMp4(playUrl){
                console.log('video play mp4');
                var document = $('#video');
                document.attr('src',playUrl);
            },
            playerIfream(playUrl){
                console.log('video play ifream');
                $('#video').css("cssText","width: 100%;height: 500px;display:none !important");
                $('#iframeVideo').css("cssText","width: 100%;height: 500px;display:inline !important");
                $('#iframeVideo').attr('src',playUrl);
            },
            initVideo(){
                this.video = document.getElementById('video');
            },
            monitorStatus(){
                if(!this.sendData.visible){
                    this.stopVideo();
                    clearInterval(this.intervalId)
                }
            },
            stopVideo(){
                if( this.video === undefined){
                    return;
                }
                console.log('调用stop video');
                this.video.pause();
                this.video.currentTime = 0;
                this.video = undefined;
            },
            parseMovieType(){
                if(this.sendData === undefined || this.sendData.videoUrl === ''){
                    return '';
                }
                var splitArray = this.sendData.videoUrl.split('.');
                if(splitArray === undefined || splitArray.length === 0){
                    return '';
                }
                return splitArray[splitArray.length-1];
            },
            errMsg(msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            },
        },
        mounted:function () {
            //获取视频类型
            var movieType = this.parseMovieType();
            console.log('type:'+movieType.indexOf('m3u8'));
            if(movieType === ''){
                this.errMsg('视频类型解析失败');
                return;
            }
            //初始化播放器
            this.initVideo();
            //视频地址
            var url = this.sendData.videoUrl;
            //打开界面自动开始加载播放视频
            //这里判断视频地址类型 MP4通过普通video方式播放 m3u8通过Hls插件播放
            //需要对视频类型进行分类 这儿暂时只对m3u8和mp4类型进行区分
            //如果访问端是移动端 则全部按mp4格式播放即可
            var m3Flag = movieType.indexOf('m3u8')>-1;
            var mp4Flag = movieType.indexOf('mp4')>-1;
            if(!this.$isPc()){
                if(!m3Flag && !mp4Flag){
                    this.playerIfream(url);
                }else{
                    this.playerMp4(url);
                }
            }else if(m3Flag){
                this.playerM3u8(url);
            }else if(mp4Flag){
                this.playerMp4(url);
            }else{
                this.playerIfream(url);
            }
        },
        created () {
            //监听父组件传来的消息
            this.intervalId = setInterval(() => {
                this.monitorStatus()
            }, 500)
        },
    }
</script>
<style type="text/css" scoped>

</style>