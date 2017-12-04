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
        let icons = [];
        window.onMessage('renderEditerIcon',(icon)=>{
            icons.push(icon);
            this.setState({
                icons:icons
            },()=>{
                icons=this.state.icons;
            })
        })
    }

    render(){
        return <div className="icons">
            {this.state.icons.map((icon,key)=>{
                return <div className="icon">{icon}</div>;
            })}
        </div>
    }
}

export default Page;