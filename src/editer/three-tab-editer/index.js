/**
 * Created by lianglili on 2017/12/04
 */
import React, { Component } from 'react';
import { Form, Icon, Tabs } from 'antd';
import Util from '../../compoents/util/util';
import Tab from './tab'

let htmlTpl = require('./html.tpl');

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class TwoTabPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgUrl: '',
            callback: function () {

            },
            items:[],
            defaultData: {
                base:{},
                name: '两栏',
                placeholder: '两栏',
                type: "three-tab-editer",
                tpl:htmlTpl,
                items: [
                    {
                        type:0,
                        data:'',
                        imgUrl:'//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png'
                    },
                    {
                        type:0,
                        data:'',
                        imgUrl:'//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png'
                    },
                    {
                        type:0,
                        data:'',
                        imgUrl:'//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png'
                    }
                ]
            }

        };

        let value = JSON.parse(JSON.stringify(this.state.defaultData));

        let data = [];
        delete value.imgUrl;
        value.items.map((item,index) => {
            let param = {};
            param.info = encodeURIComponent(JSON.stringify(item));
            param.imgUrl = item.imgUrl;
            data.push(param);
        })

        this.onMessage();
    }

    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="appstore-o" key="appstore-o" onClick={this.add}>两栏组件</Icon>)
    }

    add = () => {
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)))
    }

    onMessage() {
        window.onMessage("/editer/three-tab-editer/index.js:edit", (data, callback) => {
            console.log(data);
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
        console.log(values);
        this.state.callback(items);
    }

    render() {
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
                        <TabPane tab="第二栏" key="2">
                            <Tab item={this.state.items[1]} callback={(values) => {
                                this.tabCallback(1, values)
                            }}/>
                        </TabPane>
                    </Tabs>
                </div>
            )
        }
    }
}

export default TwoTabPage;