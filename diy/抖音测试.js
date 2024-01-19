var rule = {
    title: '抖音测试',
    // 域名地址
    host: 'http://cfmqy.cn',
    // 首页、推荐页查询地址
    homeUrl:'/tv/api.php?type=search&wd=少',
    // 一级页面展示列表的查询地址，fyclass是动态替换class_url里的值
    url: '/tv/api.php?type=fyclass',
    // 搜索调用地址，**对应搜索的关键字
    searchUrl: '/tv/api.php?type=search&wd=**',
    // 是否开启搜索：0不开启 其他为开启
    searchable: 2,
    // 是否开启快速搜索：0不开启 其他为开启
    quickSearch: 0,
    // 一级页面顶部的tab，用&分隔
    class_name:'测试少&测试多&测试其他',
    // 一级页面顶部的tab的填充值，用&分隔，对应填充到url里的fyclass
    class_url:'search&wd=少&search&wd=多&search&wd=其他',
    headers:{
        // 手机UA:MOBILE_UA  电脑UA:PC_UA
        'User-Agent':'MOBILE_UA'
    },
    // 推荐页，也可以用js来写，填*时表示跟一级页面一样
    推荐:'*',
    // 一级页面方法1，api返回的json值不做任何改动时使用此方式，格式为:“列表;标题;封面url;副标题;进入二级时的input值”
//    一级:'json:data.list;title;cover_url;classes;id',
    // 一级页面方法2，复杂逻辑时使用js自己改动
    一级:`js:
        // 定义一级待返回的页面列表
        var items=[];
        // 通过request进行请求api接口并转换为json
        var html=JSON.parse(request(input));
        // 获取json里的list
        var list=html.data.list;
        // 对list进行循环处理
        list.forEach(function(it){
            // 定义一级副标题，此处展示为“集数+类型”，可自定义自己想要展示的值
            var desc1=it.total+it.classes;
            // 定义一级标题，此处展示为“短剧名”，可自定义自己想要展示的值
            var title1=it.title;
            // 定义一级封面URL，可自定义自己想要展示的值
            var picUrl1=it.cover_url;
            // 定义一级URL，点击该剧集时次值将传到二级页面使用，此处传“id|封面URL|集数|类型|简介”，可自定义，若二级页面调用的api接口中可以提供这些字段，则可以仅传id
            var url1=it.id+'|'+it.cover_url+'|'+it.total+'|'+it.classes+'|'+it.introduction;
            // 封装到列表中
            items.push({
                desc:desc1,
                title:title1,
                pic_url:picUrl1,
                url:url1
            });
        });
        // 将列表封装到返回结果中
        setResult(items);
    `,
    二级: `js:
        // 因为一级传了很多值过来，此处用|分隔符转成数组
        let info = input.split("|");
        // 从数组中获取id，供二级页面api接口使用
        var id = info[0];
        // 调用二级页面api接口，并转成json获取data
        var data = JSON.parse(request('http://cfmqy.cn/tv/api.php?type=parent_id&video_id='+id.replace('http://cfmqy.cn/tv/', ''))).data;
        // 封装二级页面的信息值，若无可不填
        VOD = {
            // id
            vod_id: data.id,
            // 名称
            vod_name: data.son_title,
            // 封面  使用影视app或者521影视app时可以展示此封面
            vod_pic: info[1],
            // 类型
            type_name: info[3],
            // 备注
            vod_remarks: info[2],
            // 内容/介绍
            vod_content: info[4],
//            vod_year: 年份
//            vod_area: 地区
//            vod_actor: 演员
//            vod_director: 导演
        };
        // 定义选集列表tab
        let playFrom = [];
        // 定义选集列表
        let playList = [];
        // 选集列表展示“剧集”，可自定义
        playFrom.append('剧集');
        // 将data.list循环获取展示名称和播放URL，用$分隔，例如："第1集$http://qiniu.jxkfxz.com/wz_mp40904dufei1.mp4?sign=89164bbf1ae4c756c1c75d69cca767fc&t=65a8958e"
        playList.append(data.list.map(function(it) {
            return it.num + "$" + it.son_video_url
        }).join("#"));

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    // 搜索时结果集展示的样式，填*表示跟一级一样，也可自己定义，方式同一级一样有多种
    搜索:'*',
}