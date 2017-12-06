import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Radio,Checkbox,Select} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:{
                type:"1",
                data:'',
                noCharging:false,
                imgUrl:'http://static.adbaitai.com/Website/Img/logo.png'
            }
        }
        if(props.item){
            this.state.item = props.item;
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.item || {}
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) {
                console.log('Received values of from:', values);
                return;
            }
            values.imgUrl = this.state.item.imgUrl;
            this.props.callback(values);
        })
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    updateCallback=(res)=>{
        let item = this.state.item;
        item.imgUrl = res.data.url;
    }

    changeNoCharging=(e)=>{
        let item = JSON.parse(JSON.stringify(this.state.item));
        item.noCharging = e.target.checked;
        this.setState({
            item:item
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const types = [["1","指定计划"],["2","指定类目"],["3","游戏互动"],["4","链接"]];
        console.log(this.state.item.type);
        return (
            <div>
                <Upload callback={this.updateCallback}/>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="跳转类型"
                        {...Util.formItemLayout}
                    >
                        {getFieldDecorator('type', {
                            initialValue:types[(this.state.item.type || 0)-1][1]
                        })(
                            <Select>
                                {types.map((type,key)=>{
                                    return <Option value={type[0]} key={key}>{type[1]}</Option>;
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...Util.tailFormItemLayout}
                    >
                        {getFieldDecorator('data', {
                            initialValue:this.state.item.data
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('noCharging', {
                            valuePropName: 'checked',
                            initialValue:this.state.item.noCharging
                        })(
                            <Checkbox onChange={this.changeNoCharging}>不计费</Checkbox>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit" type="primary">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Tab);