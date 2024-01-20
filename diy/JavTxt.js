var rule = {
    title:'JavTxt',
    host:'https://javtxt.one',
    url:'/fyclass/fyfilter',
    searchUrl:'',
    searchable:1,
    quickSearch:1,
    class_name: '热门&最新&排行榜',
    class_url: 'top-videos?page=fypage&latest?page=fypage&rank',
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
    推荐: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.works&&.work');
		list.forEach(it => {
            // 一级标题
            let title1 = pdfh(it, '.work-id&&Text').split(' ')[0];
            // 一级描述
            let desc1;
            if(pdfh(it, '.work-actress&&Text') === '') {
                desc1 = pdfh(it, '.work-date&&Text')
            } else {
                desc1 = pdfh(it, '.work-actress&&Text').replace(' ', '');
            }
            // 一级图片URL
		    let id = pdfh(it, 'a&&href').split('/v/')[1];
            let picUrl1 = 'https://img.j-cdn.com/work/'+id+'.jpg';
            // 一级URL
            let url1 = pdfh(it, 'a&&href');

            // 封装对象
            d.push({
                title: title1,
                desc: desc1,
                pic_url: picUrl1,
                url: url1
            });
		})
		setResult(d);
	`,
    一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.works&&.work');
		list.forEach(it => {
            // 一级标题
            let title1 = pdfh(it, '.work-id&&Text').split(' ')[0];
            // 一级描述
            let desc1;
            if(pdfh(it, '.work-actress&&Text') === '') {
                desc1 = pdfh(it, '.work-date&&Text')
            } else {
                desc1 = pdfh(it, '.work-actress&&Text').replace(' ', '');
            }
            // 一级图片URL
		    let id = pdfh(it, 'a&&href').split('/v/')[1];
            let picUrl1 = 'https://img.j-cdn.com/work/'+id+'.jpg';
            // 一级URL
            let url1 = pdfh(it, 'a&&href');

            // 封装对象
            d.push({
                title: title1,
                desc: desc1,
                pic_url: picUrl1,
                url: url1
            });
		})
		setResult(d);
	`,
    二级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		
        var html = request(input);
		
		var id = pdfh(html, '.attributes&&dt:eq(0)&&Text').split(' ')[0];
		var actor = pdfh(html, '.actress&&Text');
		
        VOD = {
            vod_id: id,
            vod_name: id,
            vod_pic: 'https://img.j-cdn.com/work/l/'+input.split('/v/')[1]+'.jpg',
            type_name: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            vod_remarks: pdfh(html, 'h2&&Text'),
            vod_director: pdfh(html, '.attributes&&dt:eq(4)&&Text'),
            vod_actor: actor,
            vod_content: pdfh(html, '.intro&&.text-zh&&p&&Text'),
        };
        
        let playFrom = [];
        let playList = [];
        
        playFrom.append('JavTxt');
        playList.append('手动搜索' + "$" + id);

        // 最后封装所有线路
        let vod_play_from = playFrom.join('$$$');
        let vod_play_url = playList.join('$$$');
        VOD['vod_play_from'] = vod_play_from;
        VOD['vod_play_url'] = vod_play_url;
    `,
    搜索:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
}
