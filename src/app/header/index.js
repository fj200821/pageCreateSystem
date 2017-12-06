import {
    Button,
    message,
    Icon
} from 'antd';
import './index.less';
import React, {Component} from 'react';
message.config({
    top: 50,
    duration: 1,
});

// window.onbeforeunload = function () {
//     return "Are you sure";
// };


class Page extends Component {
    editInfo(){
        window.sendMessage('/editer/info-editer/index.js:edit',Gdata.info,function(data){
            Gdata.info = JSON.parse(JSON.stringify(data));
            window.sendMessage('updateIframe');
            message.success('success');
        })
    }

    save=()=>{
        message.success('保存成功');
    }

    publish=()=>{
        if(!Gdata.info.title.value || !Gdata.components.length){
            message.error('发布失败，必须有标题和最少一个组件实例');
        }else{
            message.success('发布成功');
        }
    }

    render() {
        return <div className="m-nav">
            <a href="javascript:;" onClick={this.editInfo} className="nav"><Icon type="setting" className="icon"><span>页面设置</span></Icon></a>
            <a href="javascript:;" onClick={this.save} className="nav"><Icon type="save" className="icon"><span>保存</span></Icon></a>
            <a href="javascript:;" onClick={this.publish} className="nav"><Icon type="hdd" className="icon"><span>发布</span></Icon></a>
        </div>
    }
}

export default Page;