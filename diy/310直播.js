var rule = {
    title:'310直播',
    host:'http://www.310.tv',
    url:'/?s=0&t=1&a=fyclass&g=fypage',
    searchUrl:'',
    searchable:0,
    quickSearch:0,
    class_name:'热门&篮球&足球',
    class_url:'0&2&1',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    play_parse:false,
    lazy:'',
    limit:6,
    double:false,
    // 推荐:'*',
    一级:'.list_content a;.jiabifeng&&p:lt(5)&&Text;.feleimg img&&src;a&&t-nzf-o;a&&href',
    二级:'*', 
    搜索:'',
}