var rule = {
    title:'Jav8',
    host:'https://jav8.pro',
    // 发布页：https://jav8.link/
    // 备用节点：https://jav8.vip/  https://jav8.lol/  https://jav8.one/  https://jav8.me/
    url:'/fyclass/fyfilter',
    searchUrl:'/search?type=id&q=**',
    searchable:1,
    quickSearch:1,
    class_name: '热门影片&最新影片&磁力更新&排行榜&即将发布',
    class_url: 'top-videos?page=fypage&latest?page=fypage&updated?page=fypage&rank&soon?page=fypage',
    filterable: 1,
    filter_url: '{{fl.area}}',
    filter: {
        "rank":[{"key":"area","name":"分类","value":[{"n":"90日","v":"90-days"},{"n":"30日","v":"30-days"},{"n":"7日","v":"7-days"},{"n":"昨日","v":"1-days"}]}]
    },
    filter_def:{
        'rank':{area:'7-days'}
    },
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.pro',
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    推荐:'.works .work;.work-id&&Text;.work-cover img&&src;.work-actress&&Text;a&&href',
    一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.works&&.work');
		list.forEach(it => {
		    if (/_blank/.test(pdfh(it, 'a&&target'))) {
		    } else {
                // 一级标题
                // let title1 = pdfh(it, '.work-id&&Text') + ' ' + pdfh(it, '.work-title&&title');
                let title1 = pdfh(it, '.work-id&&Text');
                // 一级描述
                let desc1;
                if(pdfh(it, '.work-actress&&Text') === '') {
                    desc1 = pdfh(it, '.work-date&&Text')
                } else {
                    desc1 = pdfh(it, '.work-actress&&Text').replace(' ', '');
                }
                // 一级图片URL
                let picUrl1 = pd(it, '.work-cover img&&src');
                // 一级URL
                let url1 = pdfh(it, 'a&&href');

                // 封装对象
                d.push({
                    title: title1,
                    desc: desc1,
                    pic_url: picUrl1,
                    url: url1
                });
		    }
		})
		setResult(d);
	`,
    二级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
        var html = request(input);
        var html_txt = request(input.replace(HOST, 'https://javtxt.one'));
        VOD = {
            vod_id: pdfh(html, '.highlight&&Text'),
            // vod_name: pdfh(html, '.highlight&&Text') + ' ' + pdfh(html, '.title&&Text'),
            vod_name: pdfh(html, '.highlight&&Text') + ' ' + pdfh(html_txt, 'h2&&Text'),
            vod_pic: pdfh(html, '#cover-img&&data-src'),
            type_name: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            // vod_year: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            // vod_area: pdfh(html, '.attributes&&dt:eq(5)&&Text'),
            vod_remarks: pdfh(html, '.highlight&&Text'),
            vod_director: pdfh(html, '.attributes&&dt:eq(4)&&Text'),
            vod_actor: pdfh(html, '.actress&&Text'),
            // vod_content: pdfh(html, '.tags&&Text'),
            vod_content: pdfh(html_txt, '.intro&&.text-zh&&p&&Text'),
        };
		var list = pdfa(html, '.magnets&&.magnet');
        let playFrom = [];
        let playList = [];
        
		list.forEach(it => {
            playFrom.append(pdfh(it, '.magnet-size&&Text'));
            playList.append(pdfh(it, '.magnet-title&&Text') + "$" + pd(it, '.magnet-title a&&href'))
		})

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    // 一级:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-actress&&Text;a&&href',
    // 二级:{
    //     // 标题;类型
    //     title:'.highlight&&Text;.attributes&&dt:eq(2)&&Text',
    //     // 封面
    //     img:'#cover-img img&&src',
    //     // 无;无;地区;演员;导演
    //     desc:';;.attributes&&dt:eq(5)&&Text;.actress&&Text;.attributes&&dt:eq(4)&&Text',
    //     // 简介
    //     content:'.title&&Text',
    //     tabs:'',
    //     tab_text:'',
    //     lists:'.magnets .magnet',
    //     list_text:'.magnet-title&&Text',
    //     list_url:'.magnet-title a&&href',
    // },
    搜索:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
}
