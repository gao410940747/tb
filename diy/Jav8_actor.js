var rule = {
    title:'Jav8_actor',
    host:'https://jav8.pro/top-actresses',
    url:'/actress/fyclass?page=fypage',
    searchUrl:'/search?type=actress&q=**',
    searchable:0,
    quickSearch:0,
    class_parse:'.actresses .actress;a&&Text;a&&href;/actress/(\\d+)',
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.pro',
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    一级:'.works .work;.work-id&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
    二级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
        var html = request(input);
        // var html_txt = request(input.replace(HOST, 'https://javtxt.one'));
        VOD = {
            vod_id: pdfh(html, '.highlight&&Text'),
            vod_pic: pdfh(html, '#cover-img&&data-src'),
            type_name: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            // vod_year: pdfh(html, '.attributes&&dt:eq(2)&&Text'),
            // vod_area: pdfh(html, '.attributes&&dt:eq(5)&&Text'),
            vod_remarks: pdfh(html, '.highlight&&Text'),
            vod_director: pdfh(html, '.attributes&&dt:eq(4)&&Text'),
            vod_actor: pdfh(html, '.actress&&Text'),
            vod_name: pdfh(html, '.highlight&&Text') + ' ' + pdfh(html, '.title&&Text'),
            vod_content: pdfh(html, '.tags&&Text'),
            // vod_name: pdfh(html, '.highlight&&Text') + ' ' + pdfh(html_txt, 'h2&&Text'),
            // vod_content: pdfh(html_txt, '.intro&&.text-zh&&p&&Text'),
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
    搜索: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var actor_html = request(input);
		var actor = pdfh(actor_html, '.actresses&&.actress:eq(0)&&href');
		var html = request(actor);
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
}
