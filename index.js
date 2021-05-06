console.log('index.js');



// File对象 实例
const fs = require('fs');
//获取div对象
const dragWrapper = document.getElementById("drag_test");
//添加拖拽事件监听器
dragWrapper.addEventListener("drop", (e) => {
    //阻止默认行为
    e.preventDefault();
    //获取文件列表
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
        //获取文件路径
        const path = files[0].path;
        console.log('path:', path);
        //读取文件内容
        const content = fs.readFileSync(path);
        console.log(content.toString());
    }
})

//阻止拖拽结束事件默认行为
dragWrapper.addEventListener("dragover", (e) => {
    e.preventDefault();
});