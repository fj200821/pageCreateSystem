<style type="text/css">
    .tab-editer div{
        text-align: center;
        margin-top: 20px;
    }
    .tab-editer div:first-child{
        margin-top: 0;
    }
</style>

<div class="tab-editer">
    <%if(items[0].type===0){%>
    <%for(var i=0;i<items[0].num;i++){%>
    <div>
        <a href="javascript:;"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>
    <%}%>

    <%if(items[0].type===1){%>
    <div>
        <a href="javascript:;"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>

    <%if(items[0].type===2){%>
    <div>
        <a href="javascript:;"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>
</div>
