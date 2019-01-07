<!--全局常量-->
<script type="text/javascript">
const _CONST_PARAM = {
    _WINDOWS_WIDTH:0,  //用户屏幕宽
    _WINDOWS_HEIGHT:0,  //用户屏幕高
    // _HOST:'http://192.168.1.4:8082'  //本地
    _HOST:'http://144.34.222.54'     //线上
};

function getUserWindowsInfo(){
    _CONST_PARAM._WINDOWS_WIDTH = document.body.clientWidth;
    _CONST_PARAM._WINDOWS_HEIGHT = document.body.clientHeight;
}

getUserWindowsInfo();

export default{
  _CONST_PARAM
}
</script>