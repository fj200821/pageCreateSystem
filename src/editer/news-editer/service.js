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
                    url: pageHost + '/api/1.0/h5/collection/articles',
                    dataType: 'jsonp',
                    data:{
                        pageId:Gdata.id,
                        token: getMd5Str(),
                        tongdunTokenId: $tokenId,
                        back:decodeURIComponent(getQueryString('back'))
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.success) {
                            _hmt.push(['_trackEvent', 'newspage', 'page', 'literature']);
                            var str = '';
                            for (var i = 0; i < data.data.length; i++) {
                                if(data.data[i].type === '1') {
                                    str += "<div class='news-item'><div class='news-item-top'><img src='" + data.data[i].userAvatar + "' class='news-item-top-userpic'/><span class='news-item-top-user-name'>" + data.data[i].userName + "</span></div><div class='news-detail'>" + data.data[i].content + "</div><div class='news-footer'>点赞数：" + data.data[i].likesNum + "</div></div>";
                                }else if(data.data[i].type === '2') {
                                    if(data.data[i].creativeType === 4) {
                                        str += "<div class='news-ad-two'><a href='"+data.data[i].promoteUrl+"'><img class='news-ad-two-img' src='"+data.data[i].bannerUrl+"'/><div class='news-ad-two-detail'><p>"+data.data[i].name+"</p><div class='news-ad-two-footer'><span class='news-ad-two-tip'>广告</span></div></div><div class='clear'></div></a></div>";
                                    }else {
                                        str += "<div class='news-ad-one'><p>"+data.data[i].name+"</p><a href='"+data.data[i].promoteUrl+"'><img class='news-ad-one-img' src='"+data.data[i].bannerUrl+"'/></a><div class='news-ad-one-footer'><span class='news-ad-one-tip'>广告</span></div></div>";
                                    }
                                }

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
