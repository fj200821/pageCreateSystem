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
                type:6,
                noCharging:false,
                picUrl:'//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png'
            }
        };
        if(props.item){
            this.state.item = props.item;
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.item || {}
        });
        console.log(nextProps.item.type)
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) {
                console.log('Received values of from:', values);
                return;
            }
            values.picUrl = this.state.item.picUrl;
            this.props.callback(values);
        })
    };

    updateCallback=(res)=>{
        let item = this.state.item;
        item.picUrl = res.data.url;
    };

    changeNoCharging=(e)=>{
        let item = JSON.parse(JSON.stringify(this.state.item));
        item.noCharging = e.target.checked;
        this.setState({
            item:item
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const types = [{
            id:6,
            name:"指定计划"
        },{
            id:4,
            name:"指定类目"
        },{
            id:3,
            name:"游戏互动"
        },{
            id:5,
            name:"链接"
        }];


        return (
            <div>
                <div style={{"marginBottom":"20px"}}>
                    <Upload callback={this.updateCallback}/>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="跳转类型"
                        {...Util.formItemLayout}
                    >
                        {getFieldDecorator('type', {
                            initialValue:this.state.item.type
                        })(
                            <Select>
                                {types.map((type,key)=>{
                                    return <Option value={type.id} key={key}>{type.name}</Option>;
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