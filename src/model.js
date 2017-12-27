import util from './compoents/util/util';

export function update(callback) {
    let data = {};
    data.name = Gdata.globalConfig.title;
    if(Gdata.id) {
        data.id=Gdata.id;
    }
    data.modifyData = JSON.parse(JSON.stringify(Gdata));
    console.log('data:', data);
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
    if(Gdata.id) {
        data.id=Gdata.id;
    }
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


export function getPageData(pageId,callback) {
    util.request({
        url:'/api/op/collection/page/get',
        data:{
            pageId:pageId
        },
        success:function(res){
            if(res.success) {
                callback(res.data);
            }
        }
    });
}