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
    class_name:'NBA录像&NBA集锦&NBA十佳球&CBA录像&CBA集锦',
    class_url:'nbalx/list_175&nbajijin/list_18&top/list_23&cbalx/list_180&cbajijin/list_215',
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
//    推荐:'*',
//    一级:'.list_body li;a&&Text;*;span&&Text;a&&href',
	一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.list_body&&li');
		list.forEach(it => {
            // 二级标题
            let title1;
            // 二级描述
            let desc1 = '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日','');
            // 二级图片URL
            let picUrl1;
            // 二级URL
            let url1 = pd(it, 'a&&href');

            // 通过" "进行截取
            let split = pdfh(it, 'a&&Text').split(" ");

            // NBA十佳球、五佳球
            if (/十佳球/.test(pdfh(it, 'a&&Text')) || /五佳球/.test(pdfh(it, 'a&&Text'))) {
                title1 = split[split.length-1];
                picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
            }
            // NBA录像、NBA集锦
            else if (/NBA/.test(pdfh(it, 'a&&Text'))) {
                // 若包含客队vs主队信息
                if (/vs/.test(pdfh(it, 'a&&Text'))) {
                    // 客队vs主队
                    let Team1vsTeam2 = split[split.length-2];
                    // 客队名称
                    let Team1 = Team1vsTeam2.split("vs")[0];
                    // 主队名称
                    let Team2 = Team1vsTeam2.split("vs")[1];
                    // 封装球队LOGO麦普
                    var TeamLogoMap = {
                        "凯尔特人": "https://res.nba.cn/media/img/teams/logos/BOS_logo.png",
                        "雄鹿": "https://res.nba.cn/media/img/teams/logos/MIL_logo.png",
                        "76人": "https://res.nba.cn/media/img/teams/logos/PHI_logo.png",
                        "魔术": "https://res.nba.cn/media/img/teams/logos/ORL_logo.png",
                        "热火": "https://res.nba.cn/media/img/teams/logos/MIA_logo.png",
                        "尼克斯": "https://res.nba.cn/media/img/teams/logos/NYK_logo.png",
                        "骑士": "https://res.nba.cn/media/img/teams/logos/CLE_logo.png",
                        "步行者": "https://res.nba.cn/media/img/teams/logos/IND_logo.png",
                        "篮网": "https://res.nba.cn/media/img/teams/logos/BKN_logo.png",
                        "公牛": "https://res.nba.cn/media/img/teams/logos/CHI_logo.png",
                        "老鹰": "https://res.nba.cn/media/img/teams/logos/ATL_logo.png",
                        "猛龙": "https://res.nba.cn/media/img/teams/logos/TOR_logo.png",
                        "黄蜂": "https://res.nba.cn/media/img/teams/logos/CHA_logo.png",
                        "奇才": "https://res.nba.cn/media/img/teams/logos/WAS_logo.png",
                        "活塞": "https://res.nba.cn/media/img/teams/logos/DET_logo.png",
                        "森林狼": "https://res.nba.cn/media/img/teams/logos/MIN_logo.png",
                        "掘金": "https://res.nba.cn/media/img/teams/logos/DEN_logo.png",
                        "雷霆": "https://res.nba.cn/media/img/teams/logos/OKC_logo.png",
                        "国王": "https://res.nba.cn/media/img/teams/logos/SAC_logo.png",
                        "独行侠": "https://res.nba.cn/media/img/teams/logos/DAL_logo.png",
                        "快船": "https://res.nba.cn/media/img/teams/logos/LAC_logo.png",
                        "鹈鹕": "https://res.nba.cn/media/img/teams/logos/NOP_logo.png",
                        "火箭": "https://res.nba.cn/media/img/teams/logos/HOU_logo.png",
                        "湖人": "https://res.nba.cn/media/img/teams/logos/LAL_logo.png",
                        "勇士": "https://res.nba.cn/media/img/teams/logos/GSW_logo.png",
                        "太阳": "https://res.nba.cn/media/img/teams/logos/PHX_logo.png",
                        "爵士": "https://res.nba.cn/media/img/teams/logos/UTA_logo.png",
                        "灰熊": "https://res.nba.cn/media/img/teams/logos/MEM_logo.png",
                        "开拓者": "https://res.nba.cn/media/img/teams/logos/POR_logo.png",
                        "马刺": "https://res.nba.cn/media/img/teams/logos/SAS_logo.png"
                    };
                    title1 = Team1vsTeam2;
                    if (TeamLogoMap[Team2] != null) {
                        // 通过主队名称获取球队LOGO
                        picUrl1 = TeamLogoMap[Team2];
                    } else if (TeamLogoMap[Team1] != null) {
                        // 通过客队名称获取球队LOGO
                        picUrl1 = TeamLogoMap[Team1];
                    } else {
                        // 若主队客队LOGO都不存在，则使用默认LOGO
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                }
            }
            // CBA录像、CBA集锦
            else if (/CBA/.test(pdfh(it, 'a&&Text'))) {
                // 若包含球队vs信息
                if (/vs/.test(pdfh(it, 'a&&Text'))) {
                    // 客队vs主队
                    let Team1vsTeam2 = split[split.length-2];
                    title1 = Team1vsTeam2;
                    picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                }
            }
            // 封装对象
            d.push({
                title: title1,
                desc: desc1,
                pic_url: picUrl1,
                url: url1
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
//    二级:{
//        title:'.Content-top h2&&Text',
//        img:'*',
//        desc:'',
//        content:'',
//        tabs:`js:
//            TABS = [];
//            TABS.push("微博线路");
//            TABS.push("其他线路");
//        `,
//        lists:`js:
//            log(TABS);
//            pdfh = jsp.pdfh;
//            pdfa = jsp.pdfa;
//            pd = jsp.pd;
//            LISTS = [];
//            let list = pdfa(html, '.Content-body');
//            TABS.forEach(function(tab) {
//                if (/微博线路/.test(tab)) {
//                    if (/微博/.test(pdfh(it, 'a&&Text'))) {
//                        list.forEach(it => {
//                            d.push({
//                                title: pdfh(it, 'a&&Text'),
//                                url: pd(it, 'a&&href')
//                            });
//                        })
//                        LISTS.push(d)
//                    }
//                } else if (/其他线路/.test(tab)) {
//                    if (/微博/.test(pdfh(it, 'a&&Text'))) {
//                    } else {
//                        list.forEach(it => {
//                            d.push({
//                                title: pdfh(it, 'a&&Text'),
//                                url: pd(it, 'a&&href')
//                            });
//                        })
//                        LISTS.push(d)
//                    }
//                }
//            });
//        `,
//    },
    // 二级: `js:
	// 	pdfh = jsp.pdfh;
	// 	pdfa = jsp.pdfa;
	// 	pd = jsp.pd;
	// 	var d = [];
	// 	var html = request(input);
	// 	var list = pdfa(html, '.Content-body&&p');
	// 	list.forEach(it => {
	// 	    if (/微博/.test(pdfh(it, 'a&&Text'))) {
    //             if (/第一节/.test(pdfh(it, 'a&&Text'))) {
    //                 d.push({
    //                     title: '[微博]第一节',
    //                     url: pd(it, 'a&&href')
    //                 });
    //             } else if (/第二节/.test(pdfh(it, 'a&&Text'))) {
    //                 d.push({
    //                     title: '[微博]第二节',
    //                     url: pd(it, 'a&&href')
    //                 });
    //             } else if (/第三节/.test(pdfh(it, 'a&&Text'))) {
    //                 d.push({
    //                     title: '[微博]第三节',
    //                     url: pd(it, 'a&&href')
    //                 });
    //             } else if (/第四节/.test(pdfh(it, 'a&&Text'))) {
    //                 d.push({
    //                     title: '[微博]第四节',
    //                     url: pd(it, 'a&&href')
    //                 });
    //             }
	// 	    } else {
    //             d.push({
    //                 title: pdfh(it, 'h2&&Text'),
    //                 url: pd(it, 'a&&href')
    //             });
	// 	    }
	// 	})
	// 	setResult(d);
	// `,
    搜索:'',
}
