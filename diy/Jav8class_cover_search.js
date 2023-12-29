var rule = {
    title:'Jav8class_cover_search',
    host:'https://jav8.vip',
    url:'/top-actresses',
    searchUrl:'/actress/**?page=fypage',
    searchable:1,
    quickSearch:0,
    class_name: '全部',
    class_url: '/',
    filterable: 1,
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
    搜索:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
}
