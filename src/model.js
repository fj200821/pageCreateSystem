import util from './compoents/util/util';


window.getQueryString = function(name){
    var queryJson = {};
    var search = window.location.search;
    search = search.replace(/^\?/,'');
    var fields = search.split('&');
    fields && fields.forEach(function(field){
        var arr = field.split('=');
        queryJson[arr[0]] = arr[1];
    });

    return queryJson[name];
};
export function update(callback) {
    let data = {};
    data.name = Gdata.globalConfig.title;
    data.id=3;
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
            pageId:getQueryString('pageId')
        },
        success:function(res){
            callback(res.data);
        }
    });
}