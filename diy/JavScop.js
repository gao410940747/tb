var rule = {
    title:'JavScop',
    host:'https://javscop.com',
    // 永久域名：https://www.javbus.com
    // 防屏蔽地址：https://www.javsee.art  https://www.busdmm.shop  https://www.seejav.art  https://www.cdnbus.shop
    url:'/page/fypage/',
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
    // 一级:'.content-loop .category-censored;.entry-title a&&Text;.thumbnail-wrap img&&style;.entry-header a&&Text;.entry-header a&&Text',
    一级: `js:
		pdfh = jsp.pdfh;
		pdfa = jsp.pdfa;
		pd = jsp.pd;
		var d = [];
		var html = request(input);
		var list = pdfa(html, '.content-loop&&.category-censored');
		list.forEach(it => {
            // 二级标题
            let title1 = pdfh(it, '.entry-title a&&Text');
            // 二级描述
            let desc1 = pdfh(it, '.entry-date&&Text');
            // 二级图片URL
            let picUrl1 = pd(it, '.attachment-post-thumb&&style');
            // 二级URL
            // let url1 = 'https://www.cdnbus.shop/' + pdfh(it, '.entry-title a&&Text').split(" ")[0];
            let url1 = 'https://www.cdnbus.shop/FSDSS-711';

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
        title:'.container h3&&Text',
        img:'*',
        desc:'',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.table tr',
        list_text:'a&&Text',
        list_url:'a&&href'
    },
    // 二级: `js:
	// 	pdfh = jsp.pdfh;
	// 	pdfa = jsp.pdfa;
	// 	pd = jsp.pd;
	// 	var d = [];
	// 	var html = request(input);
	// 	var list = pdfa(html, '.table&&tr');
	// 	list.forEach(it => {
    //         // 二级标题
    //         let title1 = pdfh(it, 'td:eq(1) a&&Text');
    //         // 二级描述
    //         let desc1 = pdfh(it, '*');
    //         // 二级图片URL
    //         let picUrl1 = pd(it, '*');
    //         // 二级URL
    //         let url1 = pdfh(it, 'td:eq(1)  a&&href');
    //
    //         // 封装对象
    //         d.push({
    //             title: title1,
    //             desc: desc1,
    //             pic_url: picUrl1,
    //             url: url1
    //         });
	// 	})
	// 	setResult(d);
	// `,
    搜索:'',
}
