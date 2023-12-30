var rule = {
    title:'无极磁力',
    host:'https://0cili.eu',
    // 发布页：https://cili404.com/
    // 备用节点：https://0cili.com/  https://cili.uk/  https://wuji.me/
    searchUrl:'/search?q=**',
    searchable:1,
    quickSearch:1,
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:15000,
    play_parse:true,
    limit:10,
    double:false,
    一级:'',
    二级:{
        // 标题;类型
        title:'.magnet-title&&Text',
        // 封面
        img:'img:eq(0)&&src',
        // 无;无;地区;演员;导演
        desc:'',
        // 简介
        content:'.torrent-info dd:gt(1)&&Text',
        tabs:'',
        tab_text:'',
        // lists:'.input-group-btn a:eq(1)&&href',
        lists:'.input-group-btn a:gt(0)',
        list_text:'a&&data-original-title',
        list_url:'a&&href'
    },
    搜索:'.file-list tbody&&tr;.sample&&Text;*;*;a&&href',
}
