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
        });
        window.onMessage('pushSource', function(obj){
            let isHave = false;
            Gdata.sourceArr.forEach((item)=>{
                if(item.editer === obj.editer) {
                    item.num ++;
                    isHave =true;
                    return;
                }
            })
            if(!isHave){
                obj.num = 1;
                Gdata.sourceArr.push(obj);
            }
        });
    }

    render(){
        return <div className="icons">
            {this.state.icons.map((icon,key)=>{
                return <div className="icon" style={{display:'block',float:'left'}} key={key}>{icon}</div>;
            })}
        </div>
    }
}

export default Page;