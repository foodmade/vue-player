let request = require('request');
import file from './fileUtil';

let _DEFAULT_DOWNLOAD_DIR = 'c:/m3u8_download/';
/**
 * 下载视频类
 * 1：接收传入的index.m3u8地址,解析真实下载源
 * 2：将解析出来的N个下载地址加入任务池,开启多线程下载
 * 3：合并所有的ts文件
 */
export default class download{

    constructor(){
        this.url = '';     //原始视频地址
        this.headUrl = ''; //头域名地址
        this.footUrl = ''; // 尾地址
    }

    /**
     * 设置视频源地址
     */
    static loadAddress(url){
        this.url = url;
        //解析尾地址
        this.parseFootUrl();
        //解析头地址
        this.parseHeadUrl();
        return this;
    }

    /**
     * 解析尾地址
     */
    static parseFootUrl(){
        let index = this.url.lastIndexOf("\/");
        this.footUrl = this.url.substring(index + 1, this.url.length);
    }

    /**
     * 解析头地址
     */
    static parseHeadUrl(){
        this.headUrl = this.url.replace(this.footUrl,'');
        alert(this.headUrl);
    }

    static parserAddress(){
        request.post(this.url,(err, res, body) => {
            file.writeSync('1.ts',body);
        })
    }

    /**
     * 识别M3U8文件类型
     * 1 顶级视频地址
     * 2 二级视频地址
     */
    static discernAddressType(){

    }


}
