import { message } from 'antd';
import axios from 'axios';
const Config = require('../../config');

let successBack = function(config,res){
    if(res.success){
        config.success && config.success(res);
    }else{
        if(res.msg && res.msg.indexOf('登陆')>-1){
            this.redirectLogin();
        }else if(res.msg){
            message.error(res.msg);
        }
    }
};

let request = function(config){
    if(!/:\/\//.test(config.url)){
        config.url = Config.apiHost+config.url;
    }
    config.method = config.method || 'GET';
    if(config.withCredentials===undefined){
        config.withCredentials = true;
    }
    config.headers = config.headers || {};
    config.headers['Content-Type']='text/plain';
    if(config.data && config.method.toUpperCase()==='GET'){
        config.params = config.data;
        delete config.data;
    }
    axios(config).then((res)=>{
        successBack.call(this,config,res.data);
    }).catch(function(error){
        message.error(error.message);
    })
};

export default request;