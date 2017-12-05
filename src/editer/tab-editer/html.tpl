<%data.forEach(function(item){%>
<a href="javascript:;" data-info="<%=encodeURIComponent(JSON.stringify(item))%>"><img src="<%=item.imgUrl%>"/></a>
<%})%>