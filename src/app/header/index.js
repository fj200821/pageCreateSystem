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
/**
 *页面关闭或者刷新（线上打开）
 */
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
        // var OpenWindow=window.open("1111?back=123*testFlag=1", "newwin", "height=250, width=250,toolbar=no ,menubar=no");
        // OpenWindow.document.write(this.concatHtml());
        // OpenWindow.document.close();

        Model.update((res)=>{
            Gdata.id = res;
            message.success('保存成功');
        })
    }
    publish=()=>{
        if(!Gdata.globalConfig.title){
            message.error('发布失败，必须有标题和');
        }else{
            Model.publish(this.concatHtml(),()=>{
                message.success('保存成功');
            })
        }
    }
    concatHtml = ()=> {
        let iframe = document.querySelector('.viewer-iframe').contentDocument;
        let headHtml = iframe.head.innerHTML;
        console.log('Gdata.sourceArr:', Gdata)
        let sourceArr = this.setSource(Gdata.sourceArr);
        console.log('sourceArr:',sourceArr);
        headHtml = headHtml.replace(/window.Gdata\s*=\s*\{\}/,'window.Gdata='+JSON.stringify(Gdata));
        headHtml = headHtml.replace(/zoom\s*:\s*0\.5\s*;/,'');
        let bodyHtml = '<body> <div class="wrapper"></div> </body>';
        let htmls = ['<!DOCTYPE html> <html lang="en"><head>',headHtml,sourceArr,'</head>',bodyHtml,'</html>'];
        let html = htmls.join('');
        html = html.replace(/(\d+)px/g,function($0,$1){
            return Number($1)/100+'rem'
        });
        return html;
    }
    setSource= (sourceArr)=>{
        var str = '';
        sourceArr.forEach((item, index)=>{
            console.log(index)
            if(item.type === 'js') {
                str += item.link?'<script src="'+item.link+'"></script>':"";
                if(item.text && item.name) {
                   str += `<script>${item.text};${item.name}();</script>`;
                }
            }else if(item.type === 'css') {
                str += item.link?'<link href="'+item.link+'" rel="stylesheet">':"";
                str += item.text?'<style>'+item.text+'</style>':"";
            }
        });
        return str;
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