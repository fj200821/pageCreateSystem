let tools = {
    getQueryString: (name)=> {
        var queryJson = {};
        var search = window.location.search;
        search = search.replace(/^\?/,'');
        var fields = search.split('&');
        fields && fields.forEach(function(field){
            var arr = field.split('=');
            queryJson[arr[0]] = arr[1];
        });
        return queryJson[name];
    }
}

export default tools;