<template>
    <div style="height: 300px">
        <el-steps :active="active" finish-status="success" align-center="true">
            <el-step title="步骤 1" description="请输入邮箱地址"></el-step>
            <el-step title="步骤 2" description="请输入验证码"></el-step>
            <el-step title="步骤 3" description="设置新密码"></el-step>
        </el-steps>

        <div id="backEmailInput" style="margin-top: 100px;
                                        width: 50%;
                                        display: inline-block;
                                        float: left">
            <el-input clearable v-if="active === 1" v-on:mouseleave.native="checkAccount" class="distanceLeft" placeholder="请输入邮箱地址" v-model="data.username"/>
            <el-input clearable v-if="active === 2"  class="distanceLeft" placeholder="请输入验证码" v-model="data.code"/>
            <div v-if="active === 3">
                <el-input clearable class="distanceLeft" placeholder="输入新密码" v-model="email"/>
                <el-input clearable class="distanceLeft" placeholder="确认密码" v-model="email"/>
            </div>
        </div>
        <div style="display: inline-block;margin-top: 100px">
            <el-button :disabled="stageFlag" type="success" @click="next">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import _global from "../components/Global";
    export default {
        name:'passwordBackElement',
        data() {
            return {
                data:{
                    username:'',
                    code:''
                },
                active: 1,
                stageFlag:true
            };
        },

        methods: {
            next() {
                if(!this.stageFlag){
                    this.active ++ ;
                    this.stageFlag=true;
                }
            },
            checkAccount(){
                if(this.data.username === ''){
                    this.$errMsg('请输入邮箱地址');
                    this.stageFlag=true;
                }else if(!this.$checkEmailFormat(this.data.username)){
                    this.$errMsg('邮箱格式错误');
                    this.stageFlag=true;
                }else{
                    //检查邮箱是否注册
                    let url = _global._CONST_PARAM._HOST + '/checkUserNameExist.do';
                    this.$post(url,this.data)
                        .then((rsp)=>{
                            if(rsp.code === _global._CONST_PARAM._SUCCESS_CODE){
                                this.$errMsg('该邮箱未注册');
                                this.stageFlag=true;
                            }else{
                                this.stageFlag = false;
                            }
                        })
                }
            },

        }
    }
</script>

<style>
    #backEmailInput input {
        border-radius: 30px;
    }

    .distanceLeft{
        left: 24%;
    }

</style>