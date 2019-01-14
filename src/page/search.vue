<template>
    <div>
        <!--top-->
        <div class="topDivCss">
            <img class="homeImg" src="../common/img/bj.jpg"  alt=""/>
            <div class="primaryTitle">
                <b>
                    <span style="color: rgb(74, 179, 68);">Video </span>
                    <span style="color: rgb(255, 255, 255);">Sources</span>
                </b>
            </div>
            <div class="top-menu">

            </div>
            <div class="homePan">
                <div class="homeTitle">
                    <span style="color: rgb(74, 179, 68);">Search </span>
                    <span style="color: rgb(255, 255, 255);">Movies</span>
                </div>
                <div class="homeDesc">
                    <span>{{desc}}</span>
                    <br/>
                </div>
                <div class="contactMode">
                    <span>{{contact}}</span>
                </div>
                <div class="movieInput">
                    <el-input  id="searchInput" clearable @keyup.enter.native="EnterPress" placeholder=" 请输电影昵称~ 回车开始搜索" v-model="searchName" class="input-with-select">
                        <el-select @change="getMovies(2)" v-model="searchType" slot="prepend" placeholder="搜索类型">
                            <el-option  v-for="(item,index) in typeData" :key="index" v-bind:label="item.cate_name"  v-bind:value="item.cate_id"></el-option>
                        </el-select>
                    </el-input>
                </div>
            </div>

        </div>
        <!--中间-->
        <div class="middle">
            <div id="searchResult">
                <span style="font-size: 28px;">搜索结果 </span>
                <span id="searchListSize">{{itemSize}}条资源</span>
            </div>
        <div >
            <div id="searchItem">
                <div class="itemParent" v-for="(item,index) in items" :key="index">
                    <img class="div-inline" style="width:80px;height:95px;" :src="item.coverImg" />
                    <div class="div-inline movieSpan">
                        <span class="space" style="font-size: 20px;color: #12b7f5;">
                            <font face="宋体">{{item.videoName}}</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 12px;color: #de2323;">
                            <font face="微软雅黑">  评分：9.2</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 10px;color: #6b6b6b;">
                            <font face="微软雅黑">主演：{{item.figures.actor.toString()}}</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 10px;color: #6b6b6b;">
                            <font face="微软雅黑">导演：{{item.figures.director.toString()}}</font>
                        </span>
                        <br/>
                    </div>
                    <el-button @click.native="playerMovie(item)" type="success" style="outline:none;float: right"  size="small" round>播放</el-button>
                </div>
                <br/><br/>
                <div style="outline:none;float: right">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="ContactInformation">
                <span><font face="微软雅黑" style="font-size: 20px;color: #6b6b6b">联系我们：</font></span>
                <br/>
                <span id="information">
                    <font face="微软雅黑" style="font-size: 18px;color: #8c8c8c">
                        Q Q ：2210465185
                        <br/><br/>
                        电话 ：18224449005
                        <br/><br/>
                        邮箱  ：2210465185@qq.com
                    </font>
                </span>
            </div>
           <!-- <div class="movieFrom">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="电影名称：" prop="movieName">
                        <el-input hide-required-asterisk v-model="ruleForm2.movieName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：" prop="mobile">
                        <el-input placeholder="QQ/电话号码" v-model="ruleForm2.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" prop="authCode">
                        <el-input style="width: 120px" v-model="ruleForm2.authCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>-->
            <div >
                <el-dialog id="playerDialog"
                        :visible.sync="dialogVisible"
                        width="50%"
                        :before-close="handleClose"
                        :title="movieData.videoName"
                        v-if='dialogVisible'>
                    <div>
                        <my_player @showCityName="updateStatus(true)" :sendData="movieData"></my_player>
                    </div>
                </el-dialog>
            </div>
            <div style="text-align:center">
                <el-dialog id="loginDialog"
                        title="登录"
                        :visible.sync="LoginVisible"
                        width="30%"
                        :before-close="handleLoginDialogClose">
                    <div>
                        <loginEml :registerSwitch.sync="registerVisible" :loginSwitch.sync="LoginVisible"></loginEml>
                    </div>
                </el-dialog>
            </div>
            <div style="text-align:center">
                <el-dialog id="registerDialog"
                           title="注册"
                           :visible.sync="registerVisible"
                           width="30%"
                           :before-close="handleRegisterDialogClose">
                    <div>
                        <registerEml></registerEml>
                    </div>
                </el-dialog>
            </div>
            <el-button size="small" type="success" @click.native="loginShowSwitch(true)">弹出login框</el-button>
            <el-button size="small" type="success" @click.native="registerShowSwitch(true)">弹出register框</el-button>
            <el-button size="small" type="success" @click.native="logout">退出登录</el-button>
        </div>
