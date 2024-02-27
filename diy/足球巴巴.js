var rule = {
    title:'足球巴巴',
    编码:'gbk',
    host:'https://www.zqbaba.net',
    url:'/fyclass',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'全部比赛&NBA&CBA',
    class_url:'/&NBA&CBA',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:10000,
    play_parse:true,
    lazy:"",
    limit:6,
    double:false,
    一级:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        if(MY_PAGE===1) {
            var html=request(HOST);
            var tabs=pdfa(html,'#table16&&table:eq(1)&&tr');
            tabs.forEach(function(it){
                if(/:/.test(pdfh(it,'font&&Text'))){
                    var title = pdfh(it,'font:eq(0)&&Text') + ' ' + pdfh(it,'font:eq(1)&&Text') + ' ' + pdfh(it,'font:eq(2)&&Text') + ' ' + pdfh(it,'font:eq(3)&&Text');
                    var split = title.split(' ');
                    var desc1;
                    var title1;
                    var picUrl1 = '';
                    if(split[2]!=='undefined' && split[2]!==''){
                        desc1 = split[0] + ' ' + split[1];
                        title1 = (split[2]+split[3]+split[4]+split[5]+split[6]).replaceAll('VS','🆚').replaceAll('vs','🆚').replaceAll('undefined','');
                    } else {
                        desc1 = split[0];
                        title1 = (split[1]+split[2]+split[3]+split[4]+split[5]+split[6]).replaceAll('VS','🆚').replaceAll('vs','🆚').replaceAll('undefined','');
                    }
                    if(/NBA/.test(title)){
                        // NBA默认LOGO
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    if(/CBA/.test(title)){
                        // CBA默认LOGO
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    if(MY_CATE==='NBA') {
                        if(/NBA/.test(title)) {
                            items.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:HOST+title
                            });
                        }
                    }
                    else if(MY_CATE==='CBA') {
                        if(/CBA/.test(title)) {
                            items.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:HOST+title
                            });
                        }
                    }
                    else {
                        items.push({
                            desc:desc1,
                            title:title1,
                            pic_url:picUrl1,
                            url:HOST+title
                        });
                    }
                }
            });
            var tabs2=pdfa(html,'#table16&&table:eq(2)&&tr');
            tabs2.forEach(function(it){
                if(/:/.test(pdfh(it,'font&&Text'))){
                    var title = pdfh(it,'font:eq(0)&&Text') + ' ' + pdfh(it,'font:eq(1)&&Text') + ' ' + pdfh(it,'font:eq(2)&&Text') + ' ' + pdfh(it,'font:eq(3)&&Text');
                    var split = title.split(' ');
                    var desc1;
                    var title1;
                    var picUrl1 = '';
                    if(split[2]!=='undefined' && split[2]!==''){
                        desc1 = split[0] + ' ' + split[1];
                        title1 = (split[2]+split[3]+split[4]+split[5]+split[6]).replaceAll('VS','🆚').replaceAll('vs','🆚').replaceAll('undefined','');
                    } else {
                        desc1 = split[0];
                        title1 = (split[1]+split[2]+split[3]+split[4]+split[5]+split[6]).replaceAll('VS','🆚').replaceAll('vs','🆚').replaceAll('undefined','');
                    }
                    if(/NBA/.test(title)){
                        // NBA默认LOGO
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2021/01/22/FvabFeKVjHyOyva-Bo51rrTrOGao?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    if(/CBA/.test(title)){
                        // CBA默认LOGO
                        picUrl1 = 'https://cdn.leisu.com/basketball/eventlogo/2020/11/11/Fit9bwsfH7ZD-dOf7cPFO5gtWG9W?imageMogr2/auto-orient/thumbnail/200x200%3E';
                    }
                    if(MY_CATE==='NBA') {
                        if(/NBA/.test(title)) {
                            items.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:title
                            });
                        }
                    }
                    else if(MY_CATE==='CBA') {
                        if(/CBA/.test(title)) {
                            items.push({
                                desc:desc1,
                                title:title1,
                                pic_url:picUrl1,
                                url:title
                            });
                        }
                    }
                    else {
                        items.push({
                            desc:desc1,
                            title:title1,
                            pic_url:picUrl1,
                            url:title
                        });
                    }
                }
            });
        }
        setResult(items);
    `,
    二级:`js:
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;

        // 播放列表拼接
        var playListStr = '';
        var playListStr_mg = '';
        var playListStr_tx = '';
        var playListStr_iqi = '';
        let playFrom = [];
        let playList = [];

        var title = '';
        var html=request(HOST);
        var tabs=pdfa(html,'#table16&&tr');
        tabs.forEach(function(it){
            if(/:/.test(pdfh(it,'font&&Text'))){
                title = pdfh(it,'font:eq(0)&&Text') + ' ' + pdfh(it,'font:eq(1)&&Text') + ' ' + pdfh(it,'font:eq(2)&&Text') + ' ' + pdfh(it,'font:eq(3)&&Text');
            }
            else{
                if(input.replace(HOST,'').replaceAll(' ','')===title.replaceAll(' ','')){
                    VOD = {
                        vod_name: input.replace(HOST,''),
                        vod_content: title
                    };
                    if(!/比分直播|文字直播/.test(pdfh(it,'font&&Text'))){
                        var urlList=pdfa(it,'font&&a');
                        urlList.forEach(function(it){
                            var name = pdfh(it,'a&&Text');
                            var url = pd(it,'a&&href');
                            playListStr = playListStr + name + '$' + url + '#';

                            if (/mglx.php|gm.php/.test(url)){
                                playListStr_mg = playListStr_mg +'咪咕专线'+'$'+url+'#';
                            }
                            else if (/i11.html/.test(url)){
                                playListStr_tx = playListStr_tx +'腾讯专线'+'$'+url+'#';
                            }
                            else if (/iqi.php/.test(url)){
                                playListStr_iqi = playListStr_iqi +'爱奇艺专线'+'$'+url+'#';
                            }
                        })
                    }
                }
            }
        })
        if(playListStr!=='') {
            playFrom.append('足球巴巴');
            playList.append(playListStr);
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