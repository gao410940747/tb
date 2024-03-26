var rule = {
    title:'体育录像',
    host:'http://www.88kanqiu.one',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    // class_name:'篮球屋录像&NBA录像&NBA集锦&NBA十佳球&CBA录像&CBA集锦&其他篮球录像&直播吧视频&88比赛录像',
    // class_url:'lanqiuwu&nbalx&nbajijin&nbatop10&cbalx&cbajijin&lanqiulx&zhibo8&88replay',
    // class_parse:'.nav-pills li;a&&Text;a&&href;/match/(\\d+)/replay',
    class_name:'88比赛录像&篮球屋&i体育&点播源&直播吧&CCTV5直播吧',
    class_url:'88replay&lanqiuwu&itiyu&vod&zhibo8&cctv5zhibo',
    filterable: 1,
    filter_url: '{{fl.cateId}}',
    filter: {
        "88replay":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"全部"},{"n":"NBA","v":"1"},{"n":"CBA","v":"2"},{"n":"篮球综合","v":"4"},{"n":"足球世界杯","v":"3"},{"n":"英超","v":"8"},{"n":"西甲","v":"9"},{"n":"意甲","v":"10"},{"n":"欧冠","v":"12"},{"n":"欧联","v":"13"},{"n":"德甲","v":"14"},{"n":"法甲","v":"15"},{"n":"欧国联","v":"16"},{"n":"足总杯","v":"27"},{"n":"国王杯","v":"33"},{"n":"中超","v":"7"},{"n":"亚冠","v":"11"},{"n":"足球综合","v":"23"},{"n":"欧协联","v":"28"},{"n":"美职联","v":"26"},{"n":"网球","v":"29"},{"n":"斯诺克","v":"30"},{"n":"MLB","v":"38"},{"n":"UFC","v":"32"},{"n":"NFL","v":"25"}]}],
        "lanqiuwu":[{"key":"cateId","name":"分类","value":[{"n":"NBA录像","v":"nbalx"},{"n":"NBA集锦","v":"nbajijin"},{"n":"NBA十佳球","v":"nbatop10"},{"n":"CBA录像","v":"cbalx"},{"n":"CBA集锦","v":"cbajijin"},{"n":"其他篮球录像","v":"lanqiulx"}]}],
        "itiyu":[{"key":"cateId","name":"分类","value":[{"n":"NBA录像","v":"nbalx"},{"n":"NBA集锦","v":"nbajijin"},{"n":"NBA十佳球","v":"nbatop10"},{"n":"CBA录像","v":"cbalx"},{"n":"CBA集锦","v":"cbajijin"},{"n":"足球录像","v":"zuqiu"},{"n":"足球集锦","v":"zuqiujijin"},{"n":"综合录像","v":"zonghe"},{"n":"其他录像","v":"lanqiuluxiang"}]}],
        "vod":[{"key":"cateId","name":"分类","value":[{"n":"量子源NBA","v":"量子源NBA"},{"n":"量子源篮球","v":"量子源38"},{"n":"量子源足球","v":"量子源37"},{"n":"量子源网球","v":"量子源39"},{"n":"量子源斯诺克","v":"量子源40"},{"n":"天空源","v":"天空源"},{"n":"天空源NBA","v":"天空源NBA"},{"n":"飞速源","v":"飞速源"},{"n":"飞速源NBA","v":"飞速源NBA"}]}],
        "zhibo8":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"全部"},{"n":"快船","v":"快船"},{"n":"太阳","v":"太阳"},{"n":"湖人","v":"湖人"}]}]
    },
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    limit:6,
    double:false,
    lazy:`js:
        if (/weibo/.test(input)) {
            let split = input.replace('https://weibo.com/','').split('/');
            let userid = split[0];
            let pid = split[1];
            let html = 'https://m.weibo.cn/statuses/show?id=' + pid;
            let json = JSON.parse(request(html));
            if (/5861424034/.test(userid)) {
                input = json.data.page_info.media_info.stream_url_hd;
            } else {
                input = json.data.page_info.urls.mp4_720p_mp4;
            }
        }
    `,
