<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div style="text-align:center">
        <el-form :model="userInfo" ref="userInfo" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
                <el-input class="CInput"
                        placeholder="QQ邮箱"
                        prefix-icon="custom-user-zhanghao1"
                        clearable
                        v-model="userInfo.username">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <el-input class="CInput"
                        placeholder="请输入密码"
                        prefix-icon="custom-user-mima1"
                        clearable
                        type="password"
                        v-model="userInfo.password">
                </el-input>
                <a href="/" class="forget-password-link">忘记密码?</a>
            </el-form-item>
            <el-form-item>
                <div id="registerDiv" style="text-align:left;position: relative">
                    <span>还没账号?</span>
                    <a v-on:click="registerApi" href="javascript:void(0)" >
                            点我注册
                    </a>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button id="loginBut" type="primary" @click.native="submitForm('userInfo')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import "../assets/icon/iconfont.css"
    import _global from "../components/Global";
    export default {
        name:'loginEml',
        data() {
            return {
                userInfo: {
                    username: '',
                    password: '',
                    code: ''
                },
                rememberPwd:1
            };
        },
        props:{
            loginSwitch:{
                type:Boolean,
                default:false
            },
            registerSwitch:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        return false;
                    }
                });
            },
            //更新父组件的状态值 弹出注册框
            registerApi(){
                this.$emit('update:loginSwitch', false);
                this.$emit('update:registerSwitch', true);
            },
            login(){
                if(this.userInfo.username === ''){
                    this.$errMsg('请输入邮箱');
                }
                if(this.userInfo.password === ''){
                    this.$errMsg('请输入密码');
                }
                let url = _global._CONST_PARAM._HOST + '/login.do';
                this.$post(url,this.userInfo)
                    .then((rsp) => {
                        if(rsp.code === _global._CONST_PARAM._SUCCESS_CODE){
                            this.$successMsg('登陆成功');
                        }else{
                            this.$errMsg('登陆失败 原因:'+rsp.message);
                        }
                    })
            }
        }
    }
</script>
<style>

    .el-button--primary {
        float: right !important;
    }

    .CInput{
        width: 100% !important;
    }

    .forget-password-link {
        position: absolute;
        right: 20px;
        font-size: 12px;
    }

    .el-dialog__body {
        padding: 20px 20px !important;
    }

    #loginBut{
        padding: 12px 160px !important;
        outline: none !important;
    }
</style>