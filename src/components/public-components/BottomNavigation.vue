<template>
  <div>
    <mu-container style="max-width: 400px; width:100%;padding-right:0;padding-left:0;position:fixed;bottom: 0;-moz-box-shadow:0px -3px 13px #333333; -webkit-box-shadow:0px -3px 13px #333333; box-shadow:0px -1px 8px #333333;">
      <mu-bottom-nav color="#00474f" :value.sync="BottomNav" shift @change="handleChange">
        <mu-bottom-nav-item value="article" title="技术" icon="border_color" to="Article"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="leaveingMessage" title="留言" icon="message_processing" to="LeaveingMessage"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="music" title="音乐" icon="music_note" to="Music"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="center" title="我的" icon="account_circle" to="Center"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  name: 'BottomNavigation',
  props: ["BottomNav"],
  data () {
    return {
    }
  },
  methods: {
    goPage (url) {
      this.$router.push({ name: url})
    },
    handleChange (value) {
      console.log(value)
    }
  },
}
</script>
<style scoped>

</style>

