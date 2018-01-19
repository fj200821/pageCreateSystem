import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
let tpl = require('./html.tpl');
import Tab1 from './tab1';

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
                name:"通栏(纯图片)",
                type:10,
                editer:"tab2-editer",//标题组件
                tpl:tpl,
                items:[{
                    type:6,
                    planIds:[],
                    picUrl:'//oss.ltcdn.cc/game/Images/mofang/tab2-base-image.png'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="schedule" key="schedule" onClick={this.add}>通栏(纯图片)</Icon>)
    }


    add=()=>{
        // window.sendMessage('pushSource', {
        //     type: 'js',
        //     editer: 'tab2-editer',
        //     link: '///oss.ltcdn.cc/game/Theme/Real/Js/iscroll.js'
        // });
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/tab2-editer/index.js:edit", (data, callback) => {
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
        for(var i=0;i<Number(value.num);i++){
            items.push(
                {
                    planIds:value.planIds.split(','),
                    type:6,
                    picUrl:'//oss.ltcdn.cc/game/Images/mofang/tab2-base-image.png'
                }
            )
        }
        this.state.callback(items);
        this.setState({
            items:items
        })
    }

    render() {
        const {visible} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Tabs defaultActiveKey={this.state.activeKey.toString()} activeKey={this.state.activeKey.toString()} onChange={(activeKey)=>{this.setState({activeKey:activeKey})}}>
                    <TabPane tab="指定广告" key="1">
                        <Tab1 callback={this.tab1Callback} item={this.state.items[0]} num={this.state.items.length}/>
                    </TabPane>
                    <TabPane tab="链接" key="2">
                        敬请期待
                    </TabPane>
                    <TabPane tab="游戏互动" key="3">
                        敬请期待
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Page;