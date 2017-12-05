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
        let $ = contentWindow.$;
        $(contentBody).on('click', '.J_editer', function () {
            let info = JSON.parse(decodeURIComponent($(this).data('info')));
            let order = Number($(this).data('order'));
            window.sendMessage('/editer/' + info.editer + '/index.js:edit', {info: info, order: order}, (info) => {
                $(this).html(info.html);
                $(this).data('info', encodeURIComponent(JSON.stringify(info)));
                Gdata.components[order] = info;
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