</div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.css";
    import "bootstrap-vue/dist/bootstrap-vue.css";
    import my_player  from "../components/PlayerElement";
    import _global from "../components/Global";
    import loginEml from "../components/LoginElement";
    import registerEml from "../components/RegisterElement";


    export default {
        data(){
            var validateAuthCode = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('验证码不能为空'));
                }else{
                    callback();
                }
            };
            var validateMovieName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电影名称'));
                } else {
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入联系方式'));
                }  else {
                    callback();
                }
            };
            return {
                desc:"输入资源名称,小艾便会自动搜索全网资源,本网站永久免费",
                contact:"交流群：123456789",
                itemSize:0,
                items:[],
                typeData:[],
                searchName:'',
                ruleForm2: {
                    movieName: '',
                    mobile: '',
                    age: '',
                    authCode:''
                },
                searchType:'',
                rules2: {
                    movieName: [
                        { validator: validateMovieName, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    authCode: [
                        { validator: validateAuthCode, trigger: 'blur' }
                    ]
                },
                total:0,
                page:1,
                pageSize:4,
                dialogVisible: false,
                LoginVisible:false,
                registerVisible:false,
                movieData:{
                    videoName:"", //视频名称
                    videoUrl:"",  //视频地址
                    videoPoster:"", //封面图
                    visible:true
                },
                loading:null
            }
        },
        methods:{
            fetchMovies:function(){
                if(this.searchName === '' || this.searchName === undefined){
                    this.errMsg('请输入电影名称');
                    return;
                }
                if(this.page === undefined){
                    this.page = 1;
                }
                if(this.pageSize === undefined){
                    this.pageSize =4;
                }
                this.loadingElmt('查询影片资源...');
                var url = _global._CONST_PARAM._HOST +
                    '/getMoviesByName.do?videoName='+
                    this.searchName+'&page='+
                    this.page+'&page_size='+
                    this.pageSize;
                this.$fetch(url)
                    .then((response) => {
                        this.loadMovieData(response);
                        this.loading.close();
                    }).catch((rsp)=>{
                        this.errMsg('从服务器获取资源失败 错误信息:'+JSON.stringify(rsp));
                        this.loading.close();
                });
            },
            getMovies(type){
                this.clearShowData();
                if(type === 1){
                    this.searchType='';
                    this.fetchMovies();
                }else if(type === 2){
                    this.searchName='';
                    this.fetchCateMovies();
                }
            },
            fetchCateMovies(){
                if(this.searchType === ''){
                    this.errMsg('请选择分类....')
                    return;
                }
                this.loadingElmt('查询影片资源...');
                var url = _global._CONST_PARAM._HOST + '/getMovies.do?videoId='+this.searchType+'&page='+this.page+'&page_size='+this.pageSize;
                this.$fetch(url)
                    .then((rsp)=>{
                        this.loadMovieData(rsp);
                        this.loading.close();
                    }).catch((rsp=>{
                    this.errMsg('从服务器获取资源失败 错误信息:'+JSON.stringify(rsp));
                    this.loading.close();
                }))
            },
            loadMovieData(response){
                this.items = response.responseBody;
                this.itemSize = response.total;
                this.total = response.total;
                this.page = response.page;
            },
            clearShowData(){
                this.items = [];
                this.itemSize = 0;
                this.total = 0;
                this.page = 1;
            },
            fetchCateInfo(){
                this.loadingElmt('加载影片分类信息...');
                var url = _global._CONST_PARAM._HOST + '/getMovieTypeInfo.do';
                this.$fetch(url)
                    .then((rsp)=>{
                    this.typeData = rsp.responseBody;
                    this.loading.close();
                }).catch((rsp=>{
                    this.errMsg('从服务器端获取视频分类列表失败 错误信息:' + rsp.response);
                    this.loading.close();
                }));

            },
            /**回车监听事件*/
            EnterPress:function (){
                 if(event.keyCode === 13){
                     this.getMovies(1);
                 }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleCurrentChange() {
                if(this.searchType === '' && this.searchName === ''){
                    this.errMsg('搜索条件缺失,请重试');
                    return;
                }
                if(this.searchType !== ''){
                    this.fetchCateMovies();
                }else if(this.searchName !== ''){
                    this.fetchMovies();
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            errMsg(msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            },
            handleClose(done) {
                this.movieData.visible = false;
                this.clearMovieData();
                done();
              /*  this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});*/
            },
            handleLoginDialogClose(done){
                done();
            },
            handleRegisterDialogClose(done){
                done();
            },
            playerMovie(item){
                if(item === undefined || item.videoSourceList.length === 0){
                    this.errMsg('哎呀~ 视频地址不见啦,换一个看看吧');
                    return;
                }
                this.movieData.videoName=item.videoName;
                this.movieData.videoUrl=item.videoSourceList[0].videoPath;
                // this.movieData.videoUrl='https://boba.52kuyun.com/share/UOwkN5yZgB2xWpfa';
                this.movieData.videoPoster=item.coverImg;
                this.dialogVisible = true
            },
            updateStatus(status){//触发子组件的事件
                this.movieData.visible = status;//改变了父组件的值
            },
            clearMovieData(){
                this.movieData=this.initMoveData();
            },
            initMoveData(){
                return {
                    videoName:"", //视频名称
                    videoUrl:"",  //视频地址
                    videoPoster:"", //封面图
                    visible:true
                }
            },
            loadingElmt(text){
                this.loading = this.$loading({
                    lock: true,
                    text: text,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            loginShowSwitch(){
                this.LoginVisible = true;
            },
            registerShowSwitch(){
                this.registerVisible = true;
            },
            logout(){
                let url = _global._CONST_PARAM._HOST + '/logout.do';
                this.$post(url)
                    .then((rsp) => {
                        if(rsp.code === _global._CONST_PARAM._SUCCESS_CODE){
                            this.GLOBAL.clearSession();
                            this.$successMsg('注销成功');
                        }else{
                            this.$errMsg('注销登录失败 失败原因:'+rsp.message);
                        }
                    }).catch((rsp) => {
                        this.$errMsg('注销登录失败,请重试');
                });
            },
            checkLoginStatus(){
                let url = _global._CONST_PARAM._HOST + '/isLogin.do';
                this.$post(url)
                    .then((rsp) => {
                        if(rsp.code === _global._CONST_PARAM._SUCCESS_CODE){
                            this.GLOBAL.refreshLoginStatus(rsp.responseBody);
                        }else{
                            this.GLOBAL.refreshLoginStatus(undefined)
                        }
                    })
                    .catch((rsp) => {
                        this.$errMsg('检查登录状态失败');
                })
            }
        },
        components: {
            my_player: my_player,
            loginEml:loginEml,
            registerEml:registerEml
        },
        mounted() {
            //初始化影片分类信息
            this.fetchCateInfo();
            //从服务器端检查登录状态
            this.checkLoginStatus();
        }
    }

</script>

<style>
    *{
        margin:0;
        padding:0;
    }

    button{
        outline:none;
    }

    .div-inline {
        display:inline
    }
    .homeImg {
        position: absolute;
        height: 700px;
        width: 100%;
    }
    .space {
        margin-bottom: 2cm
    }
    .movieSpan {
/*        background-color: #0fb053;*/
        position: absolute;
        margin:-6px 5px 5px 10px;
        height: 18%;
        width: 90%;
        pointer-events: none;
    }
    .topDivCss {
        height: 700px;
        /*width: 100%;*/
        width: 100%;
    }
    .primaryTitle {
        position:absolute;
        font-size: 32px;
        left: 20%;
        top :41px;
    }
    .top-menu {
        position: absolute;
        font-size: 20px;
        left: 62%;
        top: 52px
    }

    .homePan {
        position: absolute;
        left: 52%;
        top: 35%;
        transform: translate(-50%,-35%);
        width: 60%;
        height: 500px;
    }
    .homeTitle {
        position: relative;
        font-size: 80px;
        width: 100%;
        left: 25%;
        top: 10%
    }
    .homeDesc {
        position: relative;
        font-size: 14px;
        color:rgba(240, 248, 255, 0.678);
        left: 31%;
        top: 10%;
        width: 600px;
    }
    .contactMode {
        position: relative;
        font-size: 22px;
        left: 38%;
        top: 14%;
        color:rgba(240, 248, 255, 0.911);
        width: 300px;
    }
    .movieInput {
        position: relative;
        left: 23%;
        top: 38%;
        color:#666;
    }
    .movieInput input {
        border-radius: 30px;
        height: 55px;
        width: 450px;
        border-style:hidden;   
        color: #666;
        font-size: 13px;
        border:0;outline:none;  /*隐藏点击后出现的边框 */
        padding-left:15px;      /**光标开始位置**/
        padding-right:20px; 
    }

    .middle {
        /* background-color: aqua; */
        width: 68%;
        height:800px;
        margin:10px auto;  /**设置边距  并且居中**/
        /* display:none;  隐藏div */
    }

    .middle #searchResult {
        position: relative;
        left:3%;
        top:4%;
        height: 10%;
        width: 100%;
    }

    .middle #searchListSize {
        font-size: 14px; 
        color:rgba(105, 106, 107, 0.678);
        left: 440px;
    }

    .middle #searchItem {
        position: absolute;
        left:26%;
        top:800px;
        /* background-color: rgb(255, 127, 133); */
        width: 900px;
        height: auto;
    }
    .bottom {
        width: 100%;
        height: 330px;
        border:2px solid #000;
        position:relative;
        background-color: #12b7f5;
        background-image: url('../common/img/bottom.jpg');
    }

    .ContactInformation {
        position: absolute;
        float: left;
        width: 500px;
        height: 300px;
        margin: auto;
        top: 0; left: 0; bottom: 0; right: 50%;
    }

    .ContactInformation #information {
        position: absolute;
        width: 400px;
        height:200px;
        left: 7%;
        top: 25%
    }

    /**重写elementUi css样式*/
    #playerDialog .el-dialog__header {
        background-color: black;
        text-align:center;
        padding: 10px 0 0 !important;
    }
    #playerDialog .el-dialog__body {
        padding: 5px 5px !important;
        color: #020b00;
        font-size: 14px;
        background-color: black;
    }

    #loginDialog .el-dialog {
        width: 400px !important;
    }

    #registerDialog .el-dialog{
        width: 400px !important;
    }

    .el-form-item__content {
        margin-left: 15px !important;
    }

    .el-input-group__append button.el-button,
    .el-input-group__append div.el-select
    .el-input__inner,
    .el-input-group__append
    div.el-select:hover
    .el-input__inner,
    .el-input-group__prepend
    button.el-button,
    .el-input-group__prepend
    div.el-select .el-input__inner, .el-input-group__prepend
    div.el-select:hover .el-input__inner{
        width: 100px !important;
    }

    .itemParent{
        height: 100px;
        border-bottom: 1px solid #696A6B;
        padding-top: 1px;
        margin-bottom: 20px;
    }
</style>

