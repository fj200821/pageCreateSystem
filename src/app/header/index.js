import {
    Button,
    message,
    Icon
} from 'antd';
import './index.less';
import React, {Component} from 'react';
import * as Model from '../../model';
message.config({
    top: 50,
    duration: 1,
});

// window.onbeforeunload = function () {
//     return "Are you sure";
// };


class Page extends Component {
    constructor(props){
        super(props);
        this.state={
            showLoading:true
        };

        window.onMessage('toggleLoading',()=>{
            this.setState({
                showLoading:!this.state.showLoading
            })
        })
    }
    editInfo(){
        window.sendMessage('/editer/globalConfig-editer/index.js:edit',Gdata.globalConfig,function(data){
            Gdata.globalConfig = JSON.parse(JSON.stringify(data));
            window.sendMessage('updateIframe');
            message.success('success');
        })
    }

    save=()=>{
        Model.update(()=>{
            message.success('保存成功');
        })
    }

    publish=()=>{
        if(!Gdata.globalConfig.title){
            message.error('发布失败，必须有标题和');
        }else{
            let iframe = document.querySelector('.viewer-iframe').contentDocument;
            let headHtml = iframe.head.innerHTML;
            headHtml = headHtml.replace(/window.Gdata\s*=\s*\{\}/,'window.Gdata='+JSON.stringify(Gdata));
            let bodyHtml = '<body style="width: 750px;"> <div class="wrapper"></div> </body>';
            let htmls = ['<!DOCTYPE html> <html lang="en"><head>',headHtml,'</head>',bodyHtml,'</html>'];
            Model.publish(htmls.join(''),()=>{
                message.success('保存成功');
            })
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