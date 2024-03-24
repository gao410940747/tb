// 道长 drpy仓库 https://gitcode.net/qq_32394351/dr_py
// 道长 drpy安卓本地搭建说明 https://code.gitlink.org.cn/api/v1/repos/hjdhnx/dr_py/blob/master/%E5%AE%89%E5%8D%93%E6%9C%AC%E5%9C%B0%E6%90%AD%E5%BB%BA%E8%AF%B4%E6%98%8E.md
// 道长 drpy写源 模板规则说明 https://gitcode.net/qq_32394351/dr_py#%E6%A8%A1%E6%9D%BF%E8%A7%84%E5%88%99%E8%AF%B4%E6%98%8E
// 道长 drpy写源 套模模版 https://ghproxy.net/https://raw.githubusercontent.com/hjdhnx/dr_py/main/js/%E6%A8%A1%E6%9D%BF.js
// 道长 drpy写源 相关视频教程 https://www.youtube.com/watch?v=AK7cN-fcwm4
// 道长 drpy写源 写源教学视频 https://t.me/fongmi_offical/54080/63553
// 海阔下载 https://haikuo.lanzoui.com/u/GoldRiver
// 影视TV 官方TG Drpy群 https://t.me/fongmi_offical/63689
// 影视TV 官方TG 下载 https://t.me/fongmi_release


