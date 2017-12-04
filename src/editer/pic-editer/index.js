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
                name:"图片1",
                placeholder:"请选择图片1",
                editer:"pic-editer",//标题组件
                value:"",
                html:htmlTpl({imgUrl:'//static.adbaitai.com/Website/Img/logo.png'})
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