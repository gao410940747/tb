// 道长 drpy仓库 https://gitcode.net/qq_32394351/dr_py
// drpy安卓本地搭建说明 https://gitcode.net/qq_32394351/dr_py/-/blob/master/%E5%AE%89%E5%8D%93%E6%9C%AC%E5%9C%B0%E6%90%AD%E5%BB%BA%E8%AF%B4%E6%98%8E.md
// Pluto Player官方TG https://t.me/PlutoPlayer
// Pluto Player官方TG https://t.me/PlutoPlayerChannel

var rule = {
    title:'荐片',
    host:'http://api2.rinhome.com',
    homeUrl:'/api/tag/hand?code=unknown601193cf375db73d&channel=wandoujia',//网站的首页链接,用于分类获取和推荐获取
    url:'/api/crumb/list?area=0&page=fypage&type=0&limit=24&channel=wandoujia&code=vmosseri39898b78d878c8ca&fyfilter',
    class_name:'全部&电影&电视剧&动漫&综艺',     // 筛选 /api/term/ad_fenlei?limit=10&page=1
    class_url:'0&1&2&3&4',
    detailUrl:'/api/node/detail?channel=wandoujia&token=&id=fyid',//二级详情拼接链接(json格式用)
    searchUrl:'/api/video/search?key=**&page=fypage',
    searchable:1,
    quickSearch:1,
    filterable:1,
    filter:{
        "0":[{"key":"year","name":"年代","value":[{"n":"全部","v":"0"},{"n":"2023","v":"153"},{"n":"2022","v":"101"},{"n":"2021","v":"118"},{"n":"2020","v":"16"},{"n":"2019","v":"7"},{"n":"2018","v":"2"},{"n":"2017","v":"3"},{"n":"2016","v":"22"}]},{"key":"sort","name":"排序","value":[{"n":"更新","v":"update"},{"n":"热门","v":"hot"},{"n":"评分","v":"rating"}]}],
        "1":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"1"},{"n":"首推","v":"5"},{"n":"动作","v":"6"},{"n":"喜剧","v":"7"},{"n":"战争","v":"8"},{"n":"恐怖","v":"9"},{"n":"剧情","v":"10"},{"n":"爱情","v":"11"},{"n":"科幻","v":"12"},{"n":"动画","v":"13"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"0"},{"n":"2023","v":"153"},{"n":"2022","v":"101"},{"n":"2021","v":"118"},{"n":"2020","v":"16"},{"n":"2019","v":"7"},{"n":"2018","v":"2"},{"n":"2017","v":"3"},{"n":"2016","v":"22"}]},{"key":"sort","name":"排序","value":[{"n":"热门","v":"hot"},{"n":"评分","v":"rating"},{"n":"更新","v":"update"}]}],
        "2":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"2"},{"n":"首推","v":"14"},{"n":"国产","v":"15"},{"n":"港台","v":"16"},{"n":"日韩","v":"17"},{"n":"海外","v":"18"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"0"},{"n":"2023","v":"153"},{"n":"2022","v":"101"},{"n":"2021","v":"118"},{"n":"2020","v":"16"},{"n":"2019","v":"7"},{"n":"2018","v":"2"},{"n":"2017","v":"3"},{"n":"2016","v":"22"}]},{"key":"sort","name":"排序","value":[{"n":"热门","v":"hot"},{"n":"评分","v":"rating"},{"n":"更新","v":"update"}]}],
        "3":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"3"},{"n":"首推","v":"19"},{"n":"海外","v":"20"},{"n":"日本","v":"21"},{"n":"国产","v":"22"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"0"},{"n":"2023","v":"153"},{"n":"2022","v":"101"},{"n":"2021","v":"118"},{"n":"2020","v":"16"},{"n":"2019","v":"7"},{"n":"2018","v":"2"},{"n":"2017","v":"3"},{"n":"2016","v":"22"}]},{"key":"sort","name":"排序","value":[{"n":"热门","v":"hot"},{"n":"评分","v":"rating"},{"n":"更新","v":"update"}]}],
        "4":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"4"},{"n":"首推","v":"23"},{"n":"国产","v":"24"},{"n":"海外","v":"25"},{"n":"港台","v":"26"}]},{"key":"year","name":"年代","value":[{"n":"全部","v":"0"},{"n":"2023","v":"153"},{"n":"2022","v":"101"},{"n":"2021","v":"118"},{"n":"2020","v":"16"},{"n":"2019","v":"7"},{"n":"2018","v":"2"},{"n":"2017","v":"3"},{"n":"2016","v":"22"}]},{"key":"sort","name":"排序","value":[{"n":"热门","v":"hot"},{"n":"评分","v":"rating"},{"n":"更新","v":"update"}]}]
    },
    filter_url:'sort={{fl.sort or "hot"}}&year={{fl.year or "0"}}&category_id={{fl.cateId}}',
	filter_def:{
		0:{cateId:'0'},
        1:{cateId:'1'},
		2:{cateId:'2'},
		3:{cateId:'3'},
		4:{cateId:'4'}
	},
    headers:{
        'User-Agent':'jianpian-android/364',
        'JPAUTH':'dptq18koK6hm6mX52h1KPbUPXQ3LTZPF54qQ5n7Ff7Ta'
    },
    timeout:10000,
    limit:8,
    play_parse:true,
    play_json:[{
        re:'*',
        json:{
            parse:0,
            jx:0
        }
    }],
    lazy:'',
    // double:true,
    图片来源:'@Referer=www.jianpianapp.com@User-Agent=jianpian-version353',
    推荐:'json:data[0].video;title;path;playlist.title;id',
    一级:'json:data;title;path;playlist.title;id',
    二级: `js:
        var link = HOST + '/api/node/detail?channel=wandoujia&token=&id=' + input;
        var data = JSON.parse(request(link)).data;
        VOD = {
            vod_id: data.id,
            vod_name: data.title + ' ' + data.score + '分',
            vod_pic: data.tvimg,
            vod_remarks: data.others_name.map(function(it) {return it.value}).join(","),
            type_name: data.types.map(function(it) {return it.name}).join(","),
            vod_year: data.year.title,
            vod_area: data.area.title,
            vod_director: data.directors.map(function(it) {return it.name}).join(","),
            vod_actor: data.actors.map(function(it) {return it.name}).join(","),
            vod_content: data.description,
        };
        let playFrom = [];
        let playList = [];
        if (data.have_ftp_ur == 1) {
            playFrom.append('边下边播超清版');
            playList.append(data.new_ftp_list.map(function(it) {
                return it.title + "$" + "tvbox-xg:" + it.url
            }).join("#"))
        }
        if (data.have_m3u8_ur == 1) {
            playFrom.append('在线点播普清版');
            playList.append(data.new_m3u8_list.map(function(it) {
                return it.title + "$" + "tvbox-xg:" + it.url
            }).join("#"))
        }
        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
//    二级:{
//        // title:'data.title',
//        title:'data.title;data.types[0].name',
//        // desc:';data.description;data.id',
//        desc:'data.score;data.year.title;data.area.title;data.actors[0].name;data.directors[0].name',
//        img:'data.thumbnail',
//        // content:'data.thumbnail',
//        content:'data.description',
//        is_json:1,
//        tabs:`js:
//            TABS = [];
//            if (html.data.have_ftp_ur == 1) {
//                TABS.push("边下边播超清版")
//            }
//            if (html.data.have_m3u8_ur == 1) {
//                TABS.push("在线点播普清版")
//            }
//        `,
//        lists:`js:
//            log(TABS);
//            LISTS = [];
//            TABS.forEach(function(tab) {
//                if (/边下边播/.test(tab)) {
//                    let ftp = html.data.new_ftp_list;
//                    let d = ftp.map(function(it) {
//                        return it.title + "$" + (/m3u8/.test(it.url) ? play_url + it.url : "tvbox-xg:" + it.url)
//                    });
//                    LISTS.push(d)
//                } else if (/在线点播/.test(tab)) {
//                    let m3u = html.data.new_m3u8_list;
//                    let d = m3u.map(function(it) {
//                        return it.title + "$" + (/m3u8/.test(it.url) ? play_url + it.url : "tvbox-xg:" + it.url)
//                    });
//                    LISTS.push(d)
//                }
//            });
//        `,
//    },
    搜索:'json:data;*;thumbnail;mask;*',
}