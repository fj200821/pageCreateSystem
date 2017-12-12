<style type="text/css">
    .tab-editer div{
        margin-top: 20px;
    }
    .tab-editer div:first-child{
        margin-top: 0;
    }

    .tab-editer div a{
        margin-left: 20px;
    }

    .tab-editer div img{
        width: 710px;
    }
</style>

<div class="tab-editer">
    <%if(items[0].type===6){%>
    <%for(var i=0;i<items[0].num;i++){%>
    <div>
        <a href="<%=(items[0].redirectUrl || 'javascript:;')%>" data-item="<%=encodeURIComponent(JSON.stringify(items[0]))%>" data-order="0" data-async="true"><img src="<%=items[0].picUrl%>"/></a>
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
