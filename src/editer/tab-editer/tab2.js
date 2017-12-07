import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber,message} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';

const FormItem = Form.Item;

class Tab2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item || {}
        }
    }
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }

            if(!this.state.item.picUrl){
                message.error('请上传图片');
                return;
            }

            this.props.callback({picUrl:this.state.item.picUrl,skipUrl:values.skipUrl});
        });
    }
    uploadBack=(res)=>{
        let item = Object.assign({},this.state.item);
        item.picUrl = res.data.url;
        this.setState({
            item:item
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
                label="链接地址"
                {...Util.formItemLayout}
            >
                {getFieldDecorator('skipUrl', {
                    initialValue:this.state.item.skipUrl,
                    rules: [{ required: true}]
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
    }
}

class Middle extends Component{
    constructor(props){
        super(props)
        this.state = {
            item:props.item || {}
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.item || {}
        })
    }

    render(){
        let Aaa = Form.create()(Tab2);
        return <div>
            <Aaa item={this.state.item} callback={this.props.callback}/>
        </div>
    }
}

export default Middle;

