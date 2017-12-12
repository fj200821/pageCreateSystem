<style>
    .three-tab-editer{
        margin-left: 18px;
    }

    .three-tab-editer a{
        display:inline-block;width:231px;height:221px;float:left;margin-left: 9px;
    }

    .three-tab-editer a:first-child{
        margin-left: 0;
    }

    .three-tab-editer a img{
        width: 100%;
        height: 100%;
    }
</style>
<div class="three-tab-editer clearfix">
    <a href="<%=(items[0].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[0].picUrl%>"/>
    </a>
    <a href="<%=(items[1].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[1].picUrl%>"/>
    </a>
    <a href="<%=(items[2].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[2].picUrl%>"/>
    </a>
</div>