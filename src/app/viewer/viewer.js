import React, {Component} from 'react';
import './viewer.less';
import Iframe from './iframe';

class Page extends Iframe{

    constructor(props){
        super(props);
    }


    appendViewer(){
        let el = document.querySelector('#m-viewer');
        this.iframeRender(el);
    }

    componentDidMount(){
        this.appendViewer();
    }

    componentDidUpdate(){
        this.appendViewer();
    }

    render(){

        return <div className="m-viewer-container">
            <div className="m-viewer" id='m-viewer'></div>
        </div>
    }
}

export default Page;