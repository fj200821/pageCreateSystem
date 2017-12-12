import {
    Spin
} from 'antd';
require('./index.less');
import React, {Component} from 'react';

class Loading extends Component{
    constructor(props){
        super(props);
        this.state={
            showLoading:true
        };
        window.onMessage('toggleLoading',()=>{
            this.setState({
                showLoading:!this.state.showLoading
            })
        })
    }

    render(){
        return <Spin className='m-loading' style={{"display":this.state.showLoading?'block':'none'}}/>
    }
}


export default Loading;