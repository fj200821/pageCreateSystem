import React, {Component} from 'react';
import {Modal, Button, Input, Form} from 'antd';
import {observer} from 'mobx-react';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload'

const FormItem = Form.Item;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            callback:function(){},
            data: {
                title:{},
                bgImg:{},
                bgColor:{},
            }
        };
        this.init();
    }

    init() {
        window.onMessage("/editer/globalConfig-editer/index.js:edit", (data,callback) => {
            this.setState({
                data: data,
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


    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            let data = JSON.parse(JSON.stringify(this.state.data));
            data.title = values.title;
            data.bgColor = values.bgColor;
            data.bgImg = this.state.bgImg;
            this.state.callback(data);
            this.toggle();
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {visible,data} = this.state;
        const globalConfig = Gdata.globalConfig;
        return (
            <div>
                <Modal title="页面设置"
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={this.toggle}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="页面标题"
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('title', {
                                initialValue:globalConfig.title,
                                rules: [{ required: true}],
                            })(
                                <Input placeholder="请输入页面标题"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="背景色"
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('bgColor', {
                                initialValue:globalConfig.bgColor,
                            })(
                                <Input placeholder="请输入页面背景色"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="背景图片"
                            {...Util.formItemLayout}
                        >
                            <Upload callback={(res)=>{this.setState({bgImg:res.data.url})}}/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(Page);