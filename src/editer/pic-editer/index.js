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
                name:"图片组件",
                type:"pic-editer",//标题组件
                items:[{
                    "picUrl":"//static.adbaitai.com/Website/Img/logo.png"
                }],
                tpl:tpl
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="picture" key="picEditerIcon" onClick={this.add}/>)
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


    handleSubmit = () => {
        let items = JSON.parse(JSON.stringify(this.state.items));
        items[0].picUrl=this.state.picUrl;
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
                <Upload callback={this.uploadBack}/>
            </div>
        );
    }
}

export default Page;