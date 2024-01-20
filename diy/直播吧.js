var rule = {
    title:'直播吧',
    host:'https://www.zhibo8.com',
    homeUrl:'/nba/more.htm',
    // url:'/nba/json/2024-01-10.htm',
    url:'/nba/more.htm?label=fyclass',
    searchable:0,
    quickSearch:0,
    class_name:'快船视频',
    class_url:'快船',
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
            let html = 'https://weibo.com/ajax/statuses/show?id=' + pid + '&locale=zh-CN';
            let media_info = JSON.parse(request(html)).page_info.media_info;
            if (/1883881851/.test(userid)) {
                input = media_info.playback_list[0].play_info.url;
            } else {
                input = media_info.mp4_hd_url;
            }
        }
    `,
    推荐:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var html=request(input);
        
        var list=pdfa(html,'.dataList&&li');

        list.forEach(function(it){
        
            if(/集锦/.test(pdfh(it,'li&&data-label')) || /佳球/.test(pdfh(it,'li&&data-label'))) {
            }
            else {
                // 一级标题
                let title1 = pdfh(it,'a&&Text');
                // 一级描述
                let desc1 = pdfh(it,'.postTime&&Text') + pdfh(it,'li&&data-label').replaceAll(',', ' ');
                // 一级图片URL
                let picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                // let picUrl1 = 'http://tu.duoduocdn.com/img/logo8.png';
                // 一级URL
                let url1 = pd(it, 'a&&href');
                
                items.push({
                    desc:desc1,
                    title:title1,
                    pic_url:picUrl1,
                    url:url1
                });
            }
        });
        setResult(items);
    `,
    一级:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        
        if(MY_PAGE===1) {
            var html = request(input);
            var list = pdfa(html,'.dataList&&li');
            list.forEach(function(it){
            
                if(/集锦/.test(pdfh(it,'li&&data-label')) || /佳球/.test(pdfh(it,'li&&data-label'))) {
                }
                else if(/快船/.test(pdfh(it,'li&&data-label'))) {
                    // 一级标题
                    let title1 = pdfh(it,'a&&Text');
                    // 一级描述
                    let desc1 = pdfh(it,'.postTime&&Text') + pdfh(it,'li&&data-label').replaceAll(',', ' ');
                    // 一级图片URL
                    let picUrl1 = 'https://cdn.leisu.com/basketball/teamflag_s/848b21021b2a1db7bde95ea52a1e021b.png?imageMogr2/auto-orient/thumbnail/200x200';
                    // 一级URL
                    let url1 = pd(it, 'a&&href');
                    
                    items.push({
                        desc:desc1,
                        title:title1,
                        pic_url:picUrl1,
                        url:url1
                    });
                }
            });
        } else {
            // 创建一个新的 Date 对象表示当前时间
            var currentDate = new Date();
            // 计算上一天日期
            var lastDate = currentDate.getDate() - 1;
            
            var year = lastDate.getFullYear(); 
            var month =(lastDate.getMonth() + 1).toString(); 
            var day = (lastDate.getDate()).toString();  
            if (month.length == 1) { 
                month = "0" + month; 
            } 
            if (day.length == 1) { 
                day = "0" + day; 
            }
            var lastDateStr = year + "-" + month + "-" + day;
            
            var html = 'https://www.zhibo8.com/nba/json/'+lastDateStr+'.htm';
            var json = JSON.parse(request(html));
            var date = json.date;
            var list = json.video_arr;
    
            list.forEach(function(it){
            
                if(/集锦/.test(it.lable) || /佳球/.test(it.lable)) {
                }
                else if(/快船/.test(it.lable)) {
                    // 一级标题
                    let title1 = it.title;
                    // 一级描述
                    let desc1 = date;
                    // 一级图片URL
                    let picUrl1 = it.thumbnail;
                    // 一级URL
                    let url1 = HOST + it.url;
                    
                    items.push({
                        desc:desc1,
                        title:title1,
                        pic_url:picUrl1,
                        url:url1
                    });
                }
            });
        }
        setResult(items);
    `,
    二级: `js:
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var new_html = request(input);
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
    `,
    搜索:'',
}
