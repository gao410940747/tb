var rule = {
    title:'篮球帝录像',
    host:'https://www.lanqiudi.com',
    编码:'gbk',
    搜索编码:'gbk',
    homeUrl: '/a/nbalx/list_175_1.html',//网站的首页链接,用于分类获取和推荐获取
    url:'/a/fyclass_fypage.html',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'NBA录像&NBA集锦&NBA新闻&NBA十佳球&CBA录像&CBA集锦',
    class_url:'nbalx/list_175&nbajijin/list_18&news/list_177&top/list_23&cbalx/list_180&cbajijin/list_215',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    lazy:`js:
        let pid = input.replace("https://weibo.com/5861424034/","").replace("https://weibo.com/1883881851/","");
        let html = 'https://weibo.com/ajax/statuses/show?id=' + pid + '&locale=zh-CN';
        input = JSON.parse(request(html)).page_info.media_info.mp4_hd_url;
    `,
    limit:6,
    double:false,
    推荐:'*',
//    一级:'.list_body li;a&&Text;*;span&&Text;a&&href',
	一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.list_body&&li');
		list.forEach(it => {
			d.push({
				title: pdfh(it, 'a&&Text').split(" ")[1],
				desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
//				if (/凯尔特人/.test(pdfh(it, 'a&&Text').split(" ")[1].split("vs")[1])) {pic_url: 'https://res.nba.cn/media/img/teams/logos/BOS_logo.png',}
//				pic_url: 'https://res.nba.cn/resource/mat1/chinanba/images/nbalogo/nba-icon.png?20220224',
				url: pd(it, 'a&&href')

			});
		})
		setResult(d);
	`,
    二级:{
        title:'.Content-top h2&&Text',
        img:'*',
        desc:'',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.Content-body p:gt(1)',
        list_text:'a&&Text',
        list_url:'a&&href'
    },
    搜索:'',
}