var rule = {
    title:'体育直播',
    host:'http://www.88kanqiu.one',
    // JRKAN发布页：www.qiumi1314.com
    // 主节点：http://www.jrkan.com/
    // 联通节点：www.jrsyyds.com/  www.jryyds.com/  www.jrskan.com/  www.jrsbxj.com/  www.jrkankan.com / www.jrkan365.com /
    // 移动节点：www.jrsyyds.com/  www.jryyds.com/  www.jrskan.com/  www.jrsbxj.com/
    // 88看球发布页：www.88kq.net
    // 主节点：www.88kanqiu.one
    // 备用节点：www.88kanqiu.live/  www.88kanqiu.dog/  www.88kanqiu.lol/  www.88kanqiu.love/  www.88kanqiu.org/  www.88kanqiu.win/  www.popozhibo.cc/  www.popozhibo.net/
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'JRS看比赛&88看球&310直播&一起看直播',
    class_url:'jrkan&88kanqiu&310&17kan',
    filterable: 1,
    filter_url: '{{fl.cateId}}',
    filter: {
        "jrkan":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"全部"},{"n":"NBA","v":"nba"},{"n":"CBA","v":"cba"}]}],
        "88kanqiu":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"全部"},{"n":"NBA","v":"1"},{"n":"CBA","v":"2"},{"n":"篮球综合","v":"4"},{"n":"足球世界杯","v":"3"},{"n":"英超","v":"8"},{"n":"西甲","v":"9"},{"n":"意甲","v":"10"},{"n":"欧冠","v":"12"},{"n":"欧联","v":"13"},{"n":"德甲","v":"14"},{"n":"法甲","v":"15"},{"n":"欧国联","v":"16"},{"n":"足总杯","v":"27"},{"n":"国王杯","v":"33"},{"n":"中超","v":"7"},{"n":"亚冠","v":"11"},{"n":"足球综合","v":"23"},{"n":"欧协联","v":"28"},{"n":"美职联","v":"26"},{"n":"网球","v":"29"},{"n":"斯诺克","v":"30"},{"n":"MLB","v":"38"},{"n":"UFC","v":"32"},{"n":"NFL","v":"25"},{"n":"纬来体育","v":"21"},{"n":"CCTV5","v":"18"},{"n":"太阳赛程","v":"太阳赛程"},{"n":"独行侠赛程","v":"独行侠赛程"},{"n":"湖人赛程","v":"湖人赛程"},{"n":"勇士赛程","v":"勇士赛程"}]}],
        "310":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"全部"},{"n":"篮球","v":"2"},{"n":"足球","v":"1"}]}],
        "17kan":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"index"},{"n":"NBA","v":"nba"},{"n":"CBA","v":"cba"}]}]
    },
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:10000,
    play_parse:true,
    lazy: `js:
        if(/embed=/.test(input)) {
            let url = input.match(/embed=(.*?)&/)[1];
            url = base64Decode(url);
            input = {
                jx:0,
                url: url.split('#')[0],
                parse: 0
            }
        } else if (/\\?url=/.test(input)){
            input = {
                jx:0,
                url: input.split('?url=')[1].split('#')[0],
                parse: 0
            }
        } else {
            input
        }
    `,
    limit:6,
    double:false,
    // 推荐:`js:
    //     var items=[];
    //     pdfh=jsp.pdfh;
    //     pdfa=jsp.pdfa;
    //     pd=jsp.pd;
    //     var html=request('http://www.jrsyyds.com/?lan=1');
    //     var tabs=pdfa(html,'body&&.d-touch');
    //     tabs.forEach(function(it){
    //         var pz=pdfh(it,'.name:eq(1)&&Text');
    //         var ps=pdfh(it,'.name:eq(0)&&Text');
    //         var pk=pdfh(it,'.name:eq(2)&&Text');
    //         var img=pd(it,'img&&src');
    //         var timer=pdfh(it,'.lab_time&&Text');
    //         var url=pd(it,'a.me&&href');
    //         if(/NBA/.test(ps)) {
    //             items.push({
    //                 desc:timer+' '+ps,
    //                 title:pz+'🆚'+pk,
    //                 pic_url:img,
    //                 url:url + '|' + 'jrkan'
    //             });
    //         }
    //     });
    //     setResult(items);
    // `,
    一级:`js:
        var items = [];
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        
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
        
        var html;
        if(MY_PAGE===1){
            if(/jrkan/.test(MY_CATE)){
                let cateId = MY_FL.cateId || 'nba';
                html=request('http://www.jrsyyds.com/?lan=1');
                var tabs=pdfa(html,'body&&.d-touch');
                tabs.forEach(function(it){
                    var pz=pdfh(it,'.name:eq(1)&&Text');
                    var ps=pdfh(it,'.name:eq(0)&&Text');
                    var pk=pdfh(it,'.name:eq(2)&&Text');
                    var img=pd(it,'img&&src');
                    var timer=pdfh(it,'.lab_time&&Text');
                    var url=pd(it,'a.me&&href');
                    if(cateId === '全部'){
                        items.push({
                            desc:timer+' '+ps,
                            title:pz+'🆚'+pk,
                            pic_url:img,
                            url:url + '|' + 'jrkan'
                        });
                    }
                    if(cateId === 'nba') {
                        if(/NBA/.test(ps) && !/WNBA/.test(ps)) {
                            items.push({
                                desc:timer+' '+ps,
                                title:pz+'🆚'+pk,
                                pic_url:img,
                                url:url + '|' + 'jrkan'
                            });
                        }
                    }
                    if(cateId === 'cba') {
                        if(/CBA/.test(ps) && !/WCBA/.test(ps)) {
                            items.push({
                                desc:timer+' '+ps,
                                title:pz+'🆚'+pk,
                                pic_url:img,
                                url:url + '|' + 'jrkan'
                            });
                        }
                    }
                });
            }
            else if(MY_CATE==='310'){
                let cateId = MY_FL.cateId || '2';
                if(cateId === '全部') {
                    html = request('http://www.310.tv');
                }
                else {
                    html = request('http://www.310.tv/?a=' + cateId);
                }
                var tabs = pdfa(html,'.list_content&&a');

                tabs.forEach(function(it){
                    // 通过" "进行截取
                    let split = pdfh(it, '.jiabifeng&&p:lt(5)&&Text').split(" ");
                    
                    let date = pdfh(it, 'a&&t-nzf-o').split(" ")[0].split('-');
                    let time = pdfh(it, 'a&&t-nzf-o').split(" ")[1].split(':');
                    
                    // 一级标题
                    let title1 = split[0] + '🆚' + split[5];
                    // 一级描述
                    let desc1 = date[1] + '-' + date[2] + ' ' + time[0] + ':' + time[1] + ' ' + split[1];
                    // 一级图片URL
                    let picUrl1 = /http/.test(TeamLogoMap[pdfh(it, 'strong:eq(1)&&Text')])?TeamLogoMap[pdfh(it, 'strong:eq(1)&&Text')]:'http://www.88kanqiu.one/static/img/default-img.png';
                    // 一级URL
                    let url1 = pd(it, 'a&&href');

                    items.push({
                        desc:desc1,
                        title:title1,
                        pic_url:picUrl1,
                        url:url1 + '|' + '310'
                    })
                });
            }
            else if(MY_CATE==='17kan'){
                let cateId = MY_FL.cateId || 'nba';
                let site = 'http://www.zuqiuzhibo.live';
                // http://www.wuchajian.live/
                html = request(site + '/' + cateId + '.html');
                var tabs = pdfa(html,'.data&&.against');

                tabs.forEach(function(it){
                    
                    // 一级标题
                    let title1 = pdfh(it, 'a:eq(0)&&Text') + ' ' + pdfh(it, 'strong:eq(0)&&Text') + '🆚' + pdfh(it, 'strong:eq(1)&&Text');
                    // 一级描述
                    let desc1 = (/直播|结束/.test(pdfh(it, 'div:eq(0)&&Text')))?pdfh(it, 'div:eq(0)&&Text'):'未开始';
                    // 一级图片URL
                    let picUrl1 = /http/.test(TeamLogoMap[pdfh(it, 'strong:eq(1)&&Text')])?TeamLogoMap[pdfh(it, 'strong:eq(1)&&Text')]:'http://www.88kanqiu.one/static/img/default-img.png';
                    // 一级URL
                    let url1 = pdfh(it, 'a:eq(3)&&href');
                    if(/更多/.test(pdfh(it, 'a:eq(4)&&Text'))){
                        url1 = pdfh(it, 'a:eq(4)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(5)&&Text'))){
                        url1 = pdfh(it, 'a:eq(5)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(6)&&Text'))){
                        url1 = pdfh(it, 'a:eq(6)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(7)&&Text'))){
                        url1 = pdfh(it, 'a:eq(7)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(8)&&Text'))){
                        url1 = pdfh(it, 'a:eq(8)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(9)&&Text'))){
                        url1 = pdfh(it, 'a:eq(9)&&href');
                    }
                    if(/更多/.test(pdfh(it, 'a:eq(10)&&Text'))){
                        url1 = pdfh(it, 'a:eq(10)&&href');
                    }

                    items.push({
                        desc:desc1,
                        title:title1,
                        pic_url:picUrl1,
                        url:site + url1 + '|' + '17kan'
                    })
                });
            }
            else if(MY_CATE==='88kanqiu'){
                let cateId = MY_FL.cateId || '1';
                if(cateId === '全部') {
                    html = request(HOST);
                }
                else if(/赛程/.test(cateId)) {
                    var TeamMap = {
                        "独行侠赛程": "2410",
                        "太阳赛程": "2411",
                        "勇士赛程": "2369",
                        "湖人赛程": "2392",
                    };
                    html = request(HOST + '/team/' + TeamMap[cateId] + '/live');
                }
                else {
                    html = request(HOST + '/match/' + cateId + '/live');
                }
                var tabs = pdfa(html,'.list-group&&.list-group-item');

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
                        let desc1 = date + split[0] + ' ' + pdfh(it, 'li&&Text').split(' ')[1] + ' ' + pdfh(it, '.btn&&Text');
                        // 一级图片URL
                        // let picUrl1 = (MY_CATE==='clippers' && split[2]==='快船')?pd(it,'.team-logo&&src'):pd(it,'.col-xs-1 img&&src');
                        let picUrl1 = (/赛程/.test(cateId) && split[2]===cateId.replace('赛程',''))?pd(it,'.team-logo&&src'):pd(it,'.col-xs-1 img&&src');
                        // 一级URL
                        let url1 = pdfh(it, '.btn&&href');

                        items.push({
                            desc:desc1,
                            title:title1,
                            pic_url:picUrl1,
                            url:!/暂无/.test(pdfh(it, '.btn&&Text'))?(url1 + '|' + '88kanqiu'):'http://127.0.0.1'
                        })
                    }
                });
            }
        }
        setResult(items);
    `,
    二级:`js:
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        
        var platform = input.split('|')[1];
        var detailUrl = input.split('|')[0];
        var new_html = request(detailUrl);

        // 播放列表拼接
        var playListStr = '';
        var playListUrlStr = '';
        var playListStr_mg = '';
        var playListStr_tx = '';
        var playListStr_iqi = '';
        let playFrom = [];
        let playList = [];
        
        if (/jrkan/.test(platform)){
        
            var playUrls = pdfa(new_html, '.sub_playlist&&a');

            playUrls.map(function(it) {
                let name = pdfh(it,'strong&&Text');
                let playUrl = pd(it,'a&&data-play');
                if (/sm.html/.test(playUrl) && /id=262/.test(playUrl)){
                    name = name.replace('主播解说','主播瑶妹');
                }
                playListStr = playListStr + name + '$' + playUrl + '#';
                playListUrlStr = playListUrlStr + name + '：' + playUrl + '\\n';
    
                // 单独封装咪咕、腾讯、爱奇艺专线
                if (/mglx.php|mgxl.php|gm.php/.test(playUrl)){
                    playListStr_mg = playListStr_mg +'咪咕专线'+'$'+playUrl+'#';
                }
                else if (/i11.html/.test(playUrl)){
                    playListStr_tx = playListStr_tx +'腾讯专线'+'$'+playUrl+'#';
                }
                else if (/iqi.php/.test(playUrl)){
                    playListStr_iqi = playListStr_iqi +'爱奇艺专线'+'$'+playUrl+'#';
                }
            });
            
            if(playListStr!=='') {
                playFrom.append('JRKAN直播');
                playList.append(playListStr);
            }
            
            VOD = {
                vod_name: pdfh(new_html,'.lab_team_home&&Text') + '🆚' + pdfh(new_html,'.lab_team_away&&Text'),
                vod_pic: pd(new_html,'.lab_team_home img&&src'),
                type_name: pdfh(new_html,'.lab_events&&Text'),
                vod_content: pdfh(new_html,'.sub_list ul&&Text').replaceAll(' ', '_') + '\\n\\n' + playListUrlStr,
            };
        }
        if (/310/.test(platform)){
            VOD = {
                vod_name: pdfh(new_html,'.weikan&&Text').replaceAll(' ',''),
                type_name: pdfh(new_html,'.fenleimc_lan&&Text'),
                vod_content: detailUrl
            };
            playFrom.append('310直播');
            playList.append('信号源①'+'$'+detailUrl);
        }
        if (/17kan/.test(platform)){
        
            var playUrls = pdfa(new_html, '.now_link&&a');

            playUrls.map(function(it) {
                let name = pdfh(it,'a&&Text');
                let playUrl = pd(it,'a&&href');
                if(!/比分/.test(name)) {
                    playListStr = playListStr + name + '$' + playUrl + '#';
                    playListUrlStr = playListUrlStr + name + '：' + playUrl + '\\n';
                }
            });
            
            if(playListStr!=='') {
                playFrom.append('一起看直播');
                playList.append(playListStr);
            }
            
            VOD = {
                vod_name: pdfh(new_html,'.datetitle&&Text') + ' ' + pdfh(new_html,'.dectitle&&Text'),
                vod_content: playListUrlStr,
            };
        }
        else if (/88kanqiu/.test(platform)){

            let pdata = jsp.pdfh(new_html, "#t&&value");
            pdata = pdata.substring(6, pdata.length);
            pdata = pdata.substring(0, (pdata.length) - 2)
            pdata = base64Decode(pdata);
            let playUrls = JSON.parse(pdata).links;
            
            playUrls.map(function(it) {
                let name = it.name;
                let playUrl = urlencode(it.url);
                playListStr = playListStr + name + '$' + playUrl + '#';
                playListUrlStr = playListUrlStr + name + '：' + it.url + '\\n';
    
                // 单独封装咪咕、腾讯、爱奇艺专线
                if (/mglx.php|mgxl.php|gm.php/.test(playUrl)){
                    playListStr_mg = playListStr_mg +'咪咕专线'+'$'+playUrl+'#';
                }
                else if (/i11.html/.test(playUrl)){
                    playListStr_tx = playListStr_tx +'腾讯专线'+'$'+playUrl+'#';
                }
                else if (/iqi.php/.test(playUrl)){
                    playListStr_iqi = playListStr_iqi +'爱奇艺专线'+'$'+playUrl+'#';
                }
            });
            
            if(playListStr!=='') {
                playFrom.append('88看球');
                playList.append(playListStr);
            }
            
            VOD = {
                vod_name: pdfh(new_html,'.team-name:eq(0)&&Text') + '🆚' + pdfh(new_html,'.team-name:eq(1)&&Text'),
                vod_pic: pd(new_html,'.team-logo&&src'),
                type_name: pdfh(new_html,'.game-name&&Text'),
                vod_content: pdfh(new_html,'.col-md-4:eq(1)&&Text').replaceAll(' ', '_') + '\\n\\n' + playListUrlStr,
            };
        }
        
        if(playListStr_mg!=='') {
            playFrom.append('咪咕专线');
            playList.append(playListStr_mg);
        }
        if(playListStr_tx!=='') {
            playFrom.append('腾讯专线');
            playList.append(playListStr_tx);
        }
        if(playListStr_iqi!=='') {
            playFrom.append('爱奇艺专线');
            playList.append(playListStr_iqi);
        }
        
        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    搜索:'',
}
