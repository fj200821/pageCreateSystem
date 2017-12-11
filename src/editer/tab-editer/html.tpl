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
    <%if(items[0].type===6){%>
    <%for(var i=0;i<items[0].num;i++){%>
    <div>
        <a href="javascript:;" class="J_skip" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0" data-async="true"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>
    <%}%>

    <%if(items[0].type===1){%>
    <div>
        <a href="javascript:;" class="J_skip" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>

    <%if(items[0].type===2){%>
    <div>
        <a href="javascript:;" class="J_skip" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0"><img src="<%=items[0].picUrl%>"/></a>
    </div>
    <%}%>
</div>
