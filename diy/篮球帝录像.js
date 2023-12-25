var rule = {
    title:'篮球帝录像',
    host:'https://m.lanqiudi.com',
    编码:'gbk',
    搜索编码:'gbk',
    homeUrl: '/a/nbalx/list_175_1.html',//网站的首页链接,用于分类获取和推荐获取
    url:'/a/fyclass/list_175_fypage.html',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'NBA录像&NBA集锦&NBA新闻&NBA十佳球',
    class_url:'nbalx&nbajijin&news&top',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    limit:6,
    double:false,
    推荐:'.list .lite;a&&Text;;span&&Text;a&&href',
    一级:'.list .lite;a&&Text;;span&&Text;a&&href',
    二级:{
        title:'a&&Text',
        img:'',
        desc:'',
        content:'h1&&Text',
        tabs:'',
        tab_text:'',
        lists:'.signals p:gt(1)',
        list_text:'a&&Text',
        list_url:'a&&href'
    },
    二级访问前:'log(MY_URL);MY_URL=MY_URL.replace("5861424034","status")',
//    二级:`js:
//		pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
//        var d = [];
//        let list = pdfa(html, '.signals');
//        list.forEach(it => {
//            d.push({
//                title: pdfh(it, "a&&Text"),
////                pic_url: pd(it, ".Xw5Zorxg&&src"),
//                desc: pdfh(it, 'h1&&Text'),
//                url: pd(it, 'a&&href').replace('5861424034','status');
//            });
//        })
//        setResult(d);
//    `
    搜索:'',
}
