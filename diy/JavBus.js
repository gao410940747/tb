var rule = {
    title:'JavBus',
    host:'https://www.cdnbus.shop/',
    // 永久域名：https://www.javbus.com
    // 防屏蔽地址：https://www.javsee.art  https://www.busdmm.shop  https://www.seejav.art  https://www.cdnbus.shop
    url:'/page/fypage',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name: '全部',
    class_url: '/',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    limit:6,
    double:false,
    // 一级:'.masonry .masonry-brick;.photo-info span&&Text;.photo-frame&&src;.item-tag date&&Text;.movie-box a&&href',
    一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.masonry.waterfall&&.item');
		list.forEach(it => {
            // 一级标题
            let title1 = pdfh(it, '.photo-frame img&&title');
            // 一级描述
            let desc1 = pdfh(it, 'date&&Text');
            // 一级图片URL
            let picUrl1 = pdfh(it, '.photo-frame img&&src');
            // 一级URL
            let url1 = pd(it, 'a&&href');
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
    二级:{
        title:'.Content-top h2&&Text',
        img:'*',
        desc:'',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.Content-body p:gt(1)',
        list_text:'a&&Text',
        list_url:'a&&href'
    },
    搜索:'',
}
