import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
let htmlTpl = require('./html.tpl');

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
                placeholder:"通栏",
                editer:"tab-editer",//标题组件
                value:[{
                    action:0,
                    data:'',
                    imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="info-circle" key="info-circle" onClick={this.add}/>)
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
        })
    }

    show=()=>{
        this.setState({
            visible: true
        })
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    tab1Callback=(value)=>{
        this.state.callback(value);
    }

    render() {
        const {visible, data} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Tabs defaultActiveKey="1" onChange={()=>{}}>
                    <TabPane tab="指定广告" key="1">
                        <Tab1 callback={this.tab1Callback()}/>
                    </TabPane>
                    <TabPane tab="链接" key="2">
                        <Tab2/>
                    </TabPane>
                    <TabPane tab="游戏互动" key="3">
                        <Tab3/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Page;