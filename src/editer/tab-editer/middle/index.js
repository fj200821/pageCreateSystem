import React, {Component} from 'react';
import { Form } from 'antd';
class MiddleTest extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            // item:props.item,
            // num:props.num,
            // tab: props.tab,
            // callback: props.callback
        }
    }

    // componentWillReceiveProps(nextProps){
    //     var prop = {};
    //     Object.keys(nextProps).forEach(function(key){
    //         prop[key] = nextProps[key];
    //     });
    //     this.setState(prop)
    // }

    render(){
        console.log(this.props.a);
        console.log(this.props)
        let Temp = this.props.tab;
        return <div>
            <Temp options={this.props}/>
        </div>
    }
}
export default MiddleTest;