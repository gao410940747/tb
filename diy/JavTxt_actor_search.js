var rule = {
    title:'JavTxt_actor_search',
    host:'https://javtxt.one',
    url:'/top-actresses',
    searchUrl:'/actress/**?page=fypage',
    searchable:1,
    quickSearch:1,
    class_name: '最受欢迎女优',
    class_url: '/',
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.pro',
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
    	if (MY_PAGE === 1) {
            var html = request(input);
            var list = pdfa(html, '.actresses&&.actress');
            list.forEach(it => {
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
            })
        }
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
    搜索:'.works .work;.work-id&&Text;.work-actress img&&src;.work-meta&&Text;a&&href',
}
