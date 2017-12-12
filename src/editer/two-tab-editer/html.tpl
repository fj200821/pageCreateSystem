<style>
    .two-tab-editer {
        margin-left: 18px;
    }

    .two-tab-editer a {
        display: inline-block;
        width: 347px;
        height: 340px;
        float: left;
        margin-left: 18px;
    }

    .two-tab-editer a:first-child {
        margin-left: 0;
    }

    .two-tab-editer a img {
        width: 100%;
        height: 100%;
    }
</style>
<div class="two-tab-editer clearfix">
    <a class="block" href="<%=(items[0].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[0].picUrl%>"/>
    </a>
    <a class="block" href="<%=(items[1].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[1].picUrl%>"/>
    </a>
</div>