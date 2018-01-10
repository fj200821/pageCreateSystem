<style type="text/css">
  .news-item {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .news-item-top {
    height: 70px;
  }
  .news-item-top-userpic {
    width: 60px;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  .news-item-top-user-name {
    color: #666666;
    float: left;
    font-weight: 700;
    font-size: 29px;
    padding-top: 12px;
    padding-left: 15px;
  }
  .news-detail {
    color: #333333;
    font-size: 34px;
    line-height: 47px;
  }
  .news-footer {
    color: #999999;
    font-size: 28px;
    width: 100%;
    padding-top: 10px;
  }
  .news-ad-one,.news-ad-two {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .news-ad-one p {
    color: #333333;
    font-size: 34px;
    margin: 0;
    padding-bottom: 0.2rem;
  }
  .news-ad-one .news-ad-one-img {
    width: 100%;
    height: auto;
  }
  .news-ad-one a {
    display: block;
  }
  .news-ad-one-footer {
    height: 40px;
    width: 100%;
    position: relative;
    margin-top: 22px;
  }
  .news-ad-one-footer .news-ad-one-tip {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size:28px;
    padding: 1px 15px;
    text-align: center;
    border-radius: 10px;
    background-color: #d8d8d8;
  }
  .news-ad-two a {
    color: #333;
    font-size: 0.34rem;
    display: block;
    position: relative;
  }
  .news-ad-two-img {
    width: 220px;
    height: auto;
    float: left;
  }
  .news-ad-two-detail {
    float: right;
    width: 65%;
  }
  .news-ad-two-detail p {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
     line-height: 0.5rem;
     margin: 0;
  }
  .news-ad-two-detail .news-ad-two-footer {
    width: 100%;
    margin-top: 30px;
  }
  .news-ad-two-detail .news-ad-two-footer .news-ad-two-tip {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #fff;
    font-size:28px;
    padding: 1px 15px;
    text-align: center;
    border-radius: 10px;
    background-color: #d8d8d8;
  }
  .clear {
   clear: both;
  }
</style>
<%for(var i=0;i<items.length;i++){%>
<%if(items[i].data){%>
<%for(var j=0; j< items[i].data.length; j++){%>
<div class='news-item'>
     <div class='news-item-top'>
        <img src='<%=items[i].data[j].userAvatar%>' class='news-item-top-userpic'/>
        <span class='news-item-top-user-name'><%=items[i].data[j].userName%></span>
     </div>
     <div class='news-detail'><%=items[i].data[j].content%></div>
     <div class='news-footer'>
        点赞数：<%=items[i].data[j].likesNum%>
     </div>
</div>
<%}%>
<%}else{%>
<div class='news-item'>
     <div class='news-item-top'>
        <img src='<%=items[i].userAvatar%>' class='news-item-top-userpic'/>
        <span class='news-item-top-user-name'><%=items[i].userName%></span>
     </div>
     <div class='news-detail'><%=items[i].content%></div>
     <div class='news-footer'>
        点赞数：<%=items[i].likesNum%>
     </div>
</div>
<div class='news-ad-one'>
    <p>十九大后习近平对中国经济给出这8大论断。</p>
    <a href='http://www.baidu.com'>
        <img class='news-ad-one-img' src='//ww1.sinaimg.cn/large/005QDhBjgy1fna6q0dv7yj30j604ggnv.jpg'/>
    </a>
    <div class='news-ad-one-footer'>
        <span class='news-ad-one-tip'>广告</span>
    </div>
</div>

<div class='news-ad-two'>
    <a href=''>
        <img class='news-ad-two-img' src='http://ww1.sinaimg.cn/large/005QDhBjgy1fna7mb7avrj306404ggls.jpg'/>
        <div class='news-ad-two-detail'>
            <p>十九大后习近平对中国经济给出这8大十九大后习近平对中国经济给出这8大</p>
            <div class='news-ad-two-footer'>
                 <span class='news-ad-two-tip'>广告</span>
            </div>
        </div>
        <div class='clear'></div>
    </a>
</div>
<%}%>
<%}%>

