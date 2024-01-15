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
