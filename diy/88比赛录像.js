var rule = {
    title:'88比赛录像',
    host:'http://www.88kanqiu.one/replay',
    // 发布页：www.88kq.net
    // 主节点：www.88kanqiu.one
    // 备用节点：www.88kanqiu.dog/  www.88kanqiu.lol/  www.88kanqiu.love/  www.88kanqiu.org/  www.88kanqiu.win/  www.popozhibo.cc/  www.popozhibo.net/
    url:'/match/fyclass/replay',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_parse:'.nav-pills li;a&&Text;a&&href;/match/(\\d+)/replay',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    limit:6,
    double:false,
    推荐:'.list-group .list-group-item;.media-heading a&&Text;.img-responsive&&src;.media-body span&&Text;.media-heading a&&href',
    一级:'.list-group .list-group-item;.media-heading a&&Text;.img-responsive&&src;.media-body span&&Text;.media-heading a&&href',
    二级:{
        title:'.breadcrumb h3&&Text',
        img:'.col-md-9 div:eq(3)&&src',
        desc:'',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.col-md-9 p:gt(0)',
        list_text:'a&&Text',
        list_url:'a&&href'
    },
    搜索:'',
}
