var rule = {
    title:'快船专区',
    host:'https://lanqiuwu.com',
    url:'/fyclass/index_fypage.html',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'快船赛程&快船视频&快船集锦&快船录像(篮球屋)&快船录像(88看球)&快船录像(量子)&快船录像(天空)&快船录像(飞速)',
    class_url:'88kanqiu_clippers&zhibo8_clippers&qiudui139_jijin&qiudui139&88kanqiu_clippers_replay&qiudui139_liangzi&qiudui139_tiankong&qiudui139_feisu',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    lazy:`js:
        if (/weibo/.test(input)) {
            let split = input.replace('https://weibo.com/','').split('/');
            let userid = split[0];
            let pid = split[1];
            let html = 'https://weibo.com/ajax/statuses/show?id=' + pid + '&locale=zh-CN';
            let json = JSON.parse(request(html));
            if (/5861424034/.test(userid)) {
                input =  json.page_info.media_info.mp4_hd_url;
            } else if (/1883881851/.test(userid)) {
                input = 'push://' + json.page_info.media_info.playback_list[0].play_info.url;
            } else if (/7778630492/.test(userid)) {
                input = 'push://' + json.page_info.media_info.playback_list[0].play_info.url;
            }
        }
    `,
    limit:6,
    double:true,
    一级: `js:
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
            // "马刺": "https://cdn.leisu.com/basketball/teamflag_s/5305d1a7b721b5bef418041eff53ba82.png?imageMogr2/auto-orient/thumbnail/200x200"
        };

        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        var d = [];
        var html;
        if(MY_CATE==='zhibo8_clippers'){
            if(MY_PAGE===1) {
                html = request('https://www.zhibo8.com/nba/more.htm?label=快船');
                var list = pdfa(html,'.dataList&&li');
                list.forEach(function(it){
                    if(/集锦/.test(pdfh(it,'li&&data-label')) || /佳球/.test(pdfh(it,'li&&data-label'))) {
                    }
                    else if(/快船/.test(pdfh(it,'li&&data-label'))) {
                        // 一级标题
                        let title1 = pdfh(it,'a&&Text');
                        // 一级描述
                        let desc1 = pdfh(it,'.postTime&&Text');
                        // 一级图片URL
                        let picUrl1 = 'https://cdn.leisu.com/basketball/teamflag_s/848b21021b2a1db7bde95ea52a1e021b.png?imageMogr2/auto-orient/thumbnail/200x200';
                        // 一级URL
                        let url1 = pd(it, 'a&&href').replace(HOST, 'https://www.zhibo8.com');

                        d.push({
                            desc:desc1,
                            title:title1,
                            pic_url:picUrl1,
                            url:url1
                        });
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

                    html = 'https://www.zhibo8.com/nba/json/'+lastDate+'.htm';
                    var json = JSON.parse(request(html));
                    var date = json.date;
                    list = json.video_arr;
                    var flag = 'false';

                    list.forEach(function(it){

                        if(/集锦/.test(it.label) || /佳球/.test(it.label)) {
                        }
                        else if(/快船/.test(it.label)) {
                            flag = 'true';
                            // 一级标题
                            let title1 = it.title;
                            // 一级描述
                            let desc1 = date;
                            // 一级图片URL
                            let picUrl1 = 'https://cdn.leisu.com/basketball/teamflag_s/848b21021b2a1db7bde95ea52a1e021b.png?imageMogr2/auto-orient/thumbnail/200x200';
                            // 一级URL
                            let url1 = ('https://www.zhibo8.com' + it.url).replace(HOST, '');

                            d.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:url1
                            });
                        }
                    });
                    if(flag==='true') {
                        break;
                    }
                }
            }
        }
        else if(MY_CATE==='qiudui139_liangzi'){
            var list1 = JSON.parse(request('https://cj.lzcaiji.com/api.php/provide/vod/?pg='+MY_PAGE+'&wd=%E5%BF%AB%E8%88%B9')).list;

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
                var list2 = JSON.parse(request('https://cj.lzcaiji.com/api.php/provide/vod/?ac=detail&ids='+ids)).list;
                list2.forEach(it => {
                    // 客队vs主队
                    let Team1vsTeam2 = it.vod_name.split(' ')[1].substring(0, it.vod_name.split(' ')[1].length-8);;
                    // 客队名称
                    let Team1 = Team1vsTeam2.split("vs")[0];
                    // 主队名称
                    let Team2 = Team1vsTeam2.split("vs")[1];

                    // 一级标题
                    let title1 = Team1vsTeam2.replace('VS', '🆚').replace('vs', '🆚');
                    // 一级描述
                    let desc1 = it.vod_name.substring(it.vod_name.length-8, it.vod_name.length);;
                    // 一级图片URL
                    let picUrl1 = TeamLogoMap[Team1!=='快船'?Team1:Team2];
                    // 一级URL
                    let url1 = 'https://cj.lzcaiji.com/api.php/provide/vod/?ac=detail&ids=' + it.vod_id;

                    // 封装对象
                    d.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                })
            }
        }
        else if(MY_CATE==='qiudui139_tiankong'){
            var list1 = JSON.parse(request('https://tiankongzy.com/api.php/provide/vod/?pg='+MY_PAGE+'&wd=%E5%BF%AB%E8%88%B9')).list;

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
                var list2 = JSON.parse(request('https://tiankongzy.com/api.php/provide/vod/?ac=detail&ids='+ids)).list;
                list2.forEach(it => {
                    let title2 = it.vod_name.split(' ')[2];
                    // 客队vs主队
                    let Team1vsTeam2 = title2;
                    if(/：/.test(title2)) {
                        Team1vsTeam2 = title2.split('：')[1];
                    }
                    // 客队名称
                    let Team1 = Team1vsTeam2.split("VS")[0];
                    // 主队名称
                    let Team2 = Team1vsTeam2.split("VS")[1];

                    // 一级标题
                    let title1 = title2.replace('VS', '🆚').replace('vs', '🆚');
                    // 一级描述
                    let desc1 = it.vod_name.split(' ')[0] + ' ' + it.vod_name.split(' ')[1];
                    // 一级图片URL
                    let picUrl1 = TeamLogoMap[Team1!=='快船'?Team1:Team2];
                    // 一级URL
                    let url1 = 'https://tiankongzy.com/api.php/provide/vod/?ac=detail&ids=' + it.vod_id;

                    // 封装对象
                    d.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                })
            }
        }
        else if(MY_CATE==='qiudui139_feisu'){
            var list1 = JSON.parse(request('https://www.feisuzy.com/api.php/provide/vod/?pg='+MY_PAGE+'&wd=%E5%BF%AB%E8%88%B9')).list;

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
                var list2 = JSON.parse(request('https://www.feisuzy.com/api.php/provide/vod/?ac=detail&ids='+ids)).list;
                list2.forEach(it => {
                    let title2 = it.vod_name.split(' ')[2];
                    // 客队vs主队
                    let Team1vsTeam2 = title2;
                    if(/：/.test(title2)) {
                        Team1vsTeam2 = title2.split('：')[1];
                    }
                    // 客队名称
                    let Team1 = Team1vsTeam2.split("VS")[0];
                    // 主队名称
                    let Team2 = Team1vsTeam2.split("VS")[1];

                    // 一级标题
                    let title1 = title2.replace('VS', '🆚').replace('vs', '🆚');
                    // 一级描述
                    let desc1 = it.vod_name.split(' ')[0] + ' ' + it.vod_name.split(' ')[1];
                    // 一级图片URL
                    let picUrl1 = TeamLogoMap[Team1!=='快船'?Team1:Team2];
                    // 一级URL
                    let url1 = 'https://www.feisuzy.com/api.php/provide/vod/?ac=detail&ids=' + it.vod_id;

                    // 封装对象
                    d.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                })
            }
        }
        else if(MY_CATE==='88kanqiu_clippers'){
            if(MY_PAGE===1) {
                html=request('http://www.88kanqiu.one/team/2390/live');
                var tabs=pdfa(html,'.list-group&&.list-group-item');

                // 定义日期
                var date = '';

                tabs.forEach(function(it){
                    // 通过" "进行截取
                    let split = pdfh(it, '.d-none&&Text').split(" ");

                    if(/undefined/.test(split[2])){
                        date = pdfh(it, 'li&&Text').split('-')[1] + '-' + pdfh(it, 'li&&Text').split('-')[2] + ' ';
                    } else {
                        // 一级标题
                        let title1 = split[2] + '🆚' + split[4];
                        // 一级描述
                        let desc1 = date + split[0] + ' ' + pdfh(it, '.btn&&Text');
                        // 一级图片URL
                        let picUrl1 = split[2]==='快船'?pd(it,'.team-logo&&src'):pd(it,'.col-xs-1 img&&src');
                        // 一级URL
                        let url1 = pd(it, '.btn&&href').replace(HOST, 'http://www.88kanqiu.one');

                        d.push({
                            desc:desc1,
                            title:title1,
                            pic_url:picUrl1,
                            url:url1
                        })
                    }
                });
            }
        }
        else if(MY_CATE==='88kanqiu_clippers_replay'){
            html = request('http://www.88kanqiu.one/match/1/replay?page='+MY_PAGE);
            var tabs = pdfa(html,'.list-group&&.list-group-item');
            var flag = 'false';
            
            tabs.forEach(function(it){
                if(/快船/.test(pdfh(it, '.media-heading&&Text'))){
                    flag = 'true';
                    // 通过" "进行截取
                    let split = pdfh(it, '.media-heading&&Text').split(" ");
                    
                    // 一级标题
                    let title1 = split[2].replace('vs', '🆚').replace('VS', '🆚');
                    // 一级描述
                    let desc1 = split[0] + ' ' + split[1];
                    // 一级图片URL
                    let picUrl1 = pd(it,'.media-object&&src');
                    // 一级URL
                    let url1 = pd(it, '.media-heading a&&href').replace(HOST, 'http://www.88kanqiu.one');
                    
                    d.push({
                        desc:desc1,
                        title:title1,
                        pic_url:picUrl1,
                        url:url1
                    })
                }
            });
        }
        else{
            if(/qiudui139/.test(MY_CATE)){
                html = request(input.replace(MY_CATE + '/index_' + MY_PAGE + '.html', '/e/search/result/index.php?page='+(MY_PAGE-1)+'&searchid='+MY_CATE.replace('qiudui','')));
            }
            else{
                html = request(input.replace('/index_1.html', ''));
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
                let picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                // 一级URL
                let url1 = pd(it, 'h2 a&&href');

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
                    if (/NBA/.test(pdfh(it, 'h2&&Text'))) {
                        title1 = Team1vsTeam2;
                        if(MY_CATE==='qiudui139'){
                            if(/录像/.test(vs2[1])){
                                title1 = Team1vsTeam2;
                                picUrl1 = TeamLogoMap[Team1!=='快船'?Team1:Team2];
                            }
                        } else if(MY_CATE==='qiudui139_jijin'){
                            if(/集锦/.test(vs2[1])){
                                title1 = Team1vsTeam2;
                                picUrl1 = TeamLogoMap[Team1!=='快船'?Team1:Team2];
                            }
                        } else if (TeamLogoMap[Team2] != null) {
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
                    else if (/ CBA/.test(pdfh(it, 'h2&&Text'))) {
                        title1 = Team1vsTeam2;
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    else if (/十佳球/.test(pdfh(it, 'h2&&Text'))) {
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    else {
                        picUrl1 = 'http://www.88kanqiu.one/static/img/default-img.png';
                    }
                }
                if(MY_CATE==='qiudui139'){
                    if(!picUrl1.startsWith("https://cdn.leisu.com")){
                        // 封装对象
                        d.push({
                            title: title1,
                            desc: desc1,
                            pic_url: picUrl1,
                            url: url1
                        });
                    }
                } else if(MY_CATE==='qiudui139_jijin'){
                    if(!picUrl1.startsWith("https://cdn.leisu.com")){
                        // 封装对象
                        d.push({
                            title: title1,
                            desc: desc1,
                            pic_url: picUrl1,
                            url: url1
                        });
                    }
                } else {
                    // 封装对象
                    d.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                }
            })
        }
        setResult(d);
    `,
    二级: `js:
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var new_html = request(input);
        if(/zhibo8/.test(input)) {
            VOD = {
                vod_name: pdfh(new_html,'.title h1&&Text'),
                vod_pic: pd(new_html,'.thumb_img img&&src'),
                vod_content: pdfh(new_html,'.title h1&&Text'),
            };

            let playFrom = [];
            let playList = [];
            playFrom.append('直播吧');
            playList.append(pdfh(new_html,'.video_time&&Text')+'$'+pd(new_html,'.vcp-player video&&src'));

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
        else if(/tiankongzy/.test(input)) {
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
        else if(/feisu/.test(input)) {
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
        else if(/88kanqiu/.test(input) && /replay/.test(input)) {
            let playFrom = [];
            let playList = [];
            VOD = {
                vod_name: pdfh(new_html,'.breadcrumb h3&&Text'),
                vod_pic: pd(new_html,'.col-md-9 div:eq(3)&&src'),
            };
            var playUrls = pdfa(new_html, '.col-md-9&&p:gt(0)');
            playFrom.append('88录像');
            playUrls.forEach(it => {
                playList.append(playUrls.map(function(it) {
                    let name = pdfh(it,'a&&Text');
                    let url = pd(it,'a&&href');
                    return name + "$" + url
                }).join("#"))
            });
            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
        else if(/88kanqiu/.test(input)) {
            VOD = {
                vod_name: pdfh(new_html,'.team-name:eq(0)&&Text') + '🆚' + pdfh(new_html,'.team-name:eq(1)&&Text'),
                vod_pic: pd(new_html,'.team-logo&&src'),
                type_name: pdfh(new_html,'.customer-navbar-nav&&li&&Text'),
                vod_content: pdfh(new_html,'.col-md-4:eq(1)&&Text').replaceAll(' ', '_'),
            };

            // 播放列表拼接
            var playListStr = '';

            var playUrls = JSON.parse(request(url.replace(HOST+'88kanqiu%7C', '')+'-url')).links;
            playUrls.map(function(it) {
                var name = it.name;
                var url = it.url;
                if (url.startsWith("http://play.sportsteam1234.com/play/mglx.php")
                    || url.startsWith("http://play.sportsteam1234.com/play/gm.php")){
                    playListStr = playListStr + '咪咕专线'+'$'+url+'#';
                }
            });

            playUrls.map(function(it) {
                var name = it.name;
                var url = it.url;
                if (/txycdn.video.qq.com/.test(url)){
                    url = 'https://txycdn.video.qq.com' + url.split('txycdn.video.qq.com')[1];
                    playListStr = playListStr + '腾讯专线'+'$'+url+'#';
                }
                else if (url.startsWith("http://play.sportsteam1234.com/play/iqi.php")){
                    playListStr = playListStr + '爱奇艺专线'+'$'+url+'#';
                }
            });

            playUrls.map(function(it) {
                playListStr = playListStr + it.name+ '$' + it.url + '#';
            });

            let playFrom = [];
            let playList = [];
            playFrom.append('88看球');
            playList.append(playListStr);

            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
        else{
            VOD = {
                vod_name: pdfh(new_html,'.article-header h2&&Text'),
            };
            var playUrls = pdfa(new_html, '.article-content&&p:gt(1)');

            let playFrom = [];
            let playList = [];
            playFrom.append('篮球屋');
            playUrls.forEach(it => {
                playList.append(playUrls.map(function(it) {
                    let name = pdfh(it,'a&&Text');
                    let url = pd(it,'a&&href');
                    return name + "$" + url
                }).join("#"))
            });

            // 最后封装所有线路
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url;
        }
    `,
    搜索:'',
}