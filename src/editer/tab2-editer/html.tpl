<style type="text/css">
    .tab2-editer {
        width: 100%;
        height: auto;
    }
    .tab2-editer .tab2-editer-item a {
        display: block;
        width: 100%;
    }
    .tab2-editer .tab2-editer-item a img {
        width: 100%;
        height: auto;
        text-decoration:none;
    }
</style>

<%for(var i=0;i<items.length;i++){%>
<div class='tab2-editer'>
    <div class='tab2-editer-item'>
         <a href='<%=(items[i].redirectUrl || 'javascript:;')%>'>
            <img src='<%=items[i].picUrl%>'/>
         </a>
    </div>
</div>
<%}%>