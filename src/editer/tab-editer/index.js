import React, {Component} from 'react';
import { Form,Icon,Button} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';
let htmlTpl = require('./html.ejs');

const FormItem = Form.Item;

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
                value:{
                    action:0,
                    data:'',
                    imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
                }
            }
        };
        let value = JSON.parse(JSON.stringify(this.state.defaultData));
        delete value.imgUrl;
        value = encodeURIComponent(JSON.stringify(value));
        this.state.defaultData.html = htmlTpl({info:value,imgUrl:this.state.defaultData.value.imgUrl});
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="picture" key="picEditerIcon" onClick={this.add}/>)
    }


    add=()=>{
        Gdata.add(JSON.parse(JSON.stringify(this.state.defaultData)));
    }

    onMessage() {
        window.onMessage("/editer/tab-editer/index.js:edit", (data, callback) => {
            this.setState({
                info:data.info,
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
        let info = JSON.parse(JSON.stringify(this.state.info));
        info.value=this.state.imgUrl;
        info.html = htmlTpl({imgUrl:this.state.imgUrl});
        this.state.callback(info);
    }

    uploadBack=(data)=>{
        this.setState({
            imgUrl:data.data.url
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