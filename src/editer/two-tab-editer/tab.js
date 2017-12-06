import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Radio} from 'antd';
import Util from '../../compoents/util/util';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: this.props.imgUrl,
            value: 1
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) {
                console.log('Received values of from:', values);
                return;
            }
            this.props.callback(values);
        })
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}><Input style={{ width: 100, marginLeft: 10 }} /></Radio>
                            <Radio value={2}><Input style={{ width: 100, marginLeft: 10 }} /></Radio>
                            <Radio value={3}><Input style={{ width: 100, marginLeft: 10 }} /></Radio>
                            <Radio value={4}><Input style={{ width: 100, marginLeft: 10 }} /></Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Tab);