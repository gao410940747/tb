var rule = {
    title:'88看球',
    host:'http://www.88kanqiu.one',
    // 发布页：www.88kq.net
    // 主节点：www.88kanqiu.one
    // 备用节点：www.88kanqiu.dog/  www.88kanqiu.lol/  www.88kanqiu.love/  www.88kanqiu.org/  www.88kanqiu.win/  www.popozhibo.cc/  www.popozhibo.net/
    url:'/match/fyclass/live',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_parse:'.nav-pills li;a&&Text;a&&href;/match/(\\d+)/live',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:10000,
    play_parse:true,
    lazy:'',
    limit:6,
    double:false,
    // 推荐:'*',
    推荐:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var html=request(input);
        var tabs=pdfa(html,'.list-group&&.group-game-item');
        tabs.forEach(function(it){
            // 通过" "进行截取
            let split = pdfh(it, '.d-none&&Text').split(" ");
            
            // 一级标题
            let title1 = split[2] + '🆚' + split[4];
            // 一级描述
            let desc1 = split[0] + ' ' +  split[1] + ' ' + pdfh(it, '.btn&&Text');
            // 一级图片URL
            let picUrl1 = pd(it,'.team-logo&&src');
            // 一级URL
            let url1 = pd(it, '.btn&&href');
            
            items.push({
                desc:desc1,
                title:title1,
                pic_url:picUrl1,
                url:url1
            }
        )});
        setResult(items);
    `,
    // 一级:'.list-group .group-game-item;.d-none&&Text;.team-logo&&src;.btn&&Text;.btn&&href',
    一级:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var html=request(input);
        var tabs=pdfa(html,'.list-group&&.group-game-item');
        tabs.forEach(function(it){
            // 通过" "进行截取
            let split = pdfh(it, '.d-none&&Text').split(" ");
            
            // 一级标题
            let title1 = split[2] + '🆚' + split[4];
            // 一级描述
            let desc1 = split[0] + ' ' + pdfh(it, '.btn&&Text');
            // 一级图片URL
            let picUrl1 = pd(it,'.team-logo&&src');
            // 一级URL
            let url1 = pd(it, '.btn&&href');
            
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
	    "title":".game-info-container&&Text;.customer-navbar-nav li&&Text",
	    "img":".team-logo&&src",
	    "desc":";;;div.team-name:eq(0)&&Text;div.team-name:eq(1)&&Text",
	    "content":"div.game-time&&Text",
	    "tabs":"js:TABS=['88看球']",
	    // "lists":"js:LISTS=[];input=input+'-url';let html=request(input);let data=JSON.parse(html);TABS.forEach(function(tab){let m3u=data;let d=m3u.map(function(it){return it.name+'$'+play_url+it.url});LISTS.push(d)});"
	    "lists":"js:LISTS=[];input=input+'-url';let html=request(input);let data=JSON.parse(html);TABS.forEach(function(tab){let m3u=data.links;let d=m3u.map(function(it){return it.name+'$'+it.url});LISTS.push(d)});"
	},
    搜索:'',
}
