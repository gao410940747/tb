var rule = {
    title:'央视频',
    host:'https://api.cntv.cn',
    homeUrl: '/lanmu/columnSearch?&fl=&fc=&cid=&p=1&n=500&serviceId=tvcctv&t=json',
    url:'/list/getVideoAlbumList?area=&year=&letter=&n=24&serviceId=tvcctv&t=json',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name: '特别节目&纪录片&电视剧&动画片',
    class_url: '特别节目&纪录片&电视剧&动画片',
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
            // 一级URL（id 地区 类型 标题 演员 年份 频道 简介 图片）
//            let url1 = it.id + '|' + it.area + '|' + it.sc + '|' + it.title + '|' + it.actors + '|' + it.year + '|' + it.channel + '|' + it.brief + '|' + it.image;
            d.push({
                desc : desc1,
                title : title1,
                pic_url : picUrl1,
//                url : url1
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
            let desc1 = it.sc + '•共' + it.count + '集' + (typeof it.year==='undefined'?'':'•'+it.year);
            // 一级图片URL
            let picUrl1 = it.image;
            // 一级URL（id 地区 类型 标题 演员 年份 频道 简介 图片 集数）
            let url1 = it.id + '|' + it.area + '|' + it.sc + '|' + it.title + '|' + it.actors + '|' + it.year + '|' + it.channel + '|' + it.brief + '|' + it.image + '|' + it.count;
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
            type_name: info[2],
            vod_year: info[5]==='undefined'?'':info[5],
            vod_area: info[1]==='undefined'?'':info[1],
            vod_remarks: '共'+info[9]+'集',
            vod_director: info[6],
            vod_actor: info[4]==='undefined'?'':info[4],
            vod_content: info[7],
        };
        var link = 'https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id='+info[0]+'&serviceId=tvcctv&p=1&n=100&mode=0&pub=1';
        var playUrls = JSON.parse(request(link)).data.list;
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
