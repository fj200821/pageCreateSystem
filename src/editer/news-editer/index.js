import React, {Component} from 'react';
import { Form,Icon,Button,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';
let tpl = require('./html.tpl');
let loadingTpl = require('./loading.tpl');
let newsFun = require('./service');
console.log(newsFun);
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
                service: {fun: newsFun + ''},
                base:{},
                name:"信息流",
                type:9,
                editer:"news-editer",//信息流组件
                tpl:tpl,
                items:[{
                    type:9,
                    userName: '----',
                    userAvatar:'//oss.ltcdn.cc/game/Images/IMG_6755.png',
                    content:'------------------------------------------------------------------------------------',
                    likesNum: '----'
                }]
            }
        };
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="layout" key="newsEditerIcon" onClick={this.add}>信息流</Icon>)
    }
    handleSubmit() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            Gdata.interval = values.interval;
        });
    }

    add=()=>{
        console.log('newsFun:',newsFun);
        window.sendMessage('pushSource', {
            editer: 'news-editer',
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
        const { getFieldDecorator } = this.props.form;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Form onSubmit={(e)=>{e.preventDefault();this.handleSubmit(0)}}>
                    <FormItem
                        label="隔多少出广告:(取值区间3~8)"
                    >
                        {getFieldDecorator('interval', {
                            initialValue:'',
                            rules: [{ required: true}]
                        })(
                            <InputNumber min={3} max={8}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...Util.tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Page);