import React, {Component} from 'react';

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
            let component = JSON.parse(decodeURIComponent($(this).data('component')));
            let order = Number($(this).data('order'));
            window.sendMessage('/editer/' + component.type + '/index.js:edit', {items: component.items, order: order}, (items) => {
                Gdata.components[order].items = items;
                self._updateIframe();
            })
        })
    }

    _setIframe() {
        let iframe = document.createElement('iframe');
        iframe.className = 'viewer-iframe';
        iframe.src = "/tpl/iframe.html";
        this.iframe = iframe;
        this.iframe.onload = () => {
            this._initIframe();
            setTimeout(() => {
                this._bindEditer();
            }, 1000);
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

    iframeRender(viewerEl, data) {
        viewerEl.innerHTML = '';
        viewerEl.appendChild(this.iframe);
    }
}

export default Iframe;