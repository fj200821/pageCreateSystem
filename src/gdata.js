window.Gdata = {
    info:{
        title:{
            name:"页面标题",
            placeholder:"请输入页面标题",
            value:"",
        },
        bgColor:{
            name:"页面背景色",
            placeholder:"请输入页面背景色",
            value:''
        },
        bgImg:{
            name:"背景图片",
            placeholder:"请选择图片",
            value:""
        }
    },
    data:[]
};

Gdata.add = function(data){
    this.data.push(data);
    window.sendMessage('updateIframe');
};
