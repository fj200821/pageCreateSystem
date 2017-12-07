import React, {Component} from 'react';
import PicEditer from '../../editer/pic-editer/index.js';
import TabEditer from '../../editer/tab-editer/index.js';
import TwoTabEditer from '../../editer/two-tab-editer/index.js';
import ThreeTabEditer from '../../editer/three-tab-editer/index.js';
import BaseEditer from '../../editer/base-editer/index';


class Page extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <BaseEditer/>
            <PicEditer/>
            <TabEditer/>
            <TwoTabEditer/>
            <ThreeTabEditer/>
        </div>
    }
}

export default Page;