import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber,message} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';

const FormItem = Form.Item;

class Tab2 extends Component{
    constructor(props){
        super(props);
    }
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }

            if(!this.state.picUrl){
                message.error('请上传图片');
                return;
            }

            this.props.callback({picUrl:this.state.picUrl,gameId:values.gameId});
        });
    }
    uploadBack=(res)=>{
        this.setState({
            picUrl:res.data.url
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={(e)=>{e.preventDefault();this.handleSubmit(0)}}>
            <FormItem
                label="图片"
                {...Util.formItemLayout}
            >
                <Upload callback={this.uploadBack}/>
            </FormItem>
            <FormItem
                label="游戏id"
                {...Util.formItemLayout}
            >
                {getFieldDecorator('gameId', {
                    rules: [{ required: true}]
                })(
                    <Input placeholder="游戏id"/>
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

export default Form.create()(Tab2);