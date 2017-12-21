import React, {Component} from 'react';
import { Form,Icon,Button} from 'antd';
import Util from '../../compoents/util/util';
let tpl = require('./html.tpl');
let loadingTpl = require('./loading.tpl');
let newsFun = require('./base');
const FormItem = Form.Item;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picUrl:'',
            callback: function () {
            },
            defaultData: {
                sourceArr: [
                    {
                        text: newsFun + ''
                    }
                ],
                base:{},
                name:"信息流",
                type:9,
                editer:"news-editer",//信息流组件
                tpl:tpl,
                items:[{
                    type:9,
                    userName: 'test',
                    userAvatar:'//imgcow.oss-cn-hangzhou.aliyuncs.com/game/Images/IMG_6755.png',
                    content:'十九大后习近平对中国经济给出这8大论断互动互动 两任中央纪委书记的共同任务点击点击接哦委婉人及 点击接单及附近及看上。',
                    likesNum: '666'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="layout" key="newsEditerIcon" onClick={this.add}>信息流</Icon>)
    }


    add=()=>{
        console.log('newsFun:',newsFun);
        window.sendMessage('pushSource', {
            type: 'js',
            name: 'newsFun',
            editer: 'news-editer',
            text: 'var newsFun=' + newsFun,
            loadingTpl: loadingTpl
        });
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/news-editer/index.js:edit", (data, callback) => {
            this.setState({
                items:data.items,
                callback:callback
            });
            this.show();
        });

        window.onMessage('hideEditer',()=>{
            this.hide();
        })
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
    render() {
        const {visible, data} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                test
            </div>
        );
    }
}

export default Page;