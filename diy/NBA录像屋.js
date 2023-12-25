var rule = {
    title:'NBA录像屋',
    host:'https://www.nbaluxiangwu.com',
    url: '/page_fypage',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'NBA录像',
    class_url:'/',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,

    // lazy代码:源于海阔香雅情大佬 / 小程序：香情影视 https://pastebin.com/L4tHdvFn
    lazy:`js:
        input = request('https://t1.qlplayer.cyou/player/?url=' + input);
	`,
    // lazy:'js:let purl=jsp.pdfh(request(input),"iframe&&src");input={jx:0,url:purl,parse:1}',
    // lazy:"js:let html=request(input);input=jsp.pd(html,'.embed-responsive&&iframe&&src')",
    // lazy:'js:input=input.replace("www.qingting.fm/radios/","lhttp.qingting.fm/live/")+"/64k.mp3"',
    limit:6,
    double:false,
    一级:'.jzjianshu-box .post_list_li;h2&&Text;img&&src;.f_l span&&Text;i a&&href',
    二级:{
        title:'.news_title&&Text',
        img:'.news_con img&&src',
        desc:'',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.news_con p',
        list_text:'a&&Text',
        // "重定向": "js:let url = request(url);log('重定向到:'+url);html = request(url)",
        list_url:'a&&href'
    },
    // 重定向:'js:input = request(input)',
    搜索:'',
}
