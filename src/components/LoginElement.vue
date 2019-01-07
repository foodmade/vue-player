<template>
    <div style="text-align:center">
        <el-form :model="userInfo" ref="userInfo" label-width="100px" class="demo-ruleForm">
            <el-form-item>
                <el-input class="loginInput"
                        placeholder="邮箱/手机号码"
                        prefix-icon="custom-user-zhanghao1"
                        v-model="userInfo.username">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input class="loginInput"
                        placeholder="请输入密码"
                        prefix-icon="custom-user-mima1"
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
                <el-button id="loginBut" type="primary" @click.native="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import "../assets/icon/iconfont.css"
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
        methods: {
            submitForm() {
                alert(JSON.stringify(this.userInfo))
            },
            registerApi(){
                alert('register')
            }
        }
    }
</script>
<style>
    .el-button--primary {
        float: right !important;
    }

    .loginInput{
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
    }
</style>