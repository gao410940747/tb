var rule = {
    title: '博看听书',
    host: 'https://api.bookan.com.cn',
    homeUrl:'/v2/org/resource-group/resources?instanceId=16935&groupId=178', //首页展示好书推荐
//    homeUrl:'/v2/org/resource-group/resources?instanceId=16935&groupId=179', //首页展示新书上架
//    homeUrl:'/voice/book/latest?instanceId=16935&page=fypage', //首页展示新书上架
    url: '/voice/book/list?instance_id=25304&page=fypage&category_id=fyclass&num=24',
    detailUrl:'/voice/album/units?album_id=fyid&page=1&num=200&order=1',
    searchUrl: 'https://es.bookan.com.cn/api/v3/voice/book?instanceId=25304&keyword=**&pageNum=fypage&limitNum=20',
    searchable: 2,
    quickSearch: 0,
    class_name:'经典必读&个人提升&文学文艺&国学经典&心理哲学&青春励志&历史小说&故事会&音乐戏曲&相声评书&少年读物&儿童文学&育儿心经&家庭健康&商业财经&科技科普&红色岁月&社会观察',
    class_url:'1314&1308&1306&1320&1310&1307&1312&1303&1317&1319&1305&1304&1309&1311&1315&1313&1316&1318',
    headers:{'User-Agent':'MOBILE_UA'},
    推荐:'*',
    一级:'json:data.list;name;cover;extra.author;id',
    二级:'js:let d=[];VOD={vod_url:input,vod_name:"",vod_actor:"",vod_year:"",vod_director:""};let playlists=[];let data=JSON.parse(request(input)).data;VOD.vod_name=data.list[0].id;VOD.vod_actor="▶️创建于"+data.list[0].created_at;VOD.vod_year=data.list[0].created_at.split("-")[0];VOD.vod_director="▶️更新于"+data.list[0].updated_at;let total=data.total;playlists=data.list;if(total>200){for(let i=2;i<total/200+1;i++){let listUrl=input.split("&")[0]+"&page="+i+"&num=200&order=1";let data=JSON.parse(request(listUrl)).data;playlists=playlists.concat(data.list)}}playlists.forEach(function(it){d.push({title:it.title,url:it.file})});VOD.vod_play_from="bookan";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");',
    搜索:'*',
}