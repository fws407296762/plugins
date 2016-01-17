/**
 * Created by fuwensong on 2016/1/16.
 */

var fs = require("fs");
var path = require('path');

var fileName = "顾莉雅 - 这片海.mp3";

var sourceFile = path.join(__dirname,'old',fileName),
    destFile = path.join(__dirname,'new',fileName);

var readStream = fs.createReadStream(sourceFile),
    writeStream = fs.createWriteStream(destFile);

readStream.pipe(writeStream);
console.log('移动完成');

