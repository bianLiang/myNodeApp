<template>
  <div>
    <!-- <input type="file" id="file" @change="upload"> -->
    <button class="btn btn-default" @click="goback">返回上一页</button>
    <section>
      <div v-html="ArticleHtml">
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Details',
  data () {
    return {
      ArticleId: null,
      ArticleHtml: null
    }
  },
  methods: {
    goback:function(){
      this.$router.go(-1)
    },
    getArticleDetails () {
      this.axios.get(`${this.axios.defaults.baseURL}/details/article_details`, {params:{id:this.$route.query.id}}).then((res) => {
      this.ArticleHtml = res.data.data
    })
    },
    upload () {
      const file = document.getElementById("file").files[0];
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('id', this.ArticleId)
       this.axios.post(`${this.axios.defaults.baseURL}/details/addMd`, formdata, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
         this.getArticleDetails()
       })
    }
  },
  beforeMount () {
    this.ArticleId = this.$route.query.id
    this.getArticleDetails()
  },

}
</script>
<style scoped>

</style>
