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
    components: [{
        "name": "通栏",
        "type": "tab-editer",
        "tpl": "<%if(items[0].type===0){%>\n<%for(var i=0;i<items[0].num;i++){%>\n<a href=\"javascript:;\"><img src=\"<%=items[0].imgUrl%>\"/></a>\n<%}%>\n<%}%>\n\n<%if(items[0].type===1){%>\n<a href=\"javascript:;\"><img src=\"<%=items[0].imgUrl%>\"/></a>\n<%}%>\n\n<%if(items[0].type===2){%>\n<a href=\"javascript:;\"><img src=\"<%=items[0].imgUrl%>\"/></a>\n<%}%>\n",
        "items": [{"pids": "1,2,3,4", "type": 0, "num": 2, "imgUrl": "http://static.adbaitai.com/Website/Img/logo.png"}]
    }, {
        "name": "图片组件",
        "type": "pic-editer",
        "items": [{"picUrl": "//static.adbaitai.com/Website/Img/logo.png"}],
        "tpl": "<img src=\"<%=items[0].picUrl%>\"/>"
    }]
};

Gdata.add = function(data){
    this.components.push(data);
    window.sendMessage('updateIframe');
};
