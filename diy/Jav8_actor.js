var rule = {
    title:'Jav8_actor',
    host:'https://jav8.vip/top-actresses',
    url:'/actress/fyclass?page=fypage',
    searchable:0,
    quickSearch:0,
    class_parse:'.actresses .actress;a&&Text;a&&href;/actress/(\\d+)',
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.vip',
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
    搜索:'',
}
