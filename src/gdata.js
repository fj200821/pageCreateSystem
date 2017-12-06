window.Gdata = {
    info:{
        title:"test",
        bgColor:"#58baf9",
        bgImg:""
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
    },{
        name: '两栏',
        type: "two-tab-editer",
        tpl:'<style> .block{ display:inline-block;width:50%;overflow:hidden;float:left;text-align: center; } </style> <div> <a class="block" href="javascript:;"> <img style="width: 90%" src="<%=items[0].imgUrl%>"/> </a> <a class="block" href="javascript:;"> <img style="width: 90%" src="<%=items[1].imgUrl%>"/> </a> </div>',
        items: [
            {
                type:"3",
                data:'3',
                noCharging:false,
                imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
            },
            {
                type:"1",
                data:'2',
                noCharging:true,
                imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
            }
        ]
    }]
};

Gdata.add = function(data){
    this.components.push(data);
    window.sendMessage('updateIframe');
};
