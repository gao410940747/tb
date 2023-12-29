var rule = {
    title:'Jav8class_no_cover',
    host:'https://jav8.vip/top-actresses',
    url:'/actress/fyclass?page=fypage',
    searchable:1,
    quickSearch:0,
    class_parse:'.actresses .actress;a&&Text;a&&href;/actress/(\\d+)',
    filterable: 1,
    headers:{
        'User-Agent':'PC_UA'
    },
    图片来源:'@Referer=https://jav8.vip',
    playerType:2,
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    一级:'.works .work;.work-intro&&Text;.work-cover img&&src;.work-date&&Text;a&&href',
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
    搜索:'',
}
