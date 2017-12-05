import React, {Component} from 'react';
let iframeHeaderHtml = require('./tpl/iframe-header.html');
let contentDocument,contentBody,contentWindow,contentWrapper;

class Iframe extends Component{
    constructor(props){
        super(props);
        this._setIframe();
        window.onMessage('updateIframe',()=>{
            this.updateIframe();
        });
        window.addEventListener('load',()=>{
            window.sendMessage('updateIframe');
        });
    }

    _bindEditer(){
          let $ = contentWindow.$;
          $(contentBody).on('click','.J_editer',function(){
              let info = JSON.parse(decodeURIComponent($(this).data('info')));
              let order = Number($(this).data('order'));
              window.sendMessage('/editer/'+info.editer+'/index.js:edit',{info:info,order:order},(info)=>{
                  $(this).html(info.html);
                  $(this).data('info',encodeURIComponent(JSON.stringify(info)));
                  Gdata.components[order]=info;
              })
          })
    }

    _setIframe(){
        let iframe = document.createElement('iframe');
        iframe.className='viewer-iframe';
        this.iframe = iframe;
        this._setIframe = function(){};
    }

    _initIframe(){
        let iframe = this.iframe;
        iframe.contentDocument.head.innerHTML=iframeHeaderHtml;
        contentDocument = iframe.contentDocument;
        contentBody = iframe.contentDocument.body;
        contentWindow = iframe.contentWindow;
        contentBody.style.width='750px';
        contentBody.style.overflowX='hidden';
        contentBody.style.zoom=0.5;
        contentWrapper = document.createElement('div');
        contentWrapper.className='wrapper';
        contentBody.appendChild(contentWrapper);
        let zeptoEl = document.createElement('script');
        zeptoEl.src="//oss.ltcdn.cc/game/Js/zepto.min.js";
        zeptoEl.onload = ()=>{
            this._bindEditer();
        };
        contentDocument.head.appendChild(zeptoEl);
    }

    updateIframe(){
        Gdata.info.bgColor.value && (contentBody.style['background-color']=Gdata.info.bgColor.value);
        Gdata.info.bgImg.value && (contentWrapper.style['background-image']='url('+Gdata.info.bgImg.value+')');
        let components = Gdata.components;
        let htmls = components.map((component,key)=>{
            return '<div class="J_editer" data-info="'+encodeURIComponent(JSON.stringify(component))+'" data-order="'+key+'">'+component.html+'</div>';
        });
        contentWrapper.innerHTML = htmls.join('');
    }

    iframeRender(viewerEl,data){
        viewerEl.innerHTML='';
        viewerEl.appendChild(this.iframe);
        this._initIframe();
    }
}

export default Iframe;