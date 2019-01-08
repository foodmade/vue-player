<template>
    <div style="text-align: center">
        <el-form :model="registerData" :rules="rules" ref="registerData" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="emailMobile">
                <el-input class="CInput"
                          placeholder="邮箱"
                          prefix-icon="custom-user-youjian"
                          v-model="registerData.emailMobile">
                </el-input>
            </el-form-item>
            <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },{ min: 4, max: 4, message: '请输入4个字符', trigger: 'change' }]">
                <el-input style="width: 45%;float: left"
                          placeholder="验证码"
                          prefix-icon="custom-user-yanzhengma"
                          v-model="registerData.code">
                </el-input>
                <el-button type="success">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="usernick" :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' },
                                                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }]">
                <el-input class="CInput"
                          placeholder="昵称"
                          prefix-icon="custom-user-nicheng"
                          v-model="registerData.usernick">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{ min: 6, max: 12, message: '请输入 6 到 12个字符', trigger: 'change' }]">
                <el-input class="CInput"
                          placeholder="密码 6~12位"
                          prefix-icon="custom-user-mima"
                          v-model="registerData.password">
                </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input class="CInput"
                          placeholder="确认密码"
                          prefix-icon="custom-user-mima1"
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
                    callback();
                }
            };
            return {
                registerData: {
                    emailMobile: '',
                    usernick: '',
                    password: '',
                    confirmPassword:'',
                    code: ''
                },
                rules:{
                    confirmPassword:[
                        { validator: validateConfirmPassword, trigger: 'blur' }
                    ],
                    emailMobile:[
                        { validator: validEmail, trigger: 'blur'  },
                    ]
                },
            };
        },
        methods:{
    /*        checkIsExist(){
                if(this.registerData.emailMobile === ''){
                    this.$errMsg('邮箱不能为空');
                }
            },*/
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
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
            }
        }
    }
</script>

<style scoped>

</style>