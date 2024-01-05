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
    // 推荐:'.list-group .list-group-item;.media-heading a&&Text;.img-responsive&&src;.media-body span&&Text;.media-heading a&&href',
    推荐:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var html=request(input);
        var tabs=pdfa(html,'.list-group&&.list-group-item');
        tabs.forEach(function(it){
            // 通过" "进行截取
            let split = pdfh(it, '.media-heading&&Text').split(" ");
            
            // 一级标题
            let title1 = split[2].replace('vs', '🆚').replace('VS', '🆚');
            // 一级描述
            let desc1 = split[0] + ' ' + split[1];
            // 一级图片URL
            let picUrl1 = pd(it,'.media-object&&src');
            // 一级URL
            let url1 = pd(it, '.media-heading a&&href');
            
            items.push({
                desc:desc1,
                title:title1,
                pic_url:picUrl1,
                url:url1
            }
        )});
        setResult(items);
    `,
    // 一级:'.list-group .list-group-item;.media-heading a&&Text;.img-responsive&&src;.media-body span&&Text;.media-heading a&&href',
    一级:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var html=request(input);
        var tabs=pdfa(html,'.list-group&&.list-group-item');
        tabs.forEach(function(it){
            // 通过" "进行截取
            let split = pdfh(it, '.media-heading&&Text').split(" ");
            
            // 一级标题
            let title1 = split[2].replace('vs', '🆚').replace('VS', '🆚');
            // 一级描述
            let desc1 = split[0] + ' ' + split[1];
            // 一级图片URL
            let picUrl1 = pd(it,'.media-object&&src');
            // 一级URL
            let url1 = pd(it, '.media-heading a&&href');
            
            items.push({
                desc:desc1,
                title:title1,
                pic_url:picUrl1,
                url:url1
            }
        )});
        setResult(items);
    `,
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
