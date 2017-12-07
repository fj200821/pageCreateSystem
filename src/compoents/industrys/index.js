import React, {Component} from 'react';
import axios from 'axios';
import {Modal, Button, message,Tree} from 'antd';
const TreeNode = Tree.TreeNode;

let getData = function(){
    let config = {
        method:"GET",
        url:"//crm.adbaitai.com/api/op/public/tag/industry/get",
        withCredentials:true
    };
    if(window.location.href.indexOf('pre')>-1){
        config.url = '//crmpre.adbaitai.com/api/op/public/tag/industry/get';
    }
    axios(config).then((res)=>{
        if(res.data.success){
            this.setState({
                industrys:res.data.data
            },function(){
                getData = function(){
                    this.setState({
                        industrys:res.data.data
                    })
                }
            })
        }else if(res.data.msg){
            message.error(res.msg);
        }
    }).catch((error)=>{
        message.error(error.message);
    })
}

class Industrys extends Component{
    constructor(props){
        super(props);
        this.state = {
            industrys:[],
            visible:false,
            selectedIndustrys:props.selectedIndustrys || []
        };
    }
    componentWillMount(){
        getData.call(this);
    }

    renderTreeNodes(industrys){
        return industrys.map((industry)=>{
            if(industry.children) {
                return (
                    <TreeNode title={industry.name} key={industry.code}>
                        {this.renderTreeNodes(industry.children)}
                    </TreeNode>
                )
            }else{
                return (<TreeNode title={industry.name} key={industry.code}/>)
            }
        })
    }

    handleIndustrys(values){
        this.setState({
            selectedIndustrys:values
        });
    }

    handleOk=()=>{
        this.props.callback(this.state.selectedIndustrys);
        this.toggle();
    }


    toggle=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }

    render(){
        return <div>
            <Modal
                title="选择类目"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.toggle}
            >
                <Tree
                    checkable
                    onCheck={(values)=>{this.handleIndustrys(values)}}
                    checkedKeys={this.state.selectedIndustrys}
                >
                    <TreeNode title="全类目" key="0000">
                        {this.renderTreeNodes(this.state.industrys)}
                    </TreeNode>
                </Tree>
            </Modal>
            <a href="javascript:;" onClick={this.toggle}>{this.props.children}</a>
        </div>
    }
}
export default Industrys;