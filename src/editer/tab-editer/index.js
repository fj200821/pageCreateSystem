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
            activeKey:"1",
            visible: false,
            picUrl:'',
            callback: function () {
            },
            items:[],
            defaultData: {
                base:{},
                name:"通栏",
                type:"tab-editer",//标题组件
                tpl:tpl,
                items:[{
                    type:0,
                    num:1,
                    planIds:[],
                    picUrl:'//oss.ltcdn.cc/cow/2017/12/06/710w_410h_A07AF1512552490_origin.png'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="schedule" key="schedule" onClick={this.add}>通栏</Icon>)
    }


    add=()=>{
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/tab-editer/index.js:edit", (data, callback) => {
            let type = data.items[0].type;
            if(!type && type!==0){
                type===this.state.activeKey;
            }else{
                type = type+1;
            }

            this.setState({
                items:data.items,
                callback:callback,
                activeKey:type.toString()
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
            planIds:value.planIds.split(','),
            type:0,
            num:value.num,
            picUrl:'//oss.ltcdn.cc/cow/2017/12/06/710w_410h_A07AF1512552490_origin.png'
        });
        this.state.callback(items);
    }

    tab2Callback=(value)=>{
        let items = [];
        items.push({
            type:1,
            picUrl:value.picUrl,
            skipUrl:value.skipUrl
        });
        this.state.callback(items);
    }

    tab3Callback=(value)=>{
        let items = [];
        items.push({
            type:2,
            picUrl:value.picUrl,
            gameId:value.gameId
        });
        this.state.callback(items);
    }

    render() {
        const {visible} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Tabs defaultActiveKey={this.state.activeKey.toString()} activeKey={this.state.activeKey.toString()} onChange={(activeKey)=>{this.setState({activeKey:activeKey})}}>
                    <TabPane tab="指定广告" key="1">
                        <Tab1 callback={this.tab1Callback} defaultData={this.state.items[0]}/>
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