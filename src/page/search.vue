<template>
    <div id="banner">
        <!--top-->
        <div class="topDivCss">
            <div>
                <jmenu :favoriteActive.sync='boxControl.boxActive'></jmenu>
            </div>
            <delimitBox :active.sync="boxControl.boxActive"
                        :title.sync="boxControl.title"
                        :LoginVisible.sync="LoginVisible"
                        :loginStatus.sync="loginStatus"></delimitBox>
            <img class="homeImg" src="../common/img/bj-15.jpg"  alt=""/>
            <div class="primaryTitle">
                <b>
                    <span style="color: #ffd04b;"></span>
                </b>
            </div>
            <div class="top-menu">
                <ul>
                    <span v-if="loginStatus" class="accountArea">
                        <el-dropdown @command="handleMenuClick">
                          <span class="el-dropdown-link" style="cursor: pointer">
                            {{userInfo.userNick}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">设置</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <span v-else class="accountArea1">
                        <el-button id="userLogin" @click.native="loginShowSwitch(true)" size="small" icon="custom-user-touxiang">登陆/注册</el-button>
                    </span>
                </ul>
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
                    <img class="div-inline" style="width:92px;height:103px;top: -9%;position: relative" :src="item.coverImg" :onerror="defaultImg"/>
                    <div class="div-inline movieSpan">
                        <span class="space" style="font-size: 20px;color: #12b7f5;">
                            <font face="宋体">{{surpassMaxLengthHandler(item.videoName)}}</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 12px;color: #de2323;">
                            <font face="微软雅黑">  评分：9.2</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 10px;color: #6b6b6b;">
                            <font face="微软雅黑">主演：{{surpassMaxLengthHandler(item.figures.actor.toString())}}</font>
                        </span>
                        <br/>
                        <span class="space" style="font-size: 10px;color: #6b6b6b;">
                            <font face="微软雅黑">导演：{{surpassMaxLengthHandler(item.figures.director.toString())}}</font>
                        </span>
                        <br/>
                        <div class="detailMovie">
                            <span class="favorite1" v-on:click="dotFvr(item)" v-if="loginStatus">
                                <svg  class="icon IconSize" aria-hidden="true" >
　　                                  <use :xlink:href="'#' + 'custom-user-xihuan-dian'"></use>
                                </svg>
                            </span>
                            <span class="favorite" v-else v-on:click="collection(item)">
                                <i class="custom-user-xihuan7 icon IconSize"></i>
                            </span>


                            <el-tooltip content="点个赞~" placement="top">
                                <el-button icon="custom-user-dianzan1" class="dot button_border tagI" v-on:click="dotMovie(item)">
                                    <i style="font-size: 1.2em;">&nbsp{{(item.dotcnt === undefined)?0:item.dotcnt}}</i>
                                </el-button>
                            </el-tooltip>
                        </div>
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
        <!--<div class="bottom">-->
            <!--<div class="ContactInformation">
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
            </div>-->
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

        <!--</div>-->
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
                    <loginEml :registerSwitch.sync="registerVisible" :loginSwitch.sync="LoginVisible" :pwdBackSwitch.sync="pwdBackVisible"></loginEml>
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

        <div style="text-align:center">
            <el-dialog id="backPwdDialog"
                       title="找回密码"
                       :visible.sync="pwdBackVisible"
                       width="50%"
                       :before-close="hanlePwdBackDialogClose">
                <div>
                    <pwdBackEml></pwdBackEml>
                </div>
            </el-dialog>
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
    import pwdBackEml from "../components/PasswordBackElement";
    import jmenu from "../components/JMenu";
    import delimitBox from "../components/drop-box";


    export default {
        data(){
            let validateAuthCode = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('验证码不能为空'));
                }else{
                    callback();
                }
            };
            let validateMovieName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电影名称'));
                } else {
                    callback();
                }
            };
            let validateMobile = (rule, value, callback) => {
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
                pageSize:15,
                dialogVisible: false,
                LoginVisible:false,
                registerVisible:false,
                pwdBackVisible:false,
                movieData:{
                    videoName:"", //视频名称
                    videoUrl:"",  //视频地址
                    videoPoster:"", //封面图
                    visible:true
                },
                loading:null,
                loginStatus:false,
                userInfo:{

                },
                defaultImg: 'this.src="' + require('../assets/default.jpg') + '"',
                boxControl:{
                    boxActive:false,
                    title:'我的收藏'
                }
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
                let url = _global._CONST_PARAM._HOST +
                    '/getMoviesByName.do?videoName='+
                    this.searchName+'&page='+
                    this.page+'&page_size='+
                    this.pageSize;
                this.$fetch(url)
                    .then((response) => {
                        this.loadMovieData(response);
                        this.loading.close();
                        this.movieLoadFinish();
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
                    this.errMsg('请选择分类....');
                    return;
                }
                this.loadingElmt('查询影片资源...');
                let url = _global._CONST_PARAM._HOST + '/getMovies.do?videoId='+this.searchType+'&page='+this.page+'&page_size='+this.pageSize;
                this.$fetch(url)
                    .then((rsp)=>{
                        this.loadMovieData(rsp);
                        this.loading.close();
                        this.movieLoadFinish();
                    })
                    .catch((rsp=>{
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
                let url = _global._CONST_PARAM._HOST + '/getMovieTypeInfo.do';
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
            hanlePwdBackDialogClose(done){
                done();
            },
            playerMovie(item){
                if(item === undefined || item.videoSourceList.length === 0){
                    this.errMsg('哎呀~ 视频地址不见啦,换一个看看吧');
                    return;
                }
                this.movieData.videoName=item.videoName;
                this.movieData.videoUrl=item.videoSourceList[0].videoPath;
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
                            this.GLOBAL.reloadWindow();
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
                        //刷新用户登录状态
                        this.userLoginStatus();
                        //初始化用户数据
                        this.initUserData();
                    })
                    .catch((rsp) => {
                        this.$errMsg('检查登录状态失败');
                })
            },
            //获取用户登录状态
            userLoginStatus(){
                this.loginStatus = this.GLOBAL._CONST_PARAM._ONLINE_STATUS === this.GLOBAL.getUserLoginStatus();
            },
            initUserData(){
                this.userInfo = this.GLOBAL.getUserInfo();
            },
            handleMenuClick(command){
                if(command === 'logout'){
                    this.logout();
                }
            },
            movieLoadFinish(){
                this.$scrollTo(0,400);
            },
            //处理字符超长问题
            surpassMaxLengthHandler(str){
                let videoName = this.$removeAllSpace(str);
                if(videoName.length > this.GLOBAL._CONST_PARAM._MAX_NAME_LENGTH){
                    videoName = videoName.substring(0,this.GLOBAL._CONST_PARAM._MAX_NAME_LENGTH);
                    videoName += '...';
                }
                console.log(videoName);
                return videoName;
            },
            //点赞
            dotMovie(item){
                let url = _global._CONST_PARAM._HOST + '/movieDotPraise.do';
                this.$post(url,item)
                    .then((rsp) => {
                        if(rsp.code === _global._CONST_PARAM._SUCCESS_CODE){
                            item.dotcnt ++;
                        }else{
                            this.$errMsg('操作失败:'+rsp.message);
                        }
                    })
                    .catch(()=>{
                    this.$errMsg('服务器连接失败,请稍后再试');
                })

            },
            //喜欢
            dotFvr(item){
                //检查是否登录
                if(!this.loginStatus){
                    this.$errMsg('请登录');
                    return;
                }
                this.$successMsg('success');
            }
        },
        components: {
            my_player: my_player,
            loginEml:loginEml,
            registerEml:registerEml,
            pwdBackEml:pwdBackEml,
            jmenu:jmenu,
            delimitBox:delimitBox
        },
        mounted() {
            //从服务器端检查登录状态
            this.checkLoginStatus();
            //初始化影片分类信息
            this.fetchCateInfo();
        }
    }

</script>

<style>
    *{
        margin:0;
        padding:0;
    }

    body {
        font-family:Arial,Helvetica,sans-serif;font-size:100%;
        line-height:1.5em;color:#4e4e4e;
        width: 100%;
    }

    /*解决出现横向滚动条的问*/
    div#banner {
        width: 100%;
        overflow:hidden
    }

    button{
        border-style: none;
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
        /*height: 18%;*/
        width: 75%;
        /*pointer-events: none;*/
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
        position: relative;
        font-size: 20px;
        left: 62%;
        top: -9px
    }

    .homePan {
        position: relative;
        left: 48%;
        top: 40%;
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
        left: 32%;
        top: 33%;
        width: 600px;
    }
    .contactMode {
        position: relative;
        font-size: 22px;
        left: 39%;
        top: 18%;
        color:rgba(240, 248, 255, 0.911);
        width: 300px;
    }
    .movieInput {
        position: relative;
        left: 25%;
        top: 44%;
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
        top:10%;
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
        top:890px;
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

    #userLogin {
        position: relative;
        border: 0 !important;
        background:transparent;
    }

    .accountArea {
        position: relative;
        top : -31px;
        left: 180px;
    }

    .accountArea1 {
        position: relative;
        top : -40px;
        left: 180px;
    }

    .favorite{
         position: relative;
         top: -48%;
         left: 0.5%;
         width: 0px;
         height: 0px;
         cursor: pointer;
         font-size: 1em;
     }

    .favorite1{
        position: relative;
        top: -22%;
        left: 0.5%;
        width: 0px;
        height: 0px;
        cursor: pointer;
        font-size: 1em;
    }

    .dot {
        position: relative;
        top: -6.2%;
        left: 10%;
        width: 0;
        height: 0;
        cursor: pointer;
        font-size: 1em;
    }

    .detailMovie {
        height: 24px;
        position: relative;
        /*background-color: #0fb053;*/
        width: 97px;
        top: 10.2%;
    }

    .tagI i{
        position: relative;
        top: -9px;
        left: -17px;
    }

    .button_border {
        border: 0;
        background: transparent !important;
        outline: none;
    }

    .el-button+.el-button {
        width: 0px;
        height: 0px;
    }

    .IconSize {
        width: 25px;
        height: 25px
    }

/*    .top-menu .el-button--primary {
        background-color : #2f3640!important;
        !*border-color :#3d4248 !important;*!
        border-color :red !important;
        border-style: none;
        outline:none;
    }*/
</style>

