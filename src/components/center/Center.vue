<template>
  <div>
    <section class="musicBack" v-bind:style="{ height: height + 'px', width: width + 'px'}">
      <div  class="divAn" style="height:100px;
      line-height: 100px;
      text-align:center;
      font-size: 18px;
      width:100px;
      background-color:#fff;
      border-radius: 10px;
      -moz-box-shadow:2px 0px 5px #333333;
      -webkit-box-shadow:2px 0px 5px #333333;
      box-shadow:2px 0px 5px #333333;">
        设计中
      </div>
    </section>
    <footer>
      <BottomNavigation  BottomNav="center"></BottomNavigation>
    </footer>
  </div>
</template>
<script>
import BottomNavigation from '../public-components/BottomNavigation'
export default {
  name: 'Center',
  components: {BottomNavigation},
  data () {
    return {
      width: null,
      height: null
    }
  },
  beforeMount () {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
  },

}
</script>
<style scoped>
  .musicBack {
    background-color: #08979c;
    /* padding-top: 100px; */
  }
  .divAn {
    position: relative;
    left: 50%;
    margin-left: -50px;
    top: 400px;
  }

</style>
