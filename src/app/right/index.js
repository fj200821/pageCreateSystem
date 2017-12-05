import React, {Component} from 'react';
import PicEditer from '../../editer/pic-editer/index.js';
import TabEditer from '../../editer/tab-editer/index.js';
import TwoTabEditer from '../../editer/two-tab-editer/index.js';


class Page extends Component{
    render(){
        return <div>
            <PicEditer/>
            <TabEditer/>
            <TwoTabEditer/>
        </div>
    }
}

export default Page;