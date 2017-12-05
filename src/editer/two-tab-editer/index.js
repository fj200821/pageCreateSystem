/**
 * Created by lianglili on 2017/12/04
 */
import React, { Component } from 'react';
import { Form, Icon, Button } from 'antd';
import Util from '../../compoents/util/util';

let htmlTpl = require('./html.ejs');

const FormItem = Form.Item;

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

        this.state.defaultData.html = htmlTpl(data);
        this.onMessage();
    }

    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="picture" key="twoTabIcon" onClick={this.add}/>)
    }

    add = () => {
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)))
    }

    onMessage() {
        window.onMessage("/editer/two-tab-editer/index.js:edit", (data, callback) => {
            debugger
            this.setState({
                info: data.info,
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

            </div>
        )
    }
}

export default TwoTabPage;