<style type="text/css">
    .tab-editer div{
        margin-top: 20px;
    }
    .tab-editer div:first-child{
        margin-top: 0;
    }

    .tab-editer div a{
        margin-left: 20px;
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;
    }

    .tab-editer div img{
        width: 710px;
    }
    .tab-editer .item-detail {
        width: 100%;
        height: 80px;
        margin-top: 0;
        background-color: #fff;
        margin-top: -34px;
    }
    .tab-editer .item-detail .item-detail-left {
        color: rgb(121,121,121);
        line-height: 80px;
        padding-left: 20px;
        float:left;
        font-size: 30px;
    }
    .tab-editer .item-detail .item-detail-right {
        width: 200px;
        float:right;
        height: 80px;
        line-height: 80px;
        margin-top: 0;
        padding-right: 20px;
    }
    .tab-editer .item-detail .item-detail-right img {
        width: 100%;
        height: auto;
        margin-top: 10px;
    }
</style>

<div class="tab-editer">
    <%if(items[0].type===6){%>
    <%for(var i=0;i<items.length;i++){%>
    <div>
        <a href="<%=(items[i].redirectUrl || 'javascript:;')%>" data-item="<%=encodeURIComponent(JSON.stringify(items[i]))%>" data-order="0" data-async="true">
            <img src="<%=items[i].picUrl%>"/>
            <%if(items[i].title){%>
            <div class='item-detail'>
                <div class='item-detail-left'><%=items[i].title%></div>
                <div class='item-detail-right'>
                    <img src='//oss.ltcdn.cc/game/Images/mofangbtn.png'/>
                </div>
            </div>
            <%}%>
        </a>
    </div>
    <%}%>
    <%}%>

    <%if(items[0].type===5){%>
    <div>
        <a href="<%=(items[0].redirectUrl || 'javascript:;')%>" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>

    <%if(items[0].type===3){%>
    <div>
        <a href="<%=(items[0].redirectUrl || 'javascript:;')%>" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>
</div>
