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
    preView =()=> {
        var iTop = (window.screen.availHeight - 30 - 375) / 2;
        var iLeft = (window.screen.availWidth - 10 - 667) / 2;
        var OpenWindow=window.open("1111?back=123*testFlag=1", "newwin", "height=667, width=375,toolbar=no ,menubar=no,top="+iTop+",left="+iLeft);
        OpenWindow.document.write(this.concatHtml(true));
        OpenWindow.document.close();
    }
    save=()=>{
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
    concatHtml = (isPreView)=> {
        let iframe = document.querySelector('.viewer-iframe').contentDocument;
        let headHtml = iframe.head.innerHTML;
        console.log('Gdata.sourceArr:', Gdata);
        let sourceArr = this.setSource(Gdata.sourceArr);
        console.log('sourceArr:',sourceArr);
        headHtml = headHtml.replace(/window.Gdata\s*=\s*\{\}/,'window.Gdata='+JSON.stringify(Gdata));
        headHtml = headHtml.replace(/zoom\s*:\s*0\.5\s*;/,'');
        let bodyHtml = '<body> <div class="wrapper"></div> </body>';
        console.log('isPreView:',isPreView);
        if(isPreView) {
            let preView = '<script>window.preView='+true+'</script>';
            var htmls = ['<!DOCTYPE html> <html lang="en"><head>',preView,headHtml,sourceArr,'</head>',bodyHtml,'</html>'];
        }else {
            var htmls = ['<!DOCTYPE html> <html lang="en"><head>',headHtml,sourceArr,'</head>',bodyHtml,'</html>'];
        }
        let html = htmls.join('');
        html = html.replace(/(\d+)px/g,function($0,$1){
            return Number($1)/100+'rem'
        });
        return html;
    }
    setSource= (sourceArr)=>{
        var str = '';
        sourceArr.forEach((item, index)=>{
            //有待优化，本地是有名函数，但是通过打包到线上就变成了无名函数，service的已经改成自执行函数（在iframe.html 中）
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
            <a href="javascript:;" onClick={this.preView} className="nav"><Icon type="eye" className="icon"><span>预览</span></Icon></a>
            <a href="javascript:;" onClick={this.save} className="nav"><Icon type="save" className="icon"><span>保存</span></Icon></a>
            <a href="javascript:;" onClick={this.publish} className="nav"><Icon type="hdd" className="icon"><span>发布</span></Icon></a>
        </div>
    }
}

export default Page;