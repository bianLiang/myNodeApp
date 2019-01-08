<template>
  <div>
    这是详情页面
    <!-- <form  action='http://localhost:80/details/addMd'enctype="multipart/form-data" method="post">
      <input type="file">
      <input type="submit">
    </form> -->
    <input type="file" id="file" @change="upload">

    <button @click="goback">返回上一页</button>
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
    upload () {
      const file = document.getElementById("file").files[0];
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('id', this.ArticleId)
       this.axios.post(`${this.axios.defaults.baseURL}/details/addMd`, formdata, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {

       })
    }
  },
  beforeMount () {
    this.ArticleId = this.$route.query.id
    this.axios.get(`${this.axios.defaults.baseURL}/details/article_details`, {params:{id:this.$route.query.id}}).then((res) => {
      this.ArticleHtml = res.data.data;
    })
  },

}
</script>
<style scoped>

</style>
