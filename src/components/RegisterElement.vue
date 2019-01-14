<template>
    <div style="text-align: center">
        <el-form :model="registerData" :rules="rules" ref="registerData" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input class="CInput"
                          placeholder="QQ邮箱"
                          prefix-icon="custom-user-youjian"
                          clearable
                          v-model="registerData.username">
                </el-input>
            </el-form-item>
            <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },{ min: 4, max: 4, message: '请输入4个字符', trigger: 'change' }]">
                <el-input style="width: 45%;float: left"
                          placeholder="验证码"
                          prefix-icon="custom-user-yanzhengma"
                          clearable
                          v-model="registerData.code">
                </el-input>
                <el-button id="sendCodeBut" @click.native="sendEmail" type="success" :disabled="authCodeDisabled" :loading="butLoading">{{sendCodeBut}}</el-button>
            </el-form-item>
            <el-form-item prop="usernick" :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' },
                                                    { min: 1, max: 10, message: '长度在 1 到 5 个字符', trigger: 'change' }]">
                <el-input class="CInput"
                          placeholder="昵称"
                          prefix-icon="custom-user-nicheng"
                          clearable
                          v-model="registerData.usernick">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{ min: 6, max: 12, message: '请输入 6 到 12个字符', trigger: 'change' }]">
                <el-input class="CInput"
                          placeholder="密码 6~12位"
                          prefix-icon="custom-user-mima"
                          type="password"
                          clearable
                          v-model="registerData.password">
                </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input class="CInput"
                          placeholder="确认密码"
                          prefix-icon="custom-user-mima1"
                          type="password"
                          clearable
                          v-model="registerData.confirmPassword">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button id="loginBut" type="primary" @click.native="submitForm('registerData')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import _global from "../components/Global";
    export default {
        name: "RegisterElement",
        data() {
            var validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validEmail = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入邮箱'))
                }else if(!this.checkEmailFormat(value)){
                    callback(new Error('邮箱格式错误!'))
                }else{
                    this.checkEmailIsExist(value,callback);
                }
            };
            return {
                registerData: {
                    username: '',
                    usernick: '',
                    password: '',
                    confirmPassword:'',
                    code: ''
                },
                errMsgConst:{
                    pleaseOutEmail:'请输入邮箱',
                    emailFormatInvalid:'邮箱格式错误',
                    sendSuccess:'邮件发送成功,请注意查看邮件'
                },
                sendCodeButDefaultVal:'获取验证码',
                defaultCodeTotalTime:60,
                rules:{
                    confirmPassword:[
                        { validator: validateConfirmPassword, trigger: 'blur' }
                    ],
                    username:[
                        { validator: validEmail, trigger: 'blur'  },
                    ]
                },
                butLoading:false,
                authCodeDisabled:false,
                retryTime:0,
                sendCodeBut:'',
                codeTimer:null
            };
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitAccountInfo();
                    } else {
                        return false;
                    }
                });
            },
            checkEmailFormat(email){
                //对电子邮件的验证
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!myreg.test(email)) {
                    return false;
                }
                return true;
            },
            sendEmail(){
                var email = this.registerData.username;
                if(email === '' || !email || email === undefined){
                    this.$errMsg(this.errMsgConst.pleaseOutEmail);
                    return;
                }
                if(!this.checkEmailFormat(email)){
                    this.$errMsg(this.errMsgConst.emailFormatInvalid);
                    return;
                }
                const url = _global._CONST_PARAM._HOST + "/sendEmail.do?email=" + email;
                this.$fetch(url)
                    .then((rsp)=>{
                        if(rsp.code === '200'){
                            this.loadingSendCodeBut();
                            this.$successMsg(this.errMsgConst.sendSuccess);
                        }else{
                            this.$errMsg(rsp.message);
                        }
                    })
                    .catch((rsp)=>{
                        this.$errMsg('邮件发送异常,请稍后重试 code:'+rsp.code);
                    })
            },
            loadingSendCodeBut(){
                this.startCodeTimer();
                this.butLoading = true;
                this.sendCodeBut = this.defaultCodeTotalTime + 'S';
                this.authCodeDisabled = true;
            },
            initSendCodeBut(){
                this.butLoading = false;
                this.authCodeDisabled = false;
                this.sendCodeBut = this.sendCodeButDefaultVal;
            },
            startCodeTimer(){
                let totalTime = this.defaultCodeTotalTime;
                this.codeTimer = setInterval( () => {
                    if(totalTime <= 0){
                        this.clearIntervalTimer(this.codeTimer);
                        this.initSendCodeBut();
                        return;
                    }
                    this.sendCodeBut = --totalTime + 'S';
                }, 1000)
            },
            clearIntervalTimer(timer){
                clearInterval(timer);
            },
            submitAccountInfo(){
                const url = _global._CONST_PARAM._HOST + "/registerAccount.do";
                this.$post(url,this.registerData)
                    .then((rsp) =>{
                        if(rsp.code === '200'){
                            this.$successMsg('注册成功');
                        }else{
                            this.$errMsg(rsp.message);
                        }
                }).catch((rsp)=>{
                    this.$errMsg('注册失败,异常错误');
                })
            },
            checkEmailIsExist(val,callback){
                let url = _global._CONST_PARAM._HOST + '/checkUserNameExist.do';
                this.registerData.username = val;
                this.$post(url,this.registerData)
                    .then((rsp) => {
                        if(rsp.code === '200'){
                            callback();
                        }else{
                            callback(new Error(rsp.message));
                        }
                    })
            }
        },
        mounted() {
            this.sendCodeBut = this.sendCodeButDefaultVal;
        }
    }
</script>

<style scoped>
    button{
        outline:none;
    }

    #sendCodeBut{
        margin-left: -70px !important;
    }

</style>