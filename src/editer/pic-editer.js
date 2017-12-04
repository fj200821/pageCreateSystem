import React, {Component} from 'react';
import { Form,Icon,Button} from 'antd';
import Util from '../compoents/util/util';
import Upload from '../compoents/upload'

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
                editer:"editer-img",//标题组件
                value:"",
                html:'<img src="http://static.adbaitai.com/Website/Img/logo.png"/>'
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
        window.onMessage("/editer/pic-editer.js:edit", (data, callback) => {
            this.setState({
                info:data.info,
                callback:callback
            });

            this.toggle();
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
        info.html = '<img src="'+info.value+'"/>';
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