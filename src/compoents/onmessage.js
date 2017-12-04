window.onMessage = function(name,callback){
    let msgs = window.onMessage[name] = window.onMessage[name] || [];
    msgs.push(callback);
};

window.sendMessage = function(name,param,callback){
    let msgs = window.onMessage[name] || [];
    msgs.forEach(function(msg){
        msg(param,callback || function(){});
    })
};