//     lazy:`js:
//         if (/weibo/.test(input)) {
//             let split = input.replace('https://weibo.com/','').split('/');
//             let userid = split[0];
//             let pid = split[1];
//             let html = 'https://weibo.com/ajax/statuses/show?id=' + pid + '&locale=zh-CN';
//             let json = JSON.parse(request(html));
//             if (/5861424034/.test(userid)) {
//                 input = json.page_info.media_info.mp4_hd_url;
//             } else if (/1883881851/.test(userid)) {
//                 input = json.page_info.media_info.playback_list[0].play_info.url;
// //            } else if (/7778630492|6364463717/.test(userid)) {
//             } else {
//                 input = 'push://' + json.page_info.media_info.playback_list[0].play_info.url;
//             }
//         }
//     `,
    // 推荐:`js:
    //     pdfh = jsp.pdfh;
    //     pdfa = jsp.pdfa;
    //     pd = jsp.pd;
    //     var items = [];
    //     var html = request(input);
    //     var tabs = pdfa(html,'.list-group&&.list-group-item');
    //
    //     tabs.forEach(function(it){
    //         // 一级标题
    //         let title1;
    //         // 一级描述
    //         let desc1;
    //         // 一级图片URL
    //         let picUrl1 = pd(it,'.media-object&&src');
    //         // 一级URL
    //         let url1 = pd(it, '.media-heading a&&href');
    //
    //         if (/NBA全明星/.test(pdfh(it, '.media-heading&&Text'))) {
    //             // 通过"NBA全明星"进行截取
    //             let split1 = pdfh(it, '.media-heading&&Text').split("NBA全明星");
    //             // 一级标题
    //             title1 = split1[1].replace(' 全场录像集锦','').replace('vs', '🆚').replace('VS', '🆚');
    //             // 一级描述
    //             desc1 = split1[0] + 'NBA全明星';
    //         }
    //         else {
    //             // 通过" "进行截取
    //             let split = pdfh(it, '.media-heading&&Text').split(" ");
    //             // 一级标题
    //             title1 = split[2].replace('vs', '🆚').replace('VS', '🆚');
    //             // 一级描述
    //             desc1 = split[0] + ' ' + split[1];
    //         }
    //         items.push({
    //             desc:desc1,
    //             title:title1,
    //             pic_url:picUrl1,
    //             url:url1
    //         });
    //     });
    //     setResult(items);
    // `,
    一级:`js:
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        var items = [];

        // 封装球队LOGO麦普
        var TeamLogoMap = {
            // NBA官网版本LOGO
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
            // "快船": "https://res.nba.cn/media/img/teams/logos/LAC_logo.png",
            "鹈鹕": "https://res.nba.cn/media/img/teams/logos/NOP_logo.png",
            "火箭": "https://res.nba.cn/media/img/teams/logos/HOU_logo.png",
            "湖人": "https://res.nba.cn/media/img/teams/logos/LAL_logo.png",
            "勇士": "https://res.nba.cn/media/img/teams/logos/GSW_logo.png",
            "太阳": "https://res.nba.cn/media/img/teams/logos/PHX_logo.png",
            // "爵士": "https://res.nba.cn/media/img/teams/logos/UTA_logo.png",
            "灰熊": "https://res.nba.cn/media/img/teams/logos/MEM_logo.png",
            "开拓者": "https://res.nba.cn/media/img/teams/logos/POR_logo.png",
            "马刺": "https://res.nba.cn/media/img/teams/logos/SAS_logo.png",
            
            // 雷速体育版本LOGO
            // "凯尔特人": "https://cdn.leisu.com/basketball/teamflag_s/884c1c1f5db46c170df3c34a8e213ec9.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "雄鹿": "https://cdn.leisu.com/basketball/teamflag_s/172138a954c51bb257ac1ebaa52f01a1.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "76人": "https://cdn.leisu.com/basketball/teamflag_s/06e7bde6cca98873fe971fad4e67a9b6.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "魔术": "https://cdn.leisu.com/basketball/teamflag_s/0dc24d08ef0b5584e0b70f967db64b36.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "热火": "https://cdn.leisu.com/basketball/teamflag_s/ff7ccef6a6b79c6417ee8367946b0aec.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "尼克斯": "https://cdn.leisu.com/basketball/teamflag_s/49f8b0ef2ed529b44dba6ebb99a0d5ff.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "骑士": "https://cdn.leisu.com/basketball/teamflag_s/57c938e35ceb2ee92562a09c4165fb47.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "步行者": "https://cdn.leisu.com/basketball/teamflag_s/6f313b682482799762cf60dbc30dbfae.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "篮网": "https://cdn.leisu.com/basketball/teamflag_s/4150a647c6e381a69980e98bb86582a5.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "公牛": "https://cdn.leisu.com/basketball/teamflag_s/f15ed15d914b6a608e9a396f03c755b0.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "老鹰": "https://cdn.leisu.com/basketball/teamflag_s/4e67b14905a05af9e1bd04406bf8690f.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "猛龙": "https://cdn.leisu.com/basketball/teamflag_s/e299ddecec93dc5c8db83b1761e2fa1f.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "黄蜂": "https://cdn.leisu.com/basketball/teamflag_s/e52f6ac53681289c91703501a960cb3c.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "奇才": "https://cdn.leisu.com/basketball/teamflag_s/ac18ecfecac3af349477383866cf8ef5.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "活塞": "https://cdn.leisu.com/basketball/teamflag_s/3f82122a48e98eaccc5e71307eba801a.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "森林狼": "https://cdn.leisu.com/basketball/teamflag_s/38794d0ac418d8f2d03bd17a2623f3ed.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "掘金": "https://cdn.leisu.com/basketball/teamflag_s/403a12aa187f47045c18d137cd8103dc.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "雷霆": "https://cdn.leisu.com/basketball/teamflag_s/38794d0ac418d8f2d03bd17a2623f3ed.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "国王": "https://cdn.leisu.com/basketball/teamflag_s/1fc010aba7ac510b5364e5f76ca4f060.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "独行侠": "https://cdn.leisu.com/basketball/teamflag_s/42d7b5ec22b2eb411d68f94a04eab742.png?imageMogr2/auto-orient/thumbnail/200x200",
            "快船": "https://cdn.leisu.com/basketball/teamflag_s/848b21021b2a1db7bde95ea52a1e021b.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "鹈鹕": "https://cdn.leisu.com/basketball/teamflag_s/2602b893bb3f8d381a5b0d978fad74e1.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "火箭": "https://cdn.leisu.com/basketball/teamflag_s/bcfe797437f18526ff4e62177021f638.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "湖人": "https://cdn.leisu.com/basketball/teamflag_s/fa6f985041ec3f9729172380ae9cebf8.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "勇士": "https://cdn.leisu.com/basketball/teamflag_s/df3f6f8bb17fd1c618f60f0b14637140.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "太阳": "https://cdn.leisu.com/basketball/teamflag_s/da3c882a7e0bc592b4c1ba9d8c5fb68d.png?imageMogr2/auto-orient/thumbnail/200x200",
            "爵士": "https://cdn.leisu.com/basketball/teamflag_s/8c88df221129169246c5b8a82955fa34.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "灰熊": "https://cdn.leisu.com/basketball/teamflag_s/5150102b33043405b63b2e7c72759fa8.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "开拓者": "https://cdn.leisu.com/basketball/teamflag_s/4512175b1415f69816e816160093bcc0.png?imageMogr2/auto-orient/thumbnail/200x200",
            // "马刺": "https://cdn.leisu.com/basketball/teamflag_s/5305d1a7b721b5bef418041eff53ba82.png?imageMogr2/auto-orient/thumbnail/200x200",
            
            // 雷速体育版本NBA默认LOGO
            "NBA": "https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E"
        };

        if(MY_CATE==='zhibo8'){
            var cateId = MY_FL.cateId || '全部';
            if(MY_PAGE===1) {
                pdfh=jsp.pdfh;
                pdfa=jsp.pdfa;
                pd=jsp.pd;
                var html = request('https://www.zhibo8.com/nba/more.htm');
                var list = pdfa(html,'.dataList&&li');
                list.forEach(function(it){
                
                    if(!/集锦|佳球/.test(pdfh(it,'li&&data-label')) && !/录像/.test(pdfh(it,'a&&Text'))) {
                        // 一级标题
                        let title1 = pdfh(it,'a&&Text');
                        // 一级描述
                        let desc1 = pdfh(it,'.postTime&&Text');
                        // 一级图片URL
                        let picUrl1 = '';
                        // 一级URL
                        let url1 = ('https://www.zhibo8.com' + pdfh(it, 'a&&href')).replace(HOST, 'https://www.zhibo8.com');
                        
                        if(cateId==='全部') {
                            desc1 = pdfh(it,'.postTime&&Text') + pdfh(it,'li&&data-label').replaceAll(',', ' ');
                            picUrl1 = TeamLogoMap['NBA'];
                            items.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:url1
                            });
                        }
                        else if(cateId==='快船') {
                            if(/快船/.test(pdfh(it,'li&&data-label'))) {
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                        }
                        else if(cateId==='太阳') {
                            if(/太阳/.test(pdfh(it,'li&&data-label'))) {
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                        }
                        else if(cateId==='湖人') {
                            if(/湖人/.test(pdfh(it,'li&&data-label'))) {
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                        }
                    }
                });
            }
            else {
                for(var i=0;i<10;i++){
                    let myDate = new Date();
                    let lw = new Date(myDate - 1000 * 60 * 60 * 24 * (9 + MY_PAGE + i));
                    let lastY = lw.getFullYear();
                    let lastM = lw.getMonth() + 1;
                    let lastD = lw.getDate();
                    let lastDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
                    
                    var html = 'https://www.zhibo8.com/nba/json/'+lastDate+'.htm';
                    var json = JSON.parse(request(html));
                    var date = json.date;
                    list = json.video_arr;
                    var flag = 'false';
                    
                    list.forEach(function(it){
                    
                        if(!/集锦/.test(it.label) && !/佳球/.test(it.label)) {
                            // 一级标题
                            let title1 = it.title;
                            // 一级描述
                            let desc1 = date;
                            // 一级图片URL
                            let picUrl1 = '';
                            // 一级URL
                            let url1 = ('https://www.zhibo8.com' + it.url).replace(HOST, '');
                            
                            if(cateId==='全部') {
                                picUrl1 = TeamLogoMap['NBA'];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                            else if(cateId==='快船' && /快船/.test(it.label)) {
                                flag = 'true';
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                            else if(cateId==='太阳' && /太阳/.test(it.label)) {
                                flag = 'true';
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                            else if(cateId==='湖人' && /湖人/.test(it.label)) {
                                flag = 'true';
                                picUrl1 = TeamLogoMap[cateId];
                                items.push({
                                    desc:desc1,
                                    title:title1,
                                    pic_url:picUrl1,
                                    url:url1
                                });
                            }
                        }
                    });
                    if(flag==='true') {
                        break;
                    }
                }
            }
        }
        else if(MY_CATE==='lanqiuwu'){
            var cateId = MY_FL.cateId || 'nbalx';
            var site = 'https://lanqiuwu.com';
            var html;
            if(MY_PAGE===1) {
                html = request(site+'/'+cateId);
            }
            else {
                html = request(site+'/'+cateId+'/index_'+MY_PAGE+'.html');
            }
            var list = pdfa(html, '.content&&.excerpt');
            list.forEach(it => {
                // 通过" "进行截取
                let split = pdfh(it, 'h2&&Text').split(" ");
                // 一级标题
                let title1 = split[2];
                // 一级描述
                let desc1 = split[0].replace('年','.').replace('月','.').replace('日','') + ' ' + split[1];
                // 一级图片URL
                let picUrl1 = 'http://www.88kanqiu.one/static/img/default-img.png';
                // 一级URL
                let url1 = (site + pdfh(it, 'h2 a&&href')).replace('http://www.88kanqiu.one', '');

                if (/vs/.test(pdfh(it, 'h2&&Text'))) {
                    let vsSplit = pdfh(it, 'h2&&Text').split("vs");
                    let vs1 = vsSplit[0].split(' ');
                    let vs2 = vsSplit[1].split(' ');
                    // 客队名称
                    let Team1 = vs1[vs1.length-1];
                    // 主队名称
                    let Team2 = vs2[0];
                    // 客队vs主队
                    let Team1vsTeam2 = Team1 + '🆚' + Team2;
                    if(Team1 === '' || Team2 === '') {
                        Team1vsTeam2 = pdfh(it, 'h2&&Text');
                    }
                    title1 = Team1vsTeam2;
                    if (/NBA/.test(pdfh(it, 'h2&&Text')) && !/WNBA/.test(pdfh(it, 'h2&&Text'))) {
                        if (TeamLogoMap[Team2] != null) {
                            // 通过主队名称获取球队LOGO
                            picUrl1 = TeamLogoMap[Team2];
                        } else if (TeamLogoMap[Team1] != null) {
                            // 通过客队名称获取球队LOGO
                            picUrl1 = TeamLogoMap[Team1];
                        } else {
                            // 若主队客队LOGO都不存在，则使用默认LOGO
                            picUrl1 = TeamLogoMap['NBA'];
                        }
                    }
                    else if (/CBA/.test(pdfh(it, 'h2&&Text')) && !/WCBA/.test(pdfh(it, 'h2&&Text'))) {
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                }
                if (/佳球/.test(pdfh(it, 'h2&&Text'))) {
                    picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                }
                if (/全明星/.test(pdfh(it, 'h2&&Text')) && !/南区|北区/.test(pdfh(it, 'h2&&Text'))) {
                    // 通过" "进行截取
                    let split1 = pdfh(it, 'h2&&Text').split("NBA全明星");
                    // 一级标题
                    title1 = split1[1].replace(' 全场录像','').replace(' 全场集锦','').replace('vs', '🆚').replace('VS', '🆚');
                    // 一级描述
                    desc1 = split1[0].replace('年','.').replace('月','.').replace('日','').replace(' ','') + ' NBA全明星';
                }
                if(title1 === '' || title1 === '全场录像') {
                    title1 = pdfh(it, 'h2&&Text');
                }
                // 封装对象
                items.push({
                    title: title1,
                    desc: desc1,
                    pic_url: picUrl1,
                    url: url1
                });
            });
        }
        else if(MY_CATE==='itiyu'){
            var cateId = MY_FL.cateId || 'nbalx';
            var site = 'https://itiyu.com';
            var html;
            if(MY_PAGE===1) {
                html = request(site+'/'+cateId);
            }
            else {
                html = request(site+'/'+cateId+'/index_'+MY_PAGE+'.html');
            }
            var list = pdfa(html, '.content&&.excerpt');
            list.forEach(it => {
                // 通过" "进行截取
                let split = pdfh(it, 'h2&&Text').split(" ");
                // 一级标题
                let title1 = split[2];
                // 一级描述
                let desc1 = split[0].replace('年','.').replace('月','.').replace('日','') + ' ' + split[1];
                // 一级图片URL
                let picUrl1 = 'http://www.88kanqiu.one/static/img/default-img.png';
                // 一级URL
                let url1 = (site + pdfh(it, 'h2 a&&href')).replace('http://www.88kanqiu.one', '');

                if (/vs/.test(pdfh(it, 'h2&&Text'))) {
                    let vsSplit = pdfh(it, 'h2&&Text').split("vs");
                    let vs1 = vsSplit[0].split(' ');
                    let vs2 = vsSplit[1].split(' ');
                    // 客队名称
                    let Team1 = vs1[vs1.length-1];
                    // 主队名称
                    let Team2 = vs2[0];
                    // 客队vs主队
                    let Team1vsTeam2 = Team1 + '🆚' + Team2;
                    if(Team1 === '' || Team2 === '') {
                        Team1vsTeam2 = pdfh(it, 'h2&&Text');
                    }
                    title1 = Team1vsTeam2;
                    if (/NBA/.test(pdfh(it, 'h2&&Text'))) {
                        if (TeamLogoMap[Team2] != null) {
                            // 通过主队名称获取球队LOGO
                            picUrl1 = TeamLogoMap[Team2];
                        } else if (TeamLogoMap[Team1] != null) {
                            // 通过客队名称获取球队LOGO
                            picUrl1 = TeamLogoMap[Team1];
                        } else {
                            // 若主队客队LOGO都不存在，则使用默认LOGO
                            picUrl1 = TeamLogoMap['NBA'];
                        }
                    }
                    else if (/CBA/.test(pdfh(it, 'h2&&Text')) && !/WCBA/.test(pdfh(it, 'h2&&Text'))) {
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                }
                if (/佳球/.test(pdfh(it, 'h2&&Text'))) {
                    picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                }
                if (/全明星/.test(pdfh(it, 'h2&&Text')) && !/南区|北区/.test(pdfh(it, 'h2&&Text'))) {
                    // 通过" "进行截取
                    let split1 = pdfh(it, 'h2&&Text').split("NBA全明星");
                    // 一级标题
                    title1 = split1[1].replace(' 全场录像','').replace(' 全场集锦','').replace('vs', '🆚').replace('VS', '🆚');
                    // 一级描述
                    desc1 = split1[0].replace('年','.').replace('月','.').replace('日','').replace(' ','') + ' NBA全明星';
                }
                if(title1 === '' || title1 === '全场录像') {
                    title1 = pdfh(it, 'h2&&Text');
                }
                // 封装对象
                items.push({
                    title: title1,
                    desc: desc1,
                    pic_url: picUrl1,
                    url: url1
                });
            });
        }
        else if(MY_CATE==='88replay'){
            var html;
            var cateId = MY_FL.cateId || '1';
            if(cateId === '全部') {
                if(MY_PAGE===1) {
                    html = request(HOST+'/replay');
                }
                else {
                    html = request(HOST+'/replay?page='+MY_PAGE);
                }
            }
            else {
                if(MY_PAGE===1) {
                    html = request(HOST+'/match/'+cateId+'/replay');
                }
                else {
                    html = request(HOST+'/match/'+cateId+'/replay?page='+MY_PAGE);
                }
            }

            var tabs = pdfa(html,'.list-group&&.list-group-item');
            tabs.forEach(function(it){
                // 一级标题
                let title1;
                // 一级描述
                let desc1;
                // 一级图片URL
                let picUrl1 = pd(it,'.media-object&&src');
                // 一级URL
                let url1 = pdfh(it, '.media-heading a&&href');

                if (/NBA全明星/.test(pdfh(it, '.media-heading&&Text'))) {
                    // 通过"NBA全明星"进行截取
                    let split1 = pdfh(it, '.media-heading&&Text').split("NBA全明星");
                    // 一级标题
                    title1 = split1[1].replace(' 全场录像集锦','').replace('vs', '🆚').replace('VS', '🆚');
                    // 一级描述
                    desc1 = split1[0] + 'NBA全明星';
                } else {
                    // 通过" "进行截取
                    let split = pdfh(it, '.media-heading&&Text').split(" ");
                    // 一级标题
                    title1 = split[2].replace('vs', '🆚').replace('VS', '🆚');
                    // 一级描述
                    desc1 = split[0] + ' ' + split[1];
                }
                items.push({
                    desc:desc1,
                    title:title1,
                    pic_url:picUrl1,
                    url:url1
                });
            });
        }
        else if(MY_CATE==='vod'){
            var cateId = MY_FL.cateId || '量子源NBA';
            
            var vodList = '';
            var vodDetail = '';
            
            if(cateId==='量子源NBA'){
                vodList = 'https://cj.lzcaiji.com/api.php/provide/vod/?wd=NBA&pg=';
                vodDetail = 'https://cj.lzcaiji.com/api.php/provide/vod/?ac=detail&ids=';
            }
            else if(cateId==='天空源NBA'){
                vodList = 'https://tiankongzy.com/api.php/provide/vod/?wd=NBA&pg=';
                vodDetail = 'https://tiankongzy.com/api.php/provide/vod/?ac=detail&ids=';
            }
            else if(cateId==='飞速源NBA'){
                vodList = 'https://www.feisuzy.com/api.php/provide/vod/?wd=NBA&pg=';
                vodDetail = 'https://www.feisuzy.com/api.php/provide/vod/?ac=detail&ids=';
            }
            else if(/量子源/.test(cateId)){
                vodList = 'https://cj.lziapi.com/api.php/provide/vod/?t='+cateId.replace('量子源','')+'&ac=detail&pg=';
                vodDetail = 'https://cj.lzcaiji.com/api.php/provide/vod/?ac=detail&ids=';
            }
            else if(cateId==='天空源'){
                vodList = 'https://tiankongzy.com/api.php/provide/vod/?t=42&ac=detail&pg=';
                vodDetail = 'https://tiankongzy.com/api.php/provide/vod/?ac=detail&ids=';
            }
            else if(cateId==='飞速源'){
                vodList = 'https://www.feisuzy.com/api.php/provide/vod/?t=38&ac=detail&pg=';
                vodDetail = 'https://www.feisuzy.com/api.php/provide/vod/?ac=detail&ids=';
            }
            
            var list1 = JSON.parse(request(vodList+MY_PAGE)).list;

            var ids = '';
            list1.forEach(it => {
                if(ids==='') {
                    ids = it.vod_id;
                }
                else {
                    ids = ids + '%2C' + it.vod_id;
                }
            })
            if(ids!=='') {
                var list2 = JSON.parse(request(vodDetail+ids)).list;
                list2.forEach(it => {
                
                    // 一级标题
                    let title1 = it.vod_name;
                    // 一级描述
                    let desc1 = '';
                    // 一级图片URL
                    let picUrl1 = it.vod_pic;
                    // 一级URL
                    let url1 = vodDetail + it.vod_id;
                    
                    if(/NBA/.test(cateId)){
                        // 客队vs主队
                        let Team1vsTeam2 = '';
                        
                        if(cateId==='量子源NBA'){
                            // 客队vs主队
                            Team1vsTeam2 = it.vod_name.split(' ')[1].substring(0, it.vod_name.split(' ')[1].length-8).replace('VS', '🆚').replace('vs', '🆚');
                            // 一级描述
                            desc1 = it.vod_name.substring(it.vod_name.length-8, it.vod_name.length);
                        }
                        if(cateId==='天空源NBA' || cateId==='飞速源NBA'){
                            // 客队vs主队
                            let title2 = it.vod_name.split(' ')[2];
                            Team1vsTeam2 = title2.replace('VS', '🆚').replace('vs', '🆚');
                            if(/：/.test(title2)) {
                                Team1vsTeam2 = title2.split('：')[1].replace('VS', '🆚').replace('vs', '🆚');
                            }
                            // 一级描述
                            desc1 = it.vod_name.split(' ')[0] + ' ' + it.vod_name.split(' ')[1];
                        }
                        // 客队名称
                        let Team1 = Team1vsTeam2.split("🆚")[0];
                        // 主队名称
                        let Team2 = Team1vsTeam2.split("🆚")[1];
                        // 一级标题
                        title1 = Team1vsTeam2;
                        // 一级图片URL
                        picUrl1 = TeamLogoMap[Team2];
                    }

                    // 封装对象
                    items.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                })
            }
        }
        else if(MY_CATE==='cctv5zhibo'){
            var site = 'http://cctv5zhibo.cc';
            var html = request(site+'/basketball/video.html?fid=NBA&page='+MY_PAGE);
            var tabs = pdfa(html,'.sp-box&&ul&&li');
            tabs.forEach(function(it){
                // 一级标题
                let title1 = pdfh(it, 'a&&Text');
                // 一级描述
                let desc1 = pdfh(it, 'b&&Text');
                // 一级图片URL
                let picUrl1 = TeamLogoMap['NBA'];
                // 一级URL
                let url1 = pdfh(it, 'a&&href');
                items.push({
                    desc:desc1,
                    title:title1,
                    pic_url: picUrl1,
                    url:site+url1
                });
            });
        }
        setResult(items);
    `,
    二级: `js:
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        var new_html = request(input);

        let playFrom = [];
        let playList = [];

        if(/zhibo8/.test(input)) {
            VOD = {
                vod_name: pdfh(new_html,'.title h1&&Text'),
                vod_pic: pd(new_html,'.thumb_img img&&src'),
                vod_content: pdfh(new_html,'.title h1&&Text'),
            };
            playFrom.append('直播吧');
            playList.append(pdfh(new_html,'.video_time&&Text')+'$'+pd(new_html,'.vcp-player video&&src'));
            
            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
        else if(/lanqiuwu|itiyu/.test(input)) {
            VOD = {
                vod_name: pdfh(new_html,'.article-header h2&&Text')
            };
            var playUrls = pdfa(new_html, '.article-content&&p:gt(1)');

            var playListStr = '';
            var playList_weibo = '';
            var playList_cctv = '';
            var playList_tencent = '';
            var playList_migu = '';
            var playList_douyin = '';

            playUrls.map(function(it) {
                let name = pdfh(it,'a&&Text');
                let url = pd(it,'a&&href');
                // 单独封装微博源
                if (/weibo/.test(url)){
                    if (/全场/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<全场录像>' + '$' + url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第一节>' + '$' + url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第二节>' + '$' + url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第三节>' + '$' + url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第四节>' + '$' + url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<加时赛>' + '$' + url + '#';
                    }
                    else if (/全场|原声/.test(name) && /集锦/.test(name)){
                        playList_weibo = playList_weibo + '<全场集锦>' + '$' + url + '#';
                    }
                    else {
                        playList_weibo = playList_weibo + name + '$' + url + '#';
                    }
                }
                // 单独封装CCTV源
                else if (/cctv.com/.test(url)){
                    var cctv_url = 'https://jx.xyflv.cc/?url=' + url;
                    if (/全场/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<全场录像>' + '$' + cctv_url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第一节>' + '$' + cctv_url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第二节>' + '$' + cctv_url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第三节>' + '$' + cctv_url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第四节>' + '$' + cctv_url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<加时赛>' + '$' + cctv_url + '#';
                    }
                    else {
                        playList_cctv = playList_cctv + name + '$' + cctv_url + '#';
                    }
                }
                // 单独封装腾讯源
                else if (/qq.com|qq.html/.test(url)){
                    // var qq_url = 'https://jx.zui.cm/?url=' + url;
                    var qq_url = url;
                    var language = '';
                    if (/中文/.test(name)){
                        language = '中文';
                    }
                    if (/英文/.test(name)){
                        language = '英文';
                    }
                    if (/全场/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'全场录像>' + '$' + qq_url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第一节>' + '$' + qq_url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第二节>' + '$' + qq_url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第三节>' + '$' + qq_url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第四节>' + '$' + qq_url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'加时赛>' + '$' + qq_url + '#';
                    }
                    else {
                        playList_tencent = playList_tencent + name + '$' + qq_url + '#';
                    }
                }
                // 单独封装咪咕源
                else if (/miguvideo/.test(url)){
                    playList_migu = playList_migu + name + '$' + url + '#';
                }
                // 单独封装抖音源
                else if (/douyin/.test(url)){
                    playList_douyin = playList_douyin + name + '$' + url + '#';
                }
                else if (url==='' || name==='本场技术统计' || url==='undefined' || /lanqiuwu|itiyu|98lanqiu|lanqiudi/.test(url)){
                }
                else {
                    playListStr = playListStr + name + '$' + url + '#';
                }
            });
            if(playList_weibo!=='') {
                playFrom.append('微博');
                playList.append(playList_weibo);
            }
            if(playList_cctv!=='') {
                playFrom.append('央视');
                playList.append(playList_cctv);
            }
            if(playList_tencent!=='') {
                playFrom.append('腾讯');
                playList.append(playList_tencent);
            }
            if(playList_migu!=='') {
                playFrom.append('咪咕');
                playList.append(playList_migu);
            }
            if(playList_douyin!=='') {
                playFrom.append('抖音');
                playList.append(playList_douyin);
            }
            if(playListStr!=='') {
                if(/lanqiuwu/.test(input)) {
                    playFrom.append('篮球屋');
                }
                if(/itiyu/.test(input)) {
                    playFrom.append('i体育');
                }
                playList.append(playListStr);
            }
            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
        else if(/88kanqiu/.test(input)) {
            var playUrls = pdfa(new_html, '.col-md-9&&p:gt(0)');

            var playListStr = '';
            var playList_weibo = '';
            var playList_kuaiShou = '';
            var playList_cctv = '';
            var playList_tencent = '';
            var playList_migu = '';
            var playList_zhibo8 = '';
            var playList_alipan = '';
            var playList_quark = '';
            var playList_wangpan = '';

            playUrls.map(function(it) {
                let name = pdfh(it,'a&&Text');
                let url = pd(it,'a&&href');
                if (/weibo/.test(url)){
                    if (/全场录像/.test(name)){
                        playList_weibo = playList_weibo + '<全场录像>' + '$' + url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第一节>' + '$' + url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第二节>' + '$' + url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第三节>' + '$' + url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<第四节>' + '$' + url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_weibo = playList_weibo + '<加时赛>' + '$' + url + '#';
                    }
                    else {
                        playList_weibo = playList_weibo + name + '$' + url + '#';
                    }
                }
                else if (/kuaishou/.test(url)){
                    if (/全场录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<全场录像>' + '$' + url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<第一节>' + '$' + url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<第二节>' + '$' + url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<第三节>' + '$' + url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<第四节>' + '$' + url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_kuaiShou = playList_kuaiShou + '<加时赛>' + '$' + url + '#';
                    }
                    else {
                        playList_kuaiShou = playList_kuaiShou + name + '$' + url + '#';
                    }
                }
                // 单独封装CCTV源
                else if (/cctv.com/.test(url)){
                    var cctv_url = 'https://jx.xyflv.cc/?url=' + url;
                    if (/全场/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<全场录像>' + '$' + cctv_url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第一节>' + '$' + cctv_url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第二节>' + '$' + cctv_url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第三节>' + '$' + cctv_url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<第四节>' + '$' + cctv_url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_cctv = playList_cctv + '<加时赛>' + '$' + cctv_url + '#';
                    }
                    else {
                        playList_cctv = playList_cctv + name + '$' + cctv_url + '#';
                    }
                }
                // 单独封装腾讯源
                else if (/qq.com/.test(url)){
                    // var qq_url = 'https://jx.zui.cm/?url=' + url;
                    var qq_url = url;
                    var language = '';
                    if (/QQ国语/.test(name)){
                        language = '国语';
                    }
                    if (/QQ原声/.test(name)){
                        language = '原声';
                    }
                    if (/全场/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'全场录像>' + '$' + qq_url + '#';
                    }
                    else if (/第一节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第一节>' + '$' + qq_url + '#';
                    }
                    else if (/第二节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第二节>' + '$' + qq_url + '#';
                    }
                    else if (/第三节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第三节>' + '$' + qq_url + '#';
                    }
                    else if (/第四节/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'第四节>' + '$' + qq_url + '#';
                    }
                    else if (/加时赛/.test(name) && /录像/.test(name)){
                        playList_tencent = playList_tencent + '<'+language+'加时赛>' + '$' + qq_url + '#';
                    }
                    else {
                        playList_tencent = playList_tencent + name + '$' + qq_url + '#';
                    }
                }
                // 单独封装咪咕源
                else if (/miguvideo/.test(url)){
                    playList_migu = playList_migu + name + '$' + url + '#';
                }
                // 单独封装直播吧源
                else if (/duoduocdn|zhibo8/.test(url)){
                    playList_zhibo8 = playList_zhibo8 + name + '$' + url + '#';
                }
                // 单独封装阿里云盘
                else if (/alipan/.test(url) || /阿里云盘/.test(name)){
                    playList_alipan = playList_alipan + name + '$' + url + '#';
                    if (playList_wangpan === '') {
                        playList_wangpan = '阿里云盘: ' + url;
                    } else {
                        playList_wangpan = '\\n\\n' + '阿里云盘: ' + url;
                    }
                }
                // 单独封装夸克云盘
                else if (/quark/.test(url) || /夸克云盘/.test(name)){
                    playList_quark = playList_quark + name + '$' + url + '#';
                    if (playList_wangpan === '') {
                        playList_wangpan = '夸克云盘: ' + url;
                    } else {
                        playList_wangpan = '\\n\\n' + '夸克云盘: ' + url;
                    }
                }
                else if (url==='' || url==='undefined' || /lanqiuwu|luxiangwu/.test(url) || name === '' || name === 'undefined'){
                }
                else {
                    playListStr = playListStr + name + '$' + url + '#';
                }
            });
            if(playList_weibo!=='') {
                playFrom.append('微博');
                playList.append(playList_weibo);
            }
            if(playList_kuaiShou!=='') {
                playFrom.append('快手');
                playList.append(playList_kuaiShou);
            }
            if(playList_cctv!=='') {
                playFrom.append('央视');
                playList.append(playList_cctv);
            }
            if(playList_tencent!=='') {
                playFrom.append('腾讯');
                playList.append(playList_tencent);
            }
            if(playList_migu!=='') {
                playFrom.append('咪咕');
                playList.append(playList_migu);
            }
            if(playList_zhibo8!=='') {
                playFrom.append('直播吧');
                playList.append(playList_zhibo8);
            }
            if(playList_alipan!=='') {
                playFrom.append('阿里云盘');
                playList.append(playList_alipan);
            }
            if(playList_quark!=='') {
                playFrom.append('夸克云盘');
                playList.append(playList_quark);
            }
            if(playListStr!=='') {
                playFrom.append('88录像');
                playList.append(playListStr);
            }
            VOD = {
                vod_name: pdfh(new_html,'.col-md-9 h3&&Text'),
                vod_pic: pd(new_html,'.col-md-9 div:eq(3)&&src'),
                vod_content: playList_wangpan
            };
            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
        else if(/lzcaiji/.test(input)) {
            var info = JSON.parse(new_html).list[0];
            VOD = {
                vod_id: info.vod_id,
                vod_name: info.vod_name,
                vod_pic: info.vod_pic,
                vod_content: info.vod_name,
                type_name: info.vod_time,
            };
            VOD['vod_play_from'] = info.vod_play_from;
            VOD['vod_play_url'] = info.vod_play_url;
        }
        else if(/tiankongzy|feisuzy/.test(input)) {
            var info = JSON.parse(new_html).list[0];
            VOD = {
                vod_id: info.vod_id,
                vod_name: info.vod_name,
                vod_pic: info.vod_pic,
                vod_content: info.vod_name,
                type_name: info.vod_pubdate,
            };
            VOD['vod_play_from'] = info.vod_play_from;
            VOD['vod_play_url'] = info.vod_play_url;
        }
        else if(/cctv5zhibo/.test(input)) {
            VOD = {
                vod_name: pdfh(new_html,'.title&&Text'),
                type_name: pdfh(new_html,'.right_time&&Text'),
                vod_content: pdfh(new_html,'#sp_miaoshu&&Text') + '\\n\\n' + input
            };
            playFrom.append('CCTV5直播吧');
            playList.append('播放'+'$'+input);
        
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
    `,
    搜索:'',
}
