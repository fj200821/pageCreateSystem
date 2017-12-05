import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';

const FormItem = Form.Item;

class Tab3 extends Component{
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            console.log(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={(e)=>{e.preventDefault();this.handleSubmit(0)}}>
            <FormItem
                label="游戏id"
                {...Util.formItemLayout}
            >
                {getFieldDecorator('gameid', {
                    rules: [{ required: true}]
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
    }
}

export default Form.create()(Tab3);