<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width='680px'
            heigth="400px"
            top="15vh"
            :before-close="handleClose">

        <video-player  class="vjs-default-skin vjs-big-play-centered"
                       :options="playerOptions"
                       @play="onPlayerPlay()"
                       @pause="onPlayerPause()"
        >
        </video-player>

    </el-dialog>

</template>
<script>
    import { videoPlayer } from "vue-video-player";
    export default {
        data(){
            return {
                playerOptions:{
                    height: '360',
                    sources: [{
                        type: "rtmp/mp4",
                        src:'',

                    }],
                    techOrder: ['flash'],
                    autoplay: false,
                    controls: true,
                    poster: "../../../src/static/img/poster.png"
                },
            }
        },
        methods:{
            onPlayerPlay:function () {
                this.playerOptions.sources[0].src = "https://video.kg.com/17895/529015790687625216.mp4";//videoAddress为传过来的变量
            },
            onPlayerPause:function () {

            },
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>