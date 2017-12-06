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
            defaultData: {
                name: '两栏',
                placeholder: '两栏',
                type: "two-tab-editer",
                tpl:htmlTpl,
                items: [
                    {
                        type:0,
                        data:'',
                        imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
                    },
                    {
                        type:0,
                        data:'',
                        imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
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
        window.onMessage("/editer/two-tab-editer/index.js:edit", (data, callback) => {
            debugger
            this.setState({
                items: data.info,
                callback: callback
            });
            this.show();
        })
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    handleSubmit = () => {

    };

    render() {
        let display = this.state.visible ? 'block' : 'none';
        return (
            <div style={{display: display}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="第一栏" key="1">
                        <Tab />
                    </TabPane>
                    <TabPane tab="第二栏" key="2">
                        <Tab/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default TwoTabPage;