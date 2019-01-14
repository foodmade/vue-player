
export function isPc(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

export function errMsg(msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: 'error'
    });
}

export function successMsg(msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: 'success'
    });
}

