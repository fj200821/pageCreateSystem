<%if(items[0].type===0){%>
<%for(var i=0;i<items[0].num;i++){%>
<a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
<%}%>
<%}%>

<%if(items[0].type===1){%>
<a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
<%}%>

<%if(items[0].type===2){%>
<a href="javascript:;"><img src="<%=items[0].imgUrl%>"/></a>
<%}%>
