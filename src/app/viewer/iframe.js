import React, {Component} from 'react';
import * as Model from '../../model';
require('../../tools');

let contentDocument, contentBody, contentWindow, contentWrapper;

class Iframe extends Component {
    constructor(props) {
        super(props);
        this._setIframe();
        window.onMessage('updateIframe', () => {
            this._updateIframe();
        });
        window.addEventListener('load', () => {
            window.sendMessage('updateIframe');
        });
    }

    _bindEditer() {
        let self = this;
        let $ = contentWindow.$;
        $(contentBody).on('click', '.J_editer', function () {
            window.sendMessage('hideEditer');
            let order = Number($(this).data('order'));
            let component = Gdata.components[order];
            self._selectState($,this);
            setTimeout(()=>{
                window.sendMessage('/editer/' + component.editer + '/index.js:edit', {items: component.items, order: order}, (items) => {
                    Gdata.components[order].items = items;
                    self._updateIframe();
                });
                window.sendMessage('/editer/base-editer/index.js:edit', {base: component.base, order: order}, (base,neworder) => {
                    base && (Gdata.components[order].base = base);
                    neworder && (order=neworder);
                    self._updateIframe();
                });
            },10);
        })
    }
    _selectState($,parent) {
        $('.editerSelectState').remove();
        let tpl = '<div class="editerSelectState" style="position:absolute;width:99%;height:100%;top:0;border:2px dashed #fff;z-index: 1111"></div>';
        $(parent).css('position', 'relative');
        $(parent).append(tpl);
    }
    _setIframe() {
        let iframe = document.createElement('iframe');
        iframe.className = 'viewer-iframe';
        this.iframe = iframe;
        iframe.src = "/mofang/tpl/iframe.html?isEditer=true";
        this.iframe.onload = () => {
            this._initIframe();
            let bind=()=>{
                if(contentWindow.$){
                    this._getInitData();
                    this._bindEditer();
                }else{
                    setTimeout(bind,50);
                }
            };
            setTimeout(bind,50);
        };
        this._setIframe = function () {
        };
    }

    _initIframe() {
        let iframe = this.iframe;
        contentDocument = iframe.contentDocument;
        contentBody = iframe.contentDocument.body;
        contentWindow = iframe.contentWindow;
        contentWrapper = contentDocument.querySelector('.wrapper');
    }


    _updateIframe() {
        contentWindow.Build.update(Gdata);
    }

    _getInitData(){
        var pageId = getQueryString('pageId');
        if(pageId) {
            Model.getPageData(pageId,(res)=>{
                if(res.success && res.data.modifyData) {
                    console.log(JSON.parse(res.modifyData));
                    let add  = Gdata.add;
                    Gdata=JSON.parse(res.modifyData);
                    Gdata.sourceArr? "": Gdata.sourceArr = [];
                    Gdata.add = add;
                }
            })
        }
        window.sendMessage('updateIframe');
        window.sendMessage('toggleLoading');
    }

    iframeRender(viewerEl, data) {
        viewerEl.innerHTML = '';
        viewerEl.appendChild(this.iframe);
    }
}

export default Iframe;