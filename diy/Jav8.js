var rule = {
    title:'Jav8',
    host:'https://jav8.vip',
    url:'/fyclass/fyfilter',
    searchable:0,
    quickSearch:0,
    class_name: '热门影片&最新影片&磁力更新&排行榜&即将发布&S1 NO.1 STYLE&Prestige&SOD&FALENO&MOODYZ&Idea Pocket',
    class_url: 'top-videos?page=fypage&latest?page=fypage&updated?page=fypage&rank&soon?page=fypage&studio/763?page=fypage&studio/671?page=fypage&studio/1334?page=fypage&studio/4411?page=fypage&studio/294?page=fypage&studio/109?page=fypage&',
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
    图片来源:'@Referer=https://jav8.vip',
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    推荐:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-actress&&Text;a&&href',
    // 一级:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-actress&&Text;a&&href',
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
                let title1 = pdfh(it, '.work-id&&Text') + ' ' + pdfh(it, '.work-title&&title');
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
    二级:{
        title:'.title&&Text',
        img:'#cover-img img&&src',
        desc:'.actress&&Text',
        content:'',
        tabs:'',
        tab_text:'',
        lists:'.magnets .magnet',
        list_text:'.magnet-size&&Text',
        list_url:'.magnet-title a&&href'
    },
    // 二级: `js:
	// 	pdfh = jsp.pdfh;
	// 	pdfa = jsp.pdfa;
	// 	pd = jsp.pd;
	// 	var d = [];
	// 	var html = request(input);
	// 	var list = pdfa(html, '.magnets&&.magnet');
	// 	list.forEach(it => {
    //         // 二级标题
    //         let title1 = 'a';
    //         // let title1 = pdfh(it, '.magnet-size&&Text');
    //         // 二级描述
    //         let desc1 = 'a';
    //         // let desc1 = pdfh(it, '.actress&&Text');
    //         // 二级图片URL
    //         let picUrl1 = 'a';
    //         // let picUrl1 = pd(it, '.is-selected&&src');
    //         // 二级URL
    //         let url1 = 'a';
    //         // let url1 = pdfh(it, '.magnet-title&&href').split(';')[0];
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
