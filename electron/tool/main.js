"use strict";

const app = require("app");  //控制整个应用的模块
const BrowserWindow = require("browser-window");  //创建浏览器窗口模块
let mainWindow = null;

app.on('window-all-closed',function(){   //当窗口关闭的时候
    if(process.platform !== 'darwin'){ //如果不是 darwin 操作系统
        app.quit();  //应用退出
    }
});

app.on('ready',function(){
    mainWindow = new BrowserWindow({  //创建浏览器窗口
        width:1000,  //宽度
        height:800,  //高度
        title:"前端工具箱", //应用标题
        darkTheme:true,
        autoHideMenuBar:true //隐藏菜单栏
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html'); //加载本地文件
    mainWindow.webContents.openDevTools({detach:true});  //打开调试工具
    
    mainWindow.on('closed',function(){  //当窗口关闭的时候
        mainWindow = null;  //销毁浏览器窗口对象
    })
});
