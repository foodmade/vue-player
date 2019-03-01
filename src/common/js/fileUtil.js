import fs from 'fs';

import FileSaver from 'file-saver'

/**
 * I/O操作工具类
 */
export default class fileUtil{

    constructor(){

    }

    //1. fs.stat  检测是文件还是目录  fs.statSync()同步获取stats对象,通过返回值接收。
    static discernFileType(filePath){
        return fs.statSync(filePath);
    }


    //2. fs.mkdir  创建目录
    static mkdir(filePath){
        fs.mkdirSync(filePath);
    }


    //3. fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    static writeSync(filePath,body){
        const blob = new Blob([body], {type: ''});
        FileSaver.saveAs(blob, filePath);
        console.log('write fileUtil success');
    }


    //4. fs.appendFile 追加文件
    static appendFileSync(filePath,body){
        fs.appendFileSync(filePath,body)
    }


    //5.fs.readFile 读取文件
    static readFileSync(filePath){
        return fs.readFile(filePath,'utf8')
    }


}