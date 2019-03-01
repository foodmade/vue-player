<!--全局常量-->
<script type="text/javascript">
const _CONST_PARAM = {
    _WINDOWS_WIDTH:0,  //用户屏幕宽
    _WINDOWS_HEIGHT:0,  //用户屏幕高
    _HOST:'http://127.0.0.1:8082',  //本地
    // _HOST:'http://144.34.222.54:8089',     //线上
    _SUCCESS_CODE:'200',
    _ONLINE_STATUS:'1',
    _OFFLINE_STATUS:'0',
    _USER_KEY:'userInfo'
};

function getUserWindowsInfo(){
    _CONST_PARAM._WINDOWS_WIDTH = document.body.clientWidth;
    _CONST_PARAM._WINDOWS_HEIGHT = document.body.clientHeight;
}

function refreshLoginStatus(responseBody) {
    if(responseBody === undefined || responseBody === ''){
        this.setLoginStatus(undefined,_CONST_PARAM._OFFLINE_STATUS);
    }else{
        this.setLoginStatus(responseBody,_CONST_PARAM._ONLINE_STATUS);
    }
}

function setLoginStatus(userInfo,status){
    sessionStorage.setItem(_CONST_PARAM._USER_KEY,JSON.stringify(userInfo));
    sessionStorage.setItem('isLogin',status);
}

function getUserInfo() {
    try {
        let userData = sessionStorage.getItem(_CONST_PARAM._USER_KEY);
        if (userData) {
            return JSON.parse(userData);
        }
    } catch (e) {
        console.log('session域取值失败')
    }
}

function getUserLoginStatus() {
    return sessionStorage.getItem('isLogin');
}

function clearSession() {
    sessionStorage.clear();
}

function reloadWindow() {
    location.reload();
}

getUserWindowsInfo();

export default{
    _CONST_PARAM,
    refreshLoginStatus,
    setLoginStatus,
    getUserInfo,
    clearSession,
    getUserLoginStatus,
    reloadWindow
}
</script>