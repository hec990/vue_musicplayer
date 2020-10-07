/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var time = setTimeout(function () {
    alert("搜索框输入歌曲名称即可播放音乐哦!\n流行歌曲:\n1.你的答案-阿冗\n2.世界美好与你环环相扣-柏松\n3.我曾-隔壁老樊\n4.山楂树之恋-程佳佳\n5.太阳-王巨星");
},0);

var app = new Vue({
    el: '#music',
    data: {
        keywords: '',
        list: [],
        musicurl: '',
        picurl: '',
        hotcomments: [],
        mvurl: '',
        playingmv: false,
        musicplaying: false,
        url: ''
    },
    methods: {
        //   1: 歌曲搜索接口
        //   请求地址: https: //autumnfish.cn/search
        //       请求方法: get
        //   请求参数: keywords(查询关键字)
        //   响应内容: 歌曲搜索结果
        search: function () {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.keywords).then(function (res) {
                // console.log(1);
                // console.log(res.data.result.songs);
                that.list = res.data.result.songs
            })
        },
        // 2: 歌曲url获取接口
        // 请求地址: https: //autumnfish.cn/song/url
        //     请求方法: get
        // 请求参数: id(歌曲id)
        // 响应内容: 歌曲url地址
        // 3. 歌曲详情获取
        // 请求地址: https: //autumnfish.cn/song/detail
        //     请求方法: get
        // 请求参数: ids(歌曲id)
        // 响应内容: 歌曲详情(包括封面信息)
        // 4. 热门评论获取
        // 请求地址: https: //autumnfish.cn/comment/hot?type=0
        //     请求方法: get
        // 请求参数: id(歌曲id, 地址中的type固定为0)
        // 响应内容: 歌曲的热门评论
        playmusic: function (id) {
            var that = this;
            axios.get('https://autumnfish.cn/song/url?id=' + id).then(function (res) {
                // console.log(res.data.data[0].url);
                that.musicurl = res.data.data[0].url;
                if (that.musicurl == null) {
                    alert('此首歌曲暂无音源');
                    that.musicplaying = false;
                    return;
                } else {
                    that.musicplaying = true;
                }
            });
            axios.get('https://autumnfish.cn/song/detail?ids=' + id).then(function (res) {
                // console.log(res.data.songs[0].al.picUrl);
                that.picurl = res.data.songs[0].al.picUrl;
            });
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id).then(function (res) {
                // console.log(res);
                that.hotcomments = res.data.hotComments;
            });

        },
        //   5. mv地址获取
        //   请求地址: https: //autumnfish.cn/mv/url
        //       请求方法: get
        //   请求参数: id(mvid, 为0表示没有mv)
        //   响应内容: mv的地址
        playmv: function (id) {
            var that = this;
            if (id == 0) {
                alert('此首歌曲暂无MV');
                that.playingmv = false;
            } else {
                axios.get('https://autumnfish.cn/mv/url?id=' + id).then(function (res) {
                    // console.log(res.data.data.url);
                    that.mvurl = res.data.data.url;
                    that.playingmv = true;
                    url = that.musicurl;
                    that.musicurl = '';
                })
            }

        },
        stopmv: function () {
            this.playingmv = false;
            this.musicurl = url;
        },
        play: function () {
            this.musicplaying = true;
        },
        pause: function () {
            this.musicplaying = false;
        }
    }

})
