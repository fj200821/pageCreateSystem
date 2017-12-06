import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';

const FormItem = Form.Item;

class Tab1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultData:{}
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            defaultData:nextProps.defaultData || {}
        })
    }

    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            this.props.callback(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={(e)=>{e.preventDefault();this.handleSubmit(0)}}>
            <FormItem
                label="广告计划"
                {...Util.formItemLayout}
            >
                {getFieldDecorator('pids', {
                    initialValue:this.state.defaultData.pids,
                    rules: [{ required: true}]
                })(
                    <Input placeholder="请输入广告计划id，以英文,隔开"/>
                )}
            </FormItem>
            <FormItem
                label="展示个数"
                {...Util.formItemLayout}
            >
                {getFieldDecorator('num', {
                    initialValue:this.state.defaultData.num,
                    rules: [{ required: true}]
                })(
                    <InputNumber min={1} max={3}/>
                )}
            </FormItem>
            <FormItem
                {...Util.tailFormItemLayout}
            >
                <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create()(Tab1);