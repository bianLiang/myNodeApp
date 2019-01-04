<template>
  <div>
    <section>
      <ArticleList></ArticleList>
    </section>
    <footer>
      <BottomNavigation  BottomNav="article"></BottomNavigation>
    </footer>
  </div>
</template>
<script>
import BottomNavigation from '../public-components/BottomNavigation'
import ArticleList from './ArticleList'
export default {
  name: 'Article',
  components: {BottomNavigation, ArticleList},
  data () {
    return {

    }
  },
  methods: {

  },
  beforeMount () {

  }
}
</script>
<style scoped>

</style>

