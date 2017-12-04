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
        window.sendMessage('/editer/info-editer.js:edit',Gdata.info,function(data){
            Gdata.info = JSON.parse(JSON.stringify(data));
            window.sendMessage('updateIframe');
            message.success('success');
        })
    }
    render() {
        return <div className="m-nav">
            <a href="javascript:;" onClick={this.editInfo} className="nav"><Icon type="setting" className="icon"><span>页面设置</span></Icon></a>
        </div>
    }
}

export default Page;