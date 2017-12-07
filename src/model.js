import util from './compoents/util/util';


export function update(callback) {
    let data = JSON.parse(JSON.stringify(Gdata));
    data.name = Gdata.globalConfig.title;

    util.request({
        url:'/api/op/collection/page/update',
        data:JSON.stringify(data),
        success:function(res){
            callback(res.data);
        }
    });
}


export function getByPageId(pageId,callback) {
    let data = JSON.parse(JSON.stringify(Gdata));
    data.name = Gdata.globalConfig.title;

    util.request({
        url:'/api/op/collection/page/get',
        data:{
            pageId:pageId
        },
        success:function(res){
            callback(res.data);
        }
    });
}