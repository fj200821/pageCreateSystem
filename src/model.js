import util from './compoents/util/util';


export function update(callback) {
    let data = {};
    data.name = Gdata.globalConfig.title;
    data.id=3;
    data.modifyData = JSON.parse(JSON.stringify(Gdata));

    util.request({
        url:'/api/op/collection/page/update',
        method:'POST',
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:JSON.stringify(data),
        success:function(res){
            callback(res.data);
        }
    });
}


export function publish(html,callback) {
    let data = {};
    data.name = Gdata.globalConfig.title;
    data.id=3;
    data.modifyData = JSON.parse(JSON.stringify(Gdata));
    data.components = data.modifyData.components;
    data.globalConfig = data.modifyData.globalConfig;
    data.html = encodeURIComponent(html);

    util.request({
        url:'/api/op/collection/page/publish',
        method:'POST',
        data:JSON.stringify({
            data:data,
            html:encodeURIComponent(html)
        }),
        success:function(res){
            callback(res.data);
        }
    });
}


export function getPageData(callback) {
    util.request({
        url:'/api/op/collection/page/get',
        data:{
            pageId:3
        },
        success:function(res){
            callback(res.data);
        }
    });
}