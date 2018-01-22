import React, { Component } from 'react';
import { Form, Icon, Tabs } from 'antd';
import Tab from './tab'

let htmlTpl = require('./html.tpl');

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class OneTabPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picUrl: '',
            callback: function () {

            },
            items:[],
            defaultData: {
                base:{},
                name: '单栏',
                type:9,
                editer: "one-tab-editer",
                tpl:htmlTpl,
                items: [
                    {
                        type:3,
                        noCharging:false,
                        picUrl:'//oss.ltcdn.cc/game/Images/mofang/tab2-base-image.png'
                    }
                ]
            }

        };

        let value = JSON.parse(JSON.stringify(this.state.defaultData));

        let data = [];
        delete value.picUrl;
        value.items.map((item,index) => {
            let param = {};
            param.info = encodeURIComponent(JSON.stringify(item));
            param.picUrl = item.picUrl;
            data.push(param);
        })

        this.onMessage();
    }

    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="appstore-o" key="appstore-o" onClick={this.add}>单栏组件</Icon>)
    }

    add = () => {
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)))
    }

    onMessage() {
        window.onMessage("/editer/one-tab-editer/index.js:edit", (data, callback) => {
            this.setState({
                items: data.items,
                callback: callback
            });
            this.show();
        });

        window.onMessage('hideEditer',()=>{
            this.hide();
        })
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    handleSubmit = () => {

    };

    tabCallback = (index,values)=>{
        let items = JSON.parse(JSON.stringify(this.state.items));
        items[index] = values;
        this.setState({
            items:items
        });
        this.state.callback(items);
    }

    render() {
        console.log(this.state.items);
        let display = this.state.visible ? 'block' : 'none';
        if(!this.state.items.length){
            return <div></div>
        }else {
            return (
                <div style={{display: display}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="第一栏" key="1">
                            <Tab item={this.state.items[0]} callback={(values) => {
                                this.tabCallback(0, values)
                            }}/>
                        </TabPane>
                    </Tabs>
                </div>
            )
        }
    }
}

export default OneTabPage;