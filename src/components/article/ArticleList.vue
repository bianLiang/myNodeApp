<template>
  <div>
    <mu-container v-for="article in ArticleList" :key="article.id" style="margin: 7px 0;">
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-media :title="article.title" :sub-title="article.author">
          <div class="titleImg">
            <div class="photo-bg" id="head-portrait" :style="{backgroundImage: 'url(' + require('../../assets/img/'+ Imgs) + ')'}" ></div>
          </div>
        </mu-card-media>
        <mu-card-text>
          <div>{{ article.content }}</div>
        </mu-card-text>
        <mu-card-actions>
          <mu-button flat>查看全文</mu-button>
          <!-- <input type="file" @change="uploadImg"> -->
        </mu-card-actions>
      </mu-card>
    </mu-container>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      Imgs: 'back_2.jpg',
      ArticleList: []
    }
  },
  methods: {
    getArticleList () {
      this.axios.get(`${this.axios.defaults.baseURL}/article/article_list`).then((res) => {
        this.ArticleList = res.data.data
        this.ArticleList.reverse()
      })
    },
    uploadImg (event) {
      let reader =new FileReader()
      console.log(event.target.files)
      let img = event.target.files[0]
      let imgName = event.target.files[0].name
      var params = new URLSearchParams()
      params.append('img', img)
      params.append('name', imgName)
      this.axios.put(`${this.axios.defaults.baseURL}/article/updataImg`, params, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
        this.ArticleList = res.data.data
      })
    }
  },
  beforeMount () {
    this.getArticleList()
  }

}
</script>
<style scoped>
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
</style>
