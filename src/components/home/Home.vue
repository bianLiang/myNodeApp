<template>
  <div class="">
     <div class="home-floating-layer" v-bind:style="{ height: height + 'px', width: width + 'px', backgroundImage: backgroundPicture}">
       <mu-container>
          <mu-flex class="mu-transition-row" justify-content="center">
            <mu-slide-top-transition>
              <div class="mu-transition-box mu-primary-color mu-inverse" v-show="showTheme" @click="goPage('Article')">技术</div>
            </mu-slide-top-transition>
            <mu-slide-bottom-transition>
              <div class="mu-transition-box mu-primary-color mu-inverse" v-show="showTheme"  @click="goPage('LeaveingMessage')">留言</div>
            </mu-slide-bottom-transition>
          </mu-flex>
          <mu-flex class="mu-transition-row" justify-content="center">
            <mu-slide-left-transition>
              <div class="mu-transition-box mu-primary-color mu-inverse" v-show="showTheme">音乐</div>
            </mu-slide-left-transition>
            <mu-slide-right-transition>
              <div class="mu-transition-box mu-primary-color mu-inverse" v-show="showTheme">我的</div>
            </mu-slide-right-transition>
          </mu-flex>
        </mu-container>
     </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: 'Home',
  data () {
    return {
      showTheme: false,
      width: null,
      height: null,
      backgroundPicture: null
    }
  },
  methods: {
    setBackImg () {
      const backImgList = [1,2,3,4,5,6,7,8,9,10]
      const index = backImgList[Math.floor(Math.random()*backImgList.length)]
      this.backgroundPicture = "url(" + require("../../assets/img/back_"+index+".jpg") + ")"
      const that = this
      setTimeout(function(){
        that.showTheme = true;
      }, 1000)
    },
    goPage (url) {
      this.$router.push({ name: url})
    }
  },
  beforeMount () {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    this.setBackImg()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home-floating-layer {
    background-color: #888;
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .mu-transition-box {
    height: 100px;
    width: 100px;
    margin: 5px;
    font-size: 18px;
    line-height: 100px;
    text-align: center;
  }
  .mu-primary-color {
    background-color: rgba(0,0,0,0.5);
    border-radius: 5px;
  }
</style>
