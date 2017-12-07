import React, {Component} from 'react';
import {Form, Icon, Button, Divider, InputNumber} from 'antd';
import Util from '../../compoents/util/util';


const FormItem = Form.Item;

class BaseEditer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            base: {
                "marginTop": "0",
                "order": 0
            }
        };
        this.onMessage();
    }

    onMessage() {
        window.onMessage('/editer/base-editer/index.js:edit', (data, callback) => {
            console.log(data);
            this.setState({
                order: data.order,
                visible: true,
                base: data.base,
                callback: callback
            })
        });

        window.onMessage('hideEditer',()=>{
            this.hide();
        });
    }

    hide(){
        this.setState({
            visible:false
        })
    }

    change = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            this.state.callback(values);
        });
    }

    moveTop = () => {
        let components = JSON.parse(JSON.stringify(Gdata.components));
        let order = this.state.order;
        if (order === 0) {
            return;
        }
        let neworder = order - 1;
        let component = components.splice(order, 1);
        components.splice(neworder, 0, component[0]);
        Gdata.components = components;
        window.sendMessage('updateIframe');
        this.setState({
            order: neworder
        })
    }

    moveBown = () => {
        let components = JSON.parse(JSON.stringify(Gdata.components));
        let order = this.state.order;
        if (order === Gdata.components.length - 1) {
            return;
        }
        let neworder = order + 1;
        let component = components.splice(order, 1);
        components.splice(neworder, 0, component[0]);
        Gdata.components = components;
        window.sendMessage('updateIframe');
        this.setState({
            order: neworder
        })
    }

    del=()=>{
        let components = JSON.parse(JSON.stringify(Gdata.components));
        let order = this.state.order;
        components.splice(order, 1);
        console.log(components);
        Gdata.components = components;
        window.sendMessage('updateIframe');
        window.sendMessage('hideEditer');
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible, data} = this.state;
        let display = visible ? 'block' : 'none';
        return <div style={{display: display, marginTop: -15}}>
            <Divider>基础设置</Divider>
            <Form onSubmit={this.submit}>
                <FormItem
                    label="上边距"
                    {...Util.formItemLayout}>
                    {getFieldDecorator('marginTop', {
                        initialValue: this.state.base.marginTop,
                    })(
                        <InputNumber onChange={this.change}/>
                    )}
                </FormItem>
                <FormItem
                    label="操作"
                    {...Util.formItemLayout}>
                    <div>
                        <a href="javascript:;"><Icon type="up" onClick={this.moveTop}/></a>
                        <a href="javascript:;"><Icon type="down" onClick={this.moveBown} style={{"marginLeft": "10px"}}/></a>
                        <a href="javascript:;"><Icon type="delete" onClick={this.del} style={{"marginLeft": "10px"}}/></a>
                    </div>
                </FormItem>
            </Form>
            <Divider>实例设置</Divider>
        </div>
    }
}

export default Form.create()(BaseEditer);