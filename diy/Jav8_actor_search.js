var rule = {
    title:'Jav8_actor_search',
    host:'https://jav8.vip',
    url:'/top-actresses',
    searchUrl:'/actress/**?page=fypage',
    searchable:1,
    quickSearch:1,
    class_name: '演员',
    class_url: '/',
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.vip',
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    // 一级:'.actresses .actress;.actress-name&&Text;.avatar img&&src;;a&&href',
    一级: `js:
    	pdfh = jsp.pdfh;
    	pdfa = jsp.pdfa;
    	pd = jsp.pd;
    	var d = [];
    	if (MY_PAGE === 1) {
            var html = request(input);
            var list = pdfa(html, '.actresses&&.actress');
            list.forEach(it => {
                if (/_blank/.test(pdfh(it, '.work&&target'))) {
                } else {
                    // 一级标题
                    let title1 = pdfh(it, 'a&&href').replace('/actress/', '');
                    // 一级描述
                    let desc1 = pdfh(it, '.actress-name&&Text');
                    // 一级图片URL
                    let picUrl1 = pd(it, '.avatar&&src');
                    // 一级URL
                    let url1 = '';
        
                    // 封装对象
                    d.push({
                        title: title1,
                        desc: desc1,
                        pic_url: picUrl1,
                        url: url1
                    });
                }
            })
    	}
    	setResult(d);
    `,
    二级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
        var html = request(input);
        VOD = {
            vod_id: pdfh(html, '.highlight&&Text'),
            vod_name: pdfh(html, '.highlight&&Text') + ' ' + pdfh(html, '.title&&Text'),
            vod_pic: pd(html, '#cover-img&&data-src'),
            type_name: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            vod_year: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            // vod_area: pdfh(html, '.attributes&&dt:eq(5)&&Text'),
            vod_remarks: pdfh(html, '.highlight&&Text'),
            vod_director: pdfh(html, '.attributes&&dt:eq(4)&&Text'),
            vod_actor: pdfh(html, '.actress&&Text'),
            vod_content: pdfh(html, '.tags&&Text'),
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
    搜索:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
}
