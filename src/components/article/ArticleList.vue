<template>
  <div id="box" @scroll="handleScroll">
    <mu-container v-for="article in ArticleList" :key="article.id" style="margin: 7px 0;">
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-media :title="article.title" :sub-title="article.author">
          <div class="titleImg">
            <!-- <div class="photo-bg" id="head-portrait" :style="{backgroundImage: 'url(' + require('../../assets/img/'+ Imgs) + ')'}" ></div> -->
            <div class="photo-bg" id="head-portrait" :style="{backgroundImage: 'url(' + article.imgurl + ')'}" ></div>
          </div>
        </mu-card-media>
        <mu-card-text>
          <div>{{ article.guide_reading }}</div>
        </mu-card-text>
        <mu-card-actions>
          <mu-button flat @click="goPage('Details', article.id)">查看全文</mu-button>
          <!-- <input type="file" @change="addImg(article.id)"> -->
        </mu-card-actions>
      </mu-card>
    </mu-container>
  </div>
</template>
<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
Vue.use(Loading);

import Toast from 'muse-ui-toast';
Vue.use(Toast);
export default {
  name: 'ArticleList',
  data () {
    return {
      Imgs: 'back_2.jpg',
      ArticleList: [],
      index: 0,
      sign: 0
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
  },
  methods: {
    getArticleList () {
      const that = this
      var loading;
      if (that.index === that.sign) {
          loading = this.$loading({
          overlayColor: 'hsla(0,0%,100%,.9)',// 背景色
        });
      }
      this.axios.get(`${this.axios.defaults.baseURL}/article/article_list`, {params:{index:this.index}}).then((res) => {
        if (res.data.data.length !== 0) {
          for(let i = 0; i < res.data.data.length; i++) {
            this.ArticleList.push(res.data.data[i])
            this.index++
            this.sign = this.index
          };
          this.ArticleList.reverse()
        } else {
          this.$toast.message('已经是全部数据')
          this.sign++
        }
        if (loading) {
          loading.close()
        }

      })
    },
    // 压缩base64图片
    convertImgToBase64 (url, callback, outputFormat) {
      //创建canvas画布
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      //创建img对象
      var img = new Image;
      img.crossOrigin = 'Anonymous';
      //图片加载
      img.onload = function(){
          var width = img.width;
          var height = img.height;
          // 按比例压缩4倍
          var rate = (width<height ?  width/height :height/width)/4;
          //设置画布的width和height
          canvas.width = width*rate;
          canvas.height = height*rate;
          //绘制图片
          ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate);
          //压缩
          var dataURL = canvas.toDataURL(outputFormat || 'image/png');
          //转指向，返回值
          callback.call(this, dataURL);
          //清除画布
          canvas = null;
      };
		  img.src = url;
    },
    addImg (id) {
      const that = this;
      let reader =new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = function() {
        let imgUrl = this.result
        that.convertImgToBase64 (imgUrl, function (base64Img) {
          var params = new URLSearchParams()
          params.append('imgUrl', base64Img)
          params.append('id', id)
          that.axios.post(`${that.axios.defaults.baseURL}/article/addImg`, params).then((res) => {
            that.getArticleList()
          })
        })
      };
    },
    handleScroll: function () {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollObj = document.getElementById('box'); // 滚动区域
        let scrollHeight = scrollObj.offsetHeight; // div 到头部的距离
        //滚动条到底部的条件
        if(top + clientHeight - 71 == scrollHeight){
          this.getArticleList();
        }
    },
    goPage(url, id) {
      this.$router.push({ name: url, query:{id: id}})
    }
  },
  beforeMount () {
    this.getArticleList()
  },
  destroyed: function () {
    const that = this
    window.removeEventListener('scroll', that.handleScroll, true);   //  离开页面清除（移除）滚轮滚动事件
  }
}
</script>
<style scoped lang="less">
  .titleImg {
    width: 100%;
    height: 200px;
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .photo-bg {
    width:100%;
    height:100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
    .demo-loadmore-wrap {
    width: 100%;
    max-width: 360px;
    height: 420px;
    display: flex;
    flex-direction: column;
    .mu-appbar {
      width: 100%;
    }
  }
  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
