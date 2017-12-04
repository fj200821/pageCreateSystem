import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';
let htmlTpl = require('./html.ejs');

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

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
                value:[{
                    action:0,
                    data:'',
                    imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
                }]
            }
        };
        this.state.defaultData.html = htmlTpl(this.state.defaultData.value);
        this.onMessage();
    }


    componentDidMount() {
        window.sendMessage('renderEditerIcon', <Icon type="info-circle" key="info-circle" onClick={this.add}/>)
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
        const { getFieldDecorator } = this.props.form;
        const {visible, data} = this.state;
        let display = visible?'block':'none';
        return (
            <div style={{display:display}}>
                <Upload callback={this.uploadBack}/>
                <Tabs defaultActiveKey="1" onChange={()=>{}}>
                    <TabPane tab="指定广告" key="1">
                        <Form>
                        <FormItem
                            label="广告计划"
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('pids', {
                            })(
                                <Input placeholder="请输入广告计划id，以英文,隔开"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="展示个数"
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('num', {
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...Util.tailFormItemLayout}
                        >
                            <Button type="primary" htmlType="submit">确定</Button>
                        </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane tab="链接" key="2">
                        <Form>
                            <FormItem
                                label="链接地址"
                                {...Util.formItemLayout}
                            >
                                {getFieldDecorator('pids', {
                                })(
                                    <Input placeholder="请输入链接地址"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...Util.tailFormItemLayout}
                            >
                                <Button type="primary" htmlType="submit">确定</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane tab="游戏互动" key="3">
                        <Form>
                            <FormItem
                                label="游戏id"
                                {...Util.formItemLayout}
                            >
                                {getFieldDecorator('pids', {
                                })(
                                    <Input placeholder="请输入游戏id"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...Util.tailFormItemLayout}
                            >
                                <Button type="primary" htmlType="submit">确定</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(Page);