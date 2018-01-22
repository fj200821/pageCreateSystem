<style>
    .one-tab-editer {
        width: 100%;
    }

    .one-tab-editer a {
        display: block;
        width: 100%;
        height: auto;
    }

    .one-tab-editer a img {
        width: 100%;
        height: auto;
        display: block;
    }
</style>
<div class="one-tab-editer">
    <a class="block" href="<%=(items[0].redirectUrl || 'javascript:;')%>">
        <img src="<%=items[0].picUrl%>"/>
    </a>
</div>