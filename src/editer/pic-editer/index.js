import React, {Component} from 'react';
import { Form,Icon,Button} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';
let tpl = require('./html.tpl');
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
                base:{},
                name:"图片组件",
                type:6,
                editer:"pic-editer",//标题组件
                items:[{
                    type:8,
                    picUrl:"//oss.ltcdn.cc/cow/2017/12/06/255w_62h_A73231512552162_origin.png",
                    width:255
                }],
                tpl:tpl
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="picture" key="picEditerIcon" onClick={this.add}>标题</Icon>)
    }


    add=()=>{
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/pic-editer/index.js:edit", (data, callback) => {
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


    handleSubmit = () => {
        let items = JSON.parse(JSON.stringify(this.state.items));
        items[0].picUrl=this.state.picUrl;
        items[0].width=this.state.picUrl.match(/\/(\d+)w_/)[1];
        this.state.callback(items);
    }

    uploadBack=(data)=>{
        this.setState({
            picUrl:data.data.url
        },()=>{
            this.handleSubmit();
        })
    }

    render() {
        const {visible, data} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Upload callback={this.uploadBack} style={{"marginBottom":"20px"}}/>
            </div>
        );
    }
}

export default Page;