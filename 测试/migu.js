var rule = {
    title:'咪咕直播',
    host:'https://program-sc.miguvideo.com',
    homeUrl: '/live/v2/tv-data/a5f78af9d160418eb679a6dd0429c920',
    url:'/live/v2/tv-data/fyclass',
    searchable:0,
    quickSearch:0,
    class_name: '央视&卫视&地方&体育&影视&纪实',
    class_url: 'a5f78af9d160418eb679a6dd0429c920&0847b3f6c08a4ca28f85ba5701268424&855e9adc91b04ea18ef3f2dbd43f495b&7538163cdac044398cb292ecf75db4e0&10b0d04cb23d4ac5945c4bc77c7ac44e&e1165138bdaa44b9a3138d74af6c6673',
    headers:{
        'User-Agent':'Mozilla/5.0 (Linux; Android 10; ZTE A2020 Pro Build/QKQ1.200815.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36'
    },
    timeout:10000,
    play_parse:true,
    limit:6,
    double:false,
    推荐: `js:
        var d = [];
        var dataList = JSON.parse(request(input)).body.dataList;
        dataList.forEach(it => {
            d.push({
                title: it.name,
                desc: it.nowPlaying,
                pic_url: it.h5pics.highResolutionV,
                // pID | 频道名称 | 封面 | 正在播放节目 | 开始时间 | 结束时间 | 下个节目 | 下个节目开始时间 | 下个节目结束时间
                url: it.pID + '|' + it.name + '|' + it.h5pics.highResolutionH + '|' + it.nowPlaying + '|' + it.startTime + '|' + it.endTime + '|' + it.next.playName + '|' + it.next.startTime + '|' + it.next.endTime + '|央视'
            });
        });
        setResult(d);
    `,
    一级: `js:
        if(MY_PAGE === 1) {
            var d = [];
            var dataList = JSON.parse(request(input)).body.dataList;
            dataList.forEach(it => {
                d.push({
                    title: it.name,
                    desc: it.nowPlaying,
                    pic_url: it.h5pics.highResolutionV,
                    // pID | 频道名称 | 封面 | 正在播放节目 | 开始时间 | 结束时间 | 下个节目 | 下个节目开始时间 | 下个节目结束时间
                    url: it.pID + '|' + it.name + '|' + it.h5pics.highResolutionH + '|' + it.nowPlaying + '|' + it.startTime + '|' + it.endTime + '|' + it.next.playName + '|' + it.next.startTime + '|' + it.next.endTime + '|' + MY_CATE
                });
            });
            setResult(d);
        }
    `,
    二级: `js:
        let info = input.split("|");
        let req = 'http://webapi.miguvideo.com/gateway/playurl/v2/play/playurlh5?contId='+info[0]+'&rateType=2&clientId=472488a6de2aadeeb7c31dcf06812088&startPlay=true&xh265=true&channelId=0131_10010001005';
        let body = JSON.parse(request(req)).body;
        VOD = {
            vod_id: info[0],
            vod_name: info[1],
            vod_pic: info[2],
            type_name: info[9],
            vod_remarks: info[4] + '~' + info[5] + '：' + info[3],
            vod_content: info[7] + '~' + info[8] + '：' + info[6],
            vod_director: body.bcName,
            vod_actor: body.contName,
        };
        let playFrom = [];
        let playList = [];
        playFrom.append('咪咕直播');
        playList.append(body.urlInfos.map(function(it) {
            return it.rateDesc + "$" + it.url
        }).join("#"));

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    搜索:'',
}