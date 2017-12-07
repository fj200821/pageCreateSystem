import React, {Component} from 'react';
import {Form, Button, Input, InputNumber, Radio, Checkbox, Select,message} from 'antd';
import Util from '../../compoents/util/util';
import Upload from '../../compoents/upload';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const types = {
    6:{
        name:"指定计划",
        placeholder:"请输入计划id",
        type:"planId"
    },
    4:{
        name:"指定类目",
        placeholder:"请输入类目id",
        type:"industryId"
    },
    3:{
        name:"游戏互动",
        placeholder:"请输入游戏id",
        type:"lotteryId"
    },
    5:{
        name:"链接",
        placeholder:"请输入链接地址",
        type:"skipUrl"
    },
};

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                type: 6,
                noCharging: false,
                picUrl: '//oss.ltcdn.cc/cow/2017/12/07/231w_221h_1322A1512613862_origin.png'
            }
        };
        if (props.item) {
            this.state.item = props.item;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item || {}
        });
        console.log(nextProps.item)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let item = this.state.item;
        if(!item[types[item.type].type]){
            message.error(types[item.type].placeholder);
            return;
        }
        this.props.callback(Object.assign({},this.state.item));
    };

    updateCallback = (res) => {
        let item = this.state.item;
        item.picUrl = res.data.url;
    };

    changeNoCharging = (e) => {
        this.change(e.target.checked,'noCharging');
    };


    changeEditerTabType=(value,name)=>{
        let item = JSON.parse(JSON.stringify(this.state.item));
        Object.keys(types).forEach((key)=>{
            let type = types[key].type;
            delete item[type];
        });
        this.setState({
            item: item
        },()=>{
            this.change(value,name);
        });
    };

    change = (value,name) => {
        let item = JSON.parse(JSON.stringify(this.state.item));
        item[name] = value;

        this.setState({
            item: item
        });
    };

    renderType(){
        let showType = this.state.item.type;
        return <div>
            {Object.keys(types).map((key,index)=>{
                let type = types[key].type;
                return <Input value={this.state.item[type]} style={{"display":showType.toString()===key?'block':'none'}} placeholder={types[key].placeholder} key={index} onChange={(e)=>{this.changeEditerTabType(e.target.value,type)}}/>
            })}
        </div>
    }

    render() {

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
                        <Select value={types[this.state.item.type].name} onChange={(value,e)=>{this.change(value,'type');}}>
                            {Object.keys(types).map((key) => {
                                return <Option value={key} key={key}>{types[key].name}</Option>;
                            })}
                        </Select>
                    </FormItem>

                    <FormItem
                        {...Util.tailFormItemLayout}>
                        {this.renderType()}
                    </FormItem>

                    <FormItem
                        label="是否计费"
                        {...Util.formItemLayout}>
                        <Checkbox onChange={this.changeNoCharging}>不计费</Checkbox>
                    </FormItem>
                    <FormItem {...Util.tailFormItemLayout}>
                        <Button htmlType="submit" type="primary">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Tab