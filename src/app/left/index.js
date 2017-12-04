import React, {Component} from 'react';
import { Icon} from 'antd';


class Page extends Component{
    constructor(props){
        super(props);
        this.state={
            icons:[]
        };
        this.onMessage();
    }

    onMessage(){
        window.onMessage('renderEditerIcon',(icon)=>{
            let icons = JSON.parse(JSON.stringify(this.state.icons));
            icons.push(icon);
            this.setState({
                icons:icons
            })
        })
    }

    render(){
        return <div>
            {this.state.icons.map((icon,key)=>{
                return icon;
            })}
        </div>
    }
}

export default Page;