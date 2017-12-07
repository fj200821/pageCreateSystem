<style>
    .two-tab-editer{
        margin-left: 18px;
    }

    .two-tab-editer a{
        display:inline-block;width:347px;height:340px;float:left;margin-left: 17px;
    }
    .two-tab-editer a:first-child{
        margin-left: 0;
    }
    .two-tab-editer a img{
        width: 100%;
        height: 100%;
    }
</style>
<div class="two-tab-editer clearfix">
    <a class="block" href="javascript:;">
        <img src="<%=items[0].imgUrl%>"/>
    </a>
    <a class="block" href="javascript:;">
        <img src="<%=items[1].imgUrl%>"/>
    </a>
</div>