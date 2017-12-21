<style type="text/css">
  .news-item {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
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
    font-size: 25px;
    padding-top: 16px;
    padding-left: 15px;
  }
  .news-detail {
    color: #333333;
    font-size: 28px;
    line-height: 38px;
  }
  .news-footer {
    color: #999999;
    font-size: 22px;
    width: 100%;
    padding-top: 10px;
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
<%}%>
<%}%>

