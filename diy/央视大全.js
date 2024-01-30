var rule = {
    title:'央视频',
    host:'https://api.cntv.cn',
    homeUrl: '/lanmu/columnSearch?&fl=&fc=&cid=&p=1&n=500&serviceId=tvcctv&t=json',
    url:'/list/getVideoAlbumList?channel=fyfilter&area=&year=&letter=&n=24&serviceId=tvcctv&t=json',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name: '特别节目&纪录片&电视剧&动画片',
    class_url: '特别节目&纪录片&电视剧&动画片',
    filterable: 1,
    filter_url: '{{fl.channel}}',
    filter: {
		"纪录片":[
            {"key":"channel","name":"频道","value":[{"n":"全部","v":""},{"n":"CCTV-1综合","v":"CCTV-1综合,CCTV-1高清,CCTV-1综合高清"},{"n":"CCTV-2财经","v":"CCTV-2财经,CCTV-2高清,CCTV-2财经高清"},{"n":"CCTV-3综艺","v":"CCTV-3综艺,CCTV-3高清,CCTV-3综艺高清"},{"n":"CCTV-4中文国际","v":"CCTV-4中文国际,CCTV-4高清,CCTV-4中文国际(亚)高清"},{"n":"CCTV-5体育","v":"CCTV-5体育,CCTV-5高清,CCTV-5体育高清"},{"n":"CCTV-6电影","v":"CCTV-6电影,CCTV-6高清,CCTV-6电影高清"},{"n":"CCTV-7国防军事","v":"CCTV-7国防军事,CCTV-7高清,CCTV-7国防军事高清"},{"n":"CCTV-8电视剧","v":"CCTV-8电视剧,CCTV-8高清,CCTV-8电视剧高清"},{"n":"CCTV-9纪录","v":"CCTV-9纪录,CCTV-9高清,CCTV-9纪录高清"},{"n":"CCTV-10科教","v":"CCTV-10科教,CCTV-10高清,CCTV-10科教高清"},{"n":"CCTV-11戏曲","v":"CCTV-11戏曲,CCTV-11高清,CCTV-11戏曲高清"},{"n":"CCTV-12社会与法","v":"CCTV-12社会与法,CCTV-12高清,CCTV-12社会与法高清"},{"n":"CCTV-13新闻","v":"CCTV-13新闻,CCTV-13高清,CCTV-13新闻高清"},{"n":"CCTV-14少儿","v":"CCTV-14少儿,CCTV-14高清,CCTV-14少儿高清"},{"n":"CCTV-15音乐","v":"CCTV-15音乐,CCTV-15高清,CCTV-15音乐高清"},{"n":"CCTV-17农业农村","v":"CCTV-17农业农村,高清,高清"}]},
		],
		"特别节目":[
            {"key":"channel","name":"频道","value":[{"n":"全部","v":""},{"n":"CCTV-1综合","v":"CCTV-1综合,CCTV-1高清,CCTV-1综合高清"},{"n":"CCTV-2财经","v":"CCTV-2财经,CCTV-2高清,CCTV-2财经高清"},{"n":"CCTV-3综艺","v":"CCTV-3综艺,CCTV-3高清,CCTV-3综艺高清"},{"n":"CCTV-4中文国际","v":"CCTV-4中文国际,CCTV-4高清,CCTV-4中文国际(亚)高清"},{"n":"CCTV-5体育","v":"CCTV-5体育,CCTV-5高清,CCTV-5体育高清"},{"n":"CCTV-6电影","v":"CCTV-6电影,CCTV-6高清,CCTV-6电影高清"},{"n":"CCTV-7国防军事","v":"CCTV-7国防军事,CCTV-7高清,CCTV-7国防军事高清"},{"n":"CCTV-8电视剧","v":"CCTV-8电视剧,CCTV-8高清,CCTV-8电视剧高清"},{"n":"CCTV-9纪录","v":"CCTV-9纪录,CCTV-9高清,CCTV-9纪录高清"},{"n":"CCTV-10科教","v":"CCTV-10科教,CCTV-10高清,CCTV-10科教高清"},{"n":"CCTV-11戏曲","v":"CCTV-11戏曲,CCTV-11高清,CCTV-11戏曲高清"},{"n":"CCTV-12社会与法","v":"CCTV-12社会与法,CCTV-12高清,CCTV-12社会与法高清"},{"n":"CCTV-13新闻","v":"CCTV-13新闻,CCTV-13高清,CCTV-13新闻高清"},{"n":"CCTV-14少儿","v":"CCTV-14少儿,CCTV-14高清,CCTV-14少儿高清"},{"n":"CCTV-15音乐","v":"CCTV-15音乐,CCTV-15高清,CCTV-15音乐高清"},{"n":"CCTV-17农业农村","v":"CCTV-17农业农村,高清,高清"}]},
		],
    },
    filter_def:{
        '特别节目':{area:'全部'},
        '纪录片':{area:'全部'}
    },
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:10000,
    play_parse:true,
    lazy:`js:
        input=JSON.parse(request('https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid='+input)).hls_url.replaceAll('main','2000');
    `,
    limit:6,
    double:false,
    推荐:`js:
        var d = [];
        var list = JSON.parse(request(input)).response.docs;
        list.forEach(it => {
            // 一级标题
            let title1 = it.column_name;
            // 一级描述
            let desc1 = it.channel_name;
            // 一级图片URL
            let picUrl1 = it.column_logo;
            // 一级URL（id 地区 类型 标题 演员 年份 频道 简介 图片 更新至）
            let url1 = it.lastVIDE.videoSharedCode + '|' + '' + '|' + it.column_firstclass + '|' + it.column_name + '|' + '' + '|' + it.column_playdate + '|' + it.channel_name + '|' + it.column_brief + '|' + it.column_logo + '|' + '' + '|' + it.lastVIDE.videoTitle;
            d.push({
                desc : desc1,
                title : title1,
                pic_url : picUrl1,
                url : url1
            })
        })
        setResult(d);
    `,
    一级:`js:
        var d = [];
        var channelMap = {
            "特别节目": "CHAL1460955953877151",
            "纪录片": "CHAL1460955924871139",
            "电视剧": "CHAL1460955853485115",
            "动画片": "CHAL1460955899450127",
        };
        var list = JSON.parse(request(input+'&channelid='+channelMap[MY_CATE]+'&fc='+MY_CATE+'&p='+MY_PAGE)).data.list;
        list.forEach(it => {
            // 一级标题
            let title1 = it.title;
            // 一级描述
            let desc1 = it.sc + ((typeof it.year==='undefined' || it.year==='')?'':('•'+it.year)) + ((typeof it.count==='undefined' || it.count==='')?'':('•共' + it.count + '集'));
            // 一级图片URL
            let picUrl1 = it.image;
            // 一级URL（id 地区 类型 标题 演员 年份 频道 简介 图片 集数）
            let url1 = it.id + '|' + it.area + '|' + it.sc + '|' + it.title + '|' + it.actors + '|' + it.year + '|' + it.channel + '|' + it.brief + '|' + it.image + '|' + it.count + '|' + '' + '|' + MY_CATE;
            d.push({
                desc : desc1,
                title : title1,
                pic_url : picUrl1,
                url : url1
            })
        })
        setResult(d);
    `,
    二级: `js:
        let info = input.split("|");
        
        VOD = {
            vod_id: info[0],
            vod_name: info[3],
            vod_pic: info[8],
            type_name: info[2]==='undefined'?'':info[2],
            vod_year: info[5]==='undefined'?'':info[5],
            vod_area: info[1]==='undefined'?'':info[1],
            vod_remarks: info[9]===''?('更新至'+info[10]):('共'+info[9]+'集'),
            vod_director: info[6]==='undefined'?'':info[6],
            vod_actor: info[4]==='undefined'?'':info[4],
            vod_content: info[7]==='undefined'?'':info[7],
        };
        var modeMap = {
            "特别节目": "0",
            "纪录片": "0",
            "电视剧": "0",
            "动画片": "1",
        };
        var ctid = info[0].replace('https://api.cntv.cn/lanmu/','');
        var link = 'https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id='+ctid+'&serviceId=tvcctv&p=1&n=100&mode='+modeMap[info[11]]+'&pub=1';
        var html = JSON.parse(request(link));
        var playUrls;
        if(html.errcode==='1001'){
            var guid = info[0].replace('https://api.cntv.cn/lanmu/','');
            var link1 = 'https://api.cntv.cn/video/videoinfoByGuid?guid='+guid+'&serviceId=tvcctv';
            ctid = JSON.parse(request(link1)).ctid.replace('https://api.cntv.cn/lanmu/','');
            var link2 = 'https://api.cntv.cn/NewVideo/getVideoListByColumn?id='+ctid+'&d=&p=1&n=100&sort=desc&mode=0&serviceId=tvcctv&t=json';
            playUrls = JSON.parse(request(link2)).data.list;
            // 获取更多数据，暂不需要
            // var flag = '';
            // if(playUrls===''){
            //     flag = 'true';
            // }
            // var page = 1;
            // while(flag===''){
            //     page = page+1;
            //     var burl = 'https://api.cntv.cn/NewVideo/getVideoListByColumn?id='+ctid+'&d=&p='+page+'&n=100&sort=desc&mode=0&serviceId=tvcctv&t=json';
            //     var list = JSON.parse(request(burl)).data.list;
            //     if (list.length!==0){
            //         list.forEach(it => {
            //             playUrls.push(it);
            //         })
            //         continue;
            //     }else{
            //         flag='true';
            //         break;
            //     }
            // }
        } else {
            playUrls = html.data.list;
            // 获取更多数据，暂不需要
            var flag = '';
            if(playUrls===''){
                flag = 'true';
            }
            var page = 1;
            while(flag===''){
                page = page+1;
                var burl = 'https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id='+ctid+'&serviceId=tvcctv&p='+page+'&n=100&mode='+modeMap[info[11]]+'&pub=1';
                var list = JSON.parse(request(burl)).data.list;
                if (list.length!==0){
                    list.forEach(it => {
                        playUrls.push(it);
                    })
                    continue;
                }else{
                    flag='true';
                    break;
                }
            }
        }
        
        let playFrom = [];
        let playList = [];
        playFrom.append('央视频');
        playUrls.forEach(it => {
            playList.append(playUrls.map(function(it) {
                return it.title + "$" + it.guid
            }).join("#"))
        });

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    搜索:'',
}
