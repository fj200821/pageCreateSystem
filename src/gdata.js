window.Gdata = {
    "globalConfig": {"title": "test", "bgColor": "#58baf9", "bgImg": ""},
    "components": [{
        "base": {"marginTop": 41},
        "name": "两栏",
        "placeholder": "两栏",
        "type": "three-tab-editer",
        "tpl": "<style>\n    .three-tab-editer{\n        margin-left: 18px;\n    }\n\n    .three-tab-editer a{\n        display:inline-block;width:231px;height:221px;float:left;margin-left: 9px;\n    }\n\n    .three-tab-editer a:first-child{\n        margin-left: 0;\n    }\n\n    .three-tab-editer a img{\n        width: 100%;\n        height: 100%;\n    }\n</style>\n<div class=\"three-tab-editer clearfix\">\n    <a class=\"block\" href=\"javascript:;\">\n        <img src=\"<%=items[0].picUrl%>\"/>\n    </a>\n    <a class=\"block\" href=\"javascript:;\">\n        <img src=\"<%=items[1].picUrl%>\"/>\n    </a>\n    <a class=\"block\" href=\"javascript:;\">\n        <img src=\"<%=items[2].picUrl%>\"/>\n    </a>\n</div>",
        "items": [{
            "type": 0,
            "data": "",
            "picUrl": "//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png"
        }, {
            "type": 0,
            "data": "",
            "picUrl": "//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png"
        }, {"type": 0, "data": "", "picUrl": "//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png"}]
    }, {
        "base": {"marginTop": 35},
        "name": "通栏",
        "type": "tab-editer",
        "tpl": "<div class=\"tab-editer\">\n    <%if(items[0].type===0){%>\n    <%for(var i=0;i\n    <items\n    [0].num;i++){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n    <%}%>\n\n    <%if(items[0].type===1){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n\n    <%if(items[0].type===2){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n</div>\n",
        "items": [{
            "type": 0,
            "num": 1,
            "planIds": [],
            "picUrl": "//oss.ltcdn.cc/cow/2017/12/06/710w_410h_A07AF1512552490_origin.png"
        }]
    }, {
        "base": {"marginTop": 26},
        "name": "图片组件",
        "type": "pic-editer",
        "items": [{"picUrl": "//oss.ltcdn.cc/cow/2017/12/06/255w_62h_A73231512552162_origin.png"}],
        "tpl": "<div style=\"text-align: center;\"><img src=\"<%=items[0].picUrl%>\"/></div>"
    }, {
        "base": {"marginTop": 26},
        "name": "通栏",
        "type": "tab-editer",
        "tpl": "<div class=\"tab-editer\">\n    <%if(items[0].type===0){%>\n    <%for(var i=0;i\n    <items\n    [0].num;i++){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n    <%}%>\n\n    <%if(items[0].type===1){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n\n    <%if(items[0].type===2){%>\n    <div style=\"text-align: center;\">\n        <a href=\"javascript:;\"><img src=\"<%=items[0].picUrl%>\"/></a>\n    </div>\n    <%}%>\n</div>\n",
        "items": [{
            "type": 0,
            "num": 1,
            "planIds": [],
            "picUrl": "//oss.ltcdn.cc/cow/2017/12/06/710w_410h_A07AF1512552490_origin.png"
        }]
    }, {
        "base": {"marginTop": 37},
        "name": "两栏",
        "placeholder": "两栏",
        "type": "two-tab-editer",
        "tpl": "<style>\n    .two-tab-editer{\n        margin-left: 18px;\n    }\n\n    .two-tab-editer a{\n        display:inline-block;width:347px;height:340px;float:left;margin-left: 17px;\n    }\n    .two-tab-editer a:first-child{\n        margin-left: 0;\n    }\n    .two-tab-editer a img{\n        width: 100%;\n        height: 100%;\n    }\n</style>\n<div class=\"two-tab-editer clearfix\">\n    <a class=\"block\" href=\"javascript:;\">\n        <img src=\"<%=items[0].picUrl%>\"/>\n    </a>\n    <a class=\"block\" href=\"javascript:;\">\n        <img src=\"<%=items[1].picUrl%>\"/>\n    </a>\n</div>",
        "items": [{
            "type": 0,
            "data": "",
            "picUrl": "//oss.ltcdn.cc/cow/2017/12/06/347w_340h_BCF791512552241_origin.png"
        }, {"type": 0, "data": "", "picUrl": "//oss.ltcdn.cc/cow/2017/12/06/347w_340h_BCF791512552241_origin.png"}]
    }]
};

Gdata.components = [];
Gdata.sourceArr = [
    {
        editer: 'news-editer',
        type: 'js',
        link: '//oss.ltcdn.cc/game/Theme/Real/Js/encryption.js',
        num: 1
    },
    {
        editer: 'tab-editer',
        type: 'js',
        text: 'alert(123);',
        num: 1
    }
]
Gdata.add = function (data) {
    this.components.push(data);
    window.sendMessage('updateIframe');
};

