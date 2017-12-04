import React, {Component} from 'react';
import {Modal, Button, Input, Form} from 'antd';
import {observer} from 'mobx-react';
import Util from '../compoents/util/util';
import Upload from '../compoents/upload'

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
        window.onMessage("/editer/info-editer.js:edit", (data,callback) => {
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
            data.title.value = values.title;
            data.bgColor.value = values.bgColor;
            data.bgImg.value = this.state.bgImg;
            this.state.callback(data);
            this.toggle();
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {visible,data} = this.state;
        return (
            <div>
                <Modal title="页面设置"
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={this.toggle}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label={data.title.name}
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true}],
                            })(
                                <Input placeholder={data.title.placeholder}/>
                            )}
                        </FormItem>
                        <FormItem
                            label={data.bgColor.name}
                            {...Util.formItemLayout}
                        >
                            {getFieldDecorator('bgColor', {
                            })(
                                <Input placeholder={data.bgColor.placeholder}/>
                            )}
                        </FormItem>
                        <FormItem
                            label={data.bgImg.name}
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