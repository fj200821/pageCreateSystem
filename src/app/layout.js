import './layout.less';
import React, {Component} from 'react';
require('../gdata');
require('../compoents/onmessage');
import Loading from'../compoents/loading/index';
import InfoEditer from '../editer/globalConfig-editer/index.js';

import Header from './header/index';
import Left from './left/index';
import Viewer from './viewer/viewer';
import Right from './right/index';

class Page extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<div>
            <div className="layout">
                <div className="layout-header">
                    <Header/>
                </div>
                <div className="layout-left">
                    <Left/>
                </div>
                <div className="layout-main">
                    <Viewer/>
                </div>
                <div className="layout-right">
                    <Right/>
                </div>
            </div>
            <InfoEditer/>
            <Loading/>
        </div>)
    }

}

export default Page