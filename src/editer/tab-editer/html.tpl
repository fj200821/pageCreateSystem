<%if(items[0].type===0){%>
<%for(var i=0;i<items[0].num;i++){%>
<div style="text-align: center;">
    <a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
</div>
<%}%>
<%}%>

<%if(items[0].type===1){%>
<div style="text-align: center;">
<a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
</div>
<%}%>

<%if(items[0].type===2){%>
<div style="text-align: center;">
<a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
</div>
<%}%>
