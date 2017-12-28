let newsFun = function (options) {
    Zepto(function ($) {
        var parentNode = $('#'+ options.parentId);
        console.log('parentNode:', parentNode);
        var isFirst = true;
        //获取滚动条当前的位置
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }

        //获取当前可视范围的高度
        function getClientHeight() {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }
            else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        }

        //获取文档完整的高度
        function getScrollHeight() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
        window.onscroll = function () {
            if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                //ajax从这里开始
                $.ajax({
                    type: 'GET',
                    url: pageHost + '/api/public/spider/article/paging',
                    dataType: 'jsonp',
                    success: function (data) {
                        console.log(data);
                        if (data.success) {
                            _hmt.push(['_trackEvent', 'newspage', 'page', 'literature']);
                            var str = '';
                            for (var i = 0; i < data.data.length; i++) {
                                str += "<div class='news-item'><div class='news-item-top'><img src='" + data.data[i].userAvatar + "' class='news-item-top-userpic'/><span class='news-item-top-user-name'>" + data.data[i].userName + "</span></div><div class='news-detail'>" + data.data[i].content + "</div><div class='news-footer'>点赞数：" + data.data[i].likesNum + "</div></div>";
                            }
                            // $('.wrapper').append(str);
                            $(str).insertBefore('#' + options.scriptId);
                            if(isFirst) {
                                console.log('isFirst:',isFirst);
                                Gdata.sourceArr.forEach((item)=>{
                                    if(item.editer === 'news-editer') {
                                        $('body').append(item.loadingTpl);
                                    }
                                });
                            }
                        }
                        isFirst = false;
                    },
                    error: function (xhr, type) {
                        console.log('Ajax error!');
                    }
                });
            }
        };
    });
}
module.exports=newsFun;
