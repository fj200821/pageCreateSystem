import React, {Component} from 'react';
import { Form,Icon,Button,Tabs,Input,InputNumber} from 'antd';
import Util from '../../compoents/util/util';

const FormItem = Form.Item;

class Tab1 extends Component{
    constructor(props){
        super(props);
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
                {getFieldDecorator('planIds', {
                    initialValue:this.props.item?this.props.item.planIds.join(','):'',
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
                    initialValue:this.props.num?this.props.num: '',
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

// class Middle extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             item:props.item || {},
//             num:props.num
//         }
//     }
//
//     componentWillReceiveProps(nextProps){
//         this.setState({
//             item:nextProps.item || {},
//             num:nextProps.num
//         })
//     }
//
//     render(){
//         let Temp = Form.create()(Tab1);
//         return <div>
//             <Temp item={this.state.item} callback={this.props.callback} num={this.state.num}/>
//         </div>
//     }
// }

export default Form.create()(Tab1);