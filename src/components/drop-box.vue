<template>
    <div class="delimit-box" :class="{'active': active}">
        <div class="delimit-box-header">
            <div class="myClose">
                <i v-on:click="close" class="el-icon-back">返回</i>
            </div>
            <span>{{title}}</span>
        </div>
        <div style="clear:both"></div>

        <!--已登录时展示内容-->
        <div v-if="loginStatus" style="top: 20%;position: relative">
            <span >已登录</span>
        </div>

        <!--未登录时展现的内容-->
        <div class="noLogin" v-else>
            <div class="stateImg"></div>
            <div class="inside">
                <span style="">你还没有登录~ 是否前去</span>
                <a href="javaScript:void(0)" v-on:click="openLoginEml"> 登录</a>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "delimitBox",
        data(){
            return{
                isLogin:false
            };
        },
        props: {
            active:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:''
            },
            LoginVisible:{
                type:Boolean,
                default:false
            },
            loginStatus:{
                type:Boolean,
                default:false
            }
        },

        methods:{
            close(){
                this.$emit('update:active',false);
            },
            openLoginEml(){
                this.close();
                this.$emit('update:LoginVisible',true);
            }
        },
        mounted(){
            //初始化登陆状态
            // this.isLogin = this.GLOBAL.getUserLoginStatus() === this.GLOBAL._CONST_PARAM._ONLINE_STATUS;
            // alert(this.loginStatus)
        }
    }
</script>

<style scoped lang="less">

    .delimit-box {
        padding: 15px;
        position: fixed;
        z-index: 1039;
        background-color: rgb(255, 255, 231);
        /*background-color: rgba(255, 255, 255, 255);*/
        width: calc(30%);
        height: 92%;
        overflow: auto;
        left: 100%;
        /*top: 0;*/
        box-shadow: rgba(153, 153, 153, 0.75) 0 0 10px 0;
        transition: left 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .delimit-box.active {
        left: 70%;
    }

    .delimit-box-header {
        position: relative;
        margin-bottom: 10px;
        text-align: center;
        font-size: 16px;
    }

    .myClose{
        position: relative;
        float: left;
        width: 60px;
        height: 30px;
        display: inline-block;
        top: 2.5px;
        cursor: pointer;
    }

    .noLogin {
        position: relative;
        /*background-color: #0fb053;*/
        width: 100%;
        height: 80%;
        .inside {
            width: 100%;
            height: 30%;
            text-align: center;
            position: relative;
            top: 30%;
            font-size: 15px;
            /*background-color: #6b6b6b*/
        }
        .stateImg {
            width: 40%;
            height: 30%;
            position: relative;
            top: 20%;
            /*background-color: rgb(255, 255, 231);*/
            left: 30%;
            background:url('../common/img/fail_2.jpg');
            background-size:100% 100%
        }
    }

</style>