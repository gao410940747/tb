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
    host:'http://www.jrsyyds.com/?lan=1',
    // 发布页：www.qiumi1314.com
    // 主节点：http://www.jrkan.com/
    // 联通节点：www.jrsyyds.com/  www.jryyds.com/  www.jrskan.com/  www.jrsbxj.com/  www.jrkankan.com / www.jrkan365.com /
    // 移动节点：www.jrsyyds.com/  www.jryyds.com/  www.jrskan.com/  www.jrsbxj.com/
    url:'/fyclass',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'JRS赛事直播&NBA&CBA',
    class_url:'/&NBA&CBA',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:10000,
    play_parse:true,
    lazy:"",
    limit:6,
    double:false,
    // 一级:'.loc_match:eq(2) ul;li:gt(1):lt(4)&&Text;img&&src;li:lt(2)&&Text;a:eq(1)&&href',//play.sportsteam333.com
    一级:`js:
        var items=[];
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        if(MY_PAGE===1) {
            var html=request(HOST);
            var tabs=pdfa(html,'body&&.d-touch');
            tabs.forEach(function(it){
                var pz=pdfh(it,'.name:eq(1)&&Text');
                var ps=pdfh(it,'.name:eq(0)&&Text');
                var pk=pdfh(it,'.name:eq(2)&&Text');
                var img=pd(it,'img&&src');
                var timer=pdfh(it,'.lab_time&&Text');
                var url=pd(it,'a.me&&href');
                if(MY_CATE==='NBA') {
                    if(/NBA/.test(ps)) {
                        items.push({
                            desc:timer+' '+ps,
                            title:pz+'🆚'+pk,
                            pic_url:img,
                            url:url
                        });
                    }
                }
                else if(MY_CATE==='CBA') {
                    if(/CBA/.test(ps)) {
                        items.push({
                            desc:timer+' '+ps,
                            title:pz+'🆚'+pk,
                            pic_url:img,
                            url:url
                        });
                    }
                }
                else if(MY_CATE==='AFC') {
                    if(/亚洲杯/.test(ps)) {
                        items.push({
                            desc:timer+' '+ps,
                            title:pz+'🆚'+pk,
                            pic_url:img,
                            url:url
                        });
                    }
                }
                else {
                    items.push({
                        desc:timer+' '+ps,
                        title:pz+'🆚'+pk,
                        pic_url:img,
                        url:url
                    });
                }
            });
        }
        setResult(items);
    `,
    二级:`js:
        pdfh=jsp.pdfh;
        pdfa=jsp.pdfa;
        pd=jsp.pd;
        var new_html = request(input);
        VOD = {
            vod_name: pdfh(new_html,'.lab_team_home&&Text') + '🆚' + pdfh(new_html,'.lab_team_away&&Text'),
            vod_pic: pd(new_html,'.lab_team_home img&&src'),
            type_name: pdfh(new_html,'.lab_events&&Text'),
            vod_content: pdfh(new_html,'.sub_list ul&&Text').replaceAll(' ', '_'),
        };

        // 播放列表拼接
        var playListStr = '';
        var playListStr_mg = '';
        var playListStr_tx = '';
        var playListStr_iqi = '';
        let playFrom = [];
        let playList = [];

        var playUrls = pdfa(new_html, '.sub_playlist&&a');

        playUrls.map(function(it) {
            let name = pdfh(it,'strong&&Text');
            let url = pd(it,'a&&data-play');
            if (url.startsWith("http://play.sportsteam356.com/play/sm.html?id=262")){
                name = name.replace('主播解说','主播瑶妹');
            }
            playListStr = playListStr + name+ '$' + url + '#';
        });
        playFrom.append('JRKAN直播');
        playList.append(playListStr);

        // 单独封装咪咕、腾讯、爱奇艺专线
        playUrls.map(function(it) {
            let url = pd(it,'a&&data-play');
            if (url.startsWith("http://play.sportsteam356.com/play/mglx.php")
                || url.startsWith("http://play.sportsteam356.com/play/gm.php")){
                playListStr_mg = playListStr_mg + '咪咕专线'+'$'+url+'#';
            }
            else if (/txycdn.video.qq.com/.test(url)){
                url = 'https://txycdn.video.qq.com' + url.split('txycdn.video.qq.com')[1];
                playListStr_tx = playListStr_tx + '腾讯专线'+'$'+url+'#';
            }
            else if (url.startsWith("http://play.sportsteam356.com/play/iqi.php")){
                playListStr_iqi = playListStr_iqi + '爱奇艺专线'+'$'+url+'#';
            }
        });
        if(playListStr_tx!=='') {
            playFrom.append('腾讯专线');
            playList.append(playListStr_tx);
        }
        if(playListStr_iqi!=='') {
            playFrom.append('爱奇艺专线');
            playList.append(playListStr_iqi);
        }
        if(playListStr_mg!=='') {
            playFrom.append('咪咕专线');
            playList.append(playListStr_mg);
        }

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    搜索:'',
}