let fs = require('fs');//无需安装，直接使用
var path=require('path');  /*nodejs自带的模块*/  




// console.log(process.argv)  获取控制台的输入的变量

function readFilesName (url,suffix) {
    let files = fs.readdirSync(url);//读取该文件夹
    let fileObj = {};
    files.forEach(function(fileUrl){
        let ext = path.extname(fileUrl);
        if( ext === `.${suffix}`) {
            let filename =  path.basename(fileUrl,`.${suffix}`);
            if(suffix === 'js'){
                fileObj[filename] ='./js/'+fileUrl;
            } else {
                fileObj[filename] = path.join(fileUrl);
            }   
        }
    })
    console.log(fileObj);
    return fileObj;
}
// readFilesName ('./src/js','js') 
exports.readFilesName = readFilesName;