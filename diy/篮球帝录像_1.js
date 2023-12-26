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
            let split = pdfh(it, 'a&&Text').split(" ");
            let date1 = pdfh(it, 'span&&Text').replace('月','').replace('日','').replace('24年','').replace('25年','').replace('26年','').replace('23年','').replace('22年','').replace('21年','').replace('20年','').replace('19年','').replace('18年','').replace('17年','').replace('16年','').replace('15年','');
            let Team1vsTeam2split = split[split.length-2];
            let Team1 = Team1vsTeam2split.split("vs")[0];
            let Team2 = Team1vsTeam2split.split("vs")[1];
            let Team1vsTeam2 = Team1vsTeam2split;
            // let Team1vsTeam2 = split[split.length-2] + '(' + date1 + ')';
            if (/十佳球/.test(pdfh(it, 'a&&Text'))) {
                d.push({
                    title: split[split.length-1],
                    desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
    				pic_url: 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E',
                    url: pd(it, 'a&&href')
                });
            } else if (/NBA/.test(pdfh(it, 'a&&Text'))) {
                if (/vs/.test(pdfh(it, 'a&&Text'))) {
                    if (/凯尔特人/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/BOS_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/雄鹿/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/MIL_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/76人/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/PHI_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/魔术/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/ORL_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/热火/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/MIA_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/尼克/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/NYK_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/骑士/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/CLE_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/步行者/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/IND_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/网/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/BKN_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/公牛/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/CHI_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/鹰/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/ATL_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/龙/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/TOR_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/黄蜂/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/CHA_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/奇才/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/WAS_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/活塞/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/DET_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/狼/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/MIN_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/金/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/DEN_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/雷霆/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/OKC_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/国王/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/SAC_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/独行侠/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/DAL_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/快船/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/LAC_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/鹈鹕/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/NOP_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/火箭/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/HOU_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/湖人/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/LAL_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/勇士/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/GSW_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/太阳/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/PHX_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/爵士/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/UTA_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/熊/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/MEM_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/开拓者/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/POR_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else if (/马刺/.test(Team2)) {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://res.nba.cn/media/img/teams/logos/SAS_logo.png',
                            url: pd(it, 'a&&href')
                        });
                    } else {
                        d.push({
                            title: Team1vsTeam2,
                            desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                            pic_url: 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E',
                            url: pd(it, 'a&&href')
                        });
                    }
                }
            } else if (/CBA/.test(pdfh(it, 'a&&Text'))) {
                d.push({
                    title: Team1vsTeam2,
                    desc: '20' + pdfh(it, 'span&&Text').replace('年','-').replace('月','-').replace('日',''),
                    pic_url: 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E',
                    url: pd(it, 'a&&href')
                });
            }
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
