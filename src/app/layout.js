import './layout.less';
import React, {Component} from 'react';
require('../gdata');
require('../compoents/onmessage');

import InfoEditer from '../editer/globalConfig-editer/index.js';

import Header from './header/index';
import Left from './left/index';
import Viewer from './viewer/viewer';
import Right from './right/index';

class Page extends Component {
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
        </div>)
    }

}

export default Page