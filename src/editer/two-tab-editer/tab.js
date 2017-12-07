import React, {Component} from 'react';
import {Form, Button, Input, InputNumber, Radio, Checkbox, Select, message} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const actions = {
    6: {
        name: "指定计划",
        placeholder: "请输入计划id",
        type: "planId"
    },
    4: {
        name: "指定类目",
        placeholder: "请输入类目id",
        type: "industryId"
    },
    3: {
        name: "游戏互动",
        placeholder: "请输入游戏id",
        type: "lotteryId"
    },
    5: {
        name: "链接",
        placeholder: "请输入链接地址",
        type: "skipUrl"
    },
};

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.change(props.item.type);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            values.picUrl = this.state.item.picUrl;
            this.props.callback(values);
        });
    };

    updateCallback = (res) => {
        let item = Object.assign({},this.state.item);
        item.picUrl = res.data.url;
    };


    change = (value) => {
        this.renderType = () => {
            const {getFieldDecorator} = this.props.form;
            let type = actions[value].type;
            return <FormItem
                {...Util.tailFormItemLayout}>
                {getFieldDecorator(type, {
                    initialValue: this.state.item[type],
                    rules: [{required: true}],
                })(
                    <Input placeholder={actions[value].placeholder}/>
                )}
            </FormItem>
        }
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div style={{"marginBottom": "20px"}}>
                    <Upload callback={this.updateCallback}/>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="跳转类型"
                        {...Util.formItemLayout}
                    >
                        {getFieldDecorator('type', {
                            initialValue: actions[this.state.item.type].name,
                            rules: [{required: true}],
                            onChange: (value) => {
                                this.change(value);
                            }
                        })(
                            <Select>
                                {Object.keys(actions).map((key) => {
                                    return <Option value={key} key={key}>{actions[key].name}</Option>;
                                })}
                            </Select>
                        )}
                    </FormItem>

                    {this.renderType()}

                    <FormItem
                        label="是否计费"
                        {...Util.formItemLayout}>
                        {getFieldDecorator('noCharging', {
                            initialValue:this.state.item.noCharging,
                            valuePropName:"checked"
                        })(
                            <Checkbox>不计费</Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...Util.tailFormItemLayout}>
                        <Button htmlType="submit" type="primary">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


class Middle extends Tab {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item || {}
        });
    }

    render() {
        let Temp = Form.create()(Tab);
        return <Temp item={this.state.item} callback={this.props.callback}/>
    }
}

export default Middle