import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
let tpl = require('./html.tpl');

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgUrl:'',
            callback: function () {
            },
            defaultData: {
                name:"通栏",
                type:"tab-editer",//标题组件
                tpl:tpl,
                items:[{
                    type:0,
                    num:1,
                    pids:[1,2,3,4,5],
                    imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="schedule" key="schedule" onClick={this.add}>通栏组件</Icon>)
    }


    add=()=>{
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/tab-editer/index.js:edit", (data, callback) => {
            this.setState({
                items:data.items,
                callback:callback
            });
            this.show();
        });

        window.onMessage('hideEditer',()=>{
            this.hide();
        });
    }

    show=()=>{
        this.setState({
            visible: true
        })
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    tab1Callback=(value)=>{
        let items = [];
        items.push({
            pids:value.pids,
            type:0,
            num:value.num,
            imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
        });
        this.state.callback(items);
    }

    tab2Callback=(value)=>{
        let items = [];
        items.push({
            type:1,
            imgUrl:value.imgUrl,
            skipUrl:value.skipUrl
        });
        this.state.callback(items);
    }

    tab3Callback=(value)=>{
        let items = [];
        items.push({
            type:2,
            imgUrl:value.imgUrl,
            gameId:value.gameId
        });
        this.state.callback(items);
    }

    render() {
        const {visible, data} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Tabs defaultActiveKey="1" onChange={()=>{}}>
                    <TabPane tab="指定广告" key="1">
                        <Tab1 callback={this.tab1Callback}/>
                    </TabPane>
                    <TabPane tab="链接" key="2">
                        <Tab2 callback={this.tab2Callback}/>
                    </TabPane>
                    <TabPane tab="游戏互动" key="3">
                        <Tab3 callback={this.tab3Callback}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Page;