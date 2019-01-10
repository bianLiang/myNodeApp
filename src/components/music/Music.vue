<template>
  <div>
    <section class="musicBack" v-bind:style="{ height: height + 'px', width: width + 'px'}">
      <div>
        <audio id="musicBox">
            <source src="../../assets/muisc/gaobai.mp3"></source>
        </audio>
      </div>
      <div class="musicFrame" v-bind:style="{ width: width - 85 + 'px',backgroundImage: 'url(' + require('../../assets/img/back_7.jpg') + ')'}">
        <div class="FloatingLayer">
          <div class="tapeBox" :style="{transform :'rotate(' + angle+ 'deg)'}">
            <div class="tapeImg" v-bind:style="{backgroundImage: 'url(' + require('../../assets/img/back_7.jpg') + ')'}"></div>
          </div>
          <div class="operation">
            <div>
              <span style="font-size: 16px;">告白气球</span> <br/>
              <span style="font-size: 12px;">周杰伦</span>
            </div>
            <div>
              <i class="fa fa-backward"></i>
              <i class="fa" @click="startAndStop" v-bind:class="[isActive ? 'fa-pause' : 'fa-play']" style="margin:0 10px;"></i>
              <i class="fa fa-forward"></i>
              <i class="fa fa-volume-up"style="margin-left:10px;" @click="onIsVolume" :class="{ volume: isVolume }"></i>
            </div>
            <div>
              <mu-flex class="demo-linear-progress" style="padding-right: 10px;margin-top: 5px;">
                <mu-linear-progress :value="linear" mode="determinate" color="green"></mu-linear-progress>
              </mu-flex>
              <div>
                <span>{{currentTime}}</span>
                <span style="margin-left: 102px;">{{totalDuration}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <BottomNavigation  BottomNav="music"></BottomNavigation>
    </footer>
  </div>
</template>
<script>
import BottomNavigation from '../public-components/BottomNavigation'
import { setInterval } from 'timers';
export default {
  name: 'Music',
  components: {BottomNavigation},
  data () {
    return {
      musicBox: null,
      audio: null,
      width: null,
      height: null,
      angle: 0,
      timer: null,
      process: null,
      isActive: false,
      isVolume: false,
      linear: 0,
      totalDuration: null,
      currentTime: '00:00',
    }
  },
  mounted: function () {
    this.musicBox = document.getElementById("musicBox")
  },
  methods: {
    startAndStop () {
      const that = this
      if(that.musicBox.paused) {
        that.isActive = !that.isActive
        that.musicBox.play()
        this.gettotalDuration()
        that.timer = window.setInterval(() => {
          if (that.angle === 360) {
            that.angle = 0
          } else {
            that.angle++
          }
          that.getcurrentTime()
        }, 50)
        that.process = window.setInterval(() => {
          that.linear+= 100/that.musicBox.duration
          if (this.linear > that.musicBox.duration) this.linear = that.musicBox.duration;
        }, 1000)
      }else{
        that.isActive = !that.isActive
        that.musicBox.pause()
        window.clearInterval(that.timer)
        window.clearInterval(that.process)
      }
    },
    gettotalDuration () {
      var time = this.musicBox.duration
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var second = time % 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        this.totalDuration= minutes + ':' + seconds
    },
    getcurrentTime () {
      var time = this.musicBox.currentTime
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var second = time % 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        this.currentTime= minutes + ':' + seconds
        if (this.musicBox.currentTime === this.musicBox.duration) {
          const that = this
          window.clearInterval(that.timer)
          window.clearInterval(that.process)
        }
    },
    onIsVolume () {
      this.isVolume = !this.isVolume
      if (this.isVolume) {
        this.musicBox.muted = true;
      } else {
        this.musicBox.muted = false;
      }
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
    background-color: #00474f;
    padding-top: 100px;
  }
  .musicFrame {
    height: 120px;
    border-radius: 10px;
    background-color: beige;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    /* -webkit-filter: blur(1.5px);
    filter: blur(1.5px); */
    -moz-box-shadow:1px 0px 10px #000;
    -webkit-box-shadow:1px 0px 10px #000;
    box-shadow:1px 0px 10px #000;
  }
  .FloatingLayer {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.5);
    position: relative;
  }
  .tapeBox {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: #000;
    position:absolute;
    top: 10px;
    left: 12px;
  }
  .tapeImg {
    height: 55px;
    width: 55px;
    border-radius: 50%;
    background-color: #000;
    background-repeat: no-repeat;
    margin: 5px auto;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    position:absolute;
    top: 3px;
    left: 8px;
  }
  .operation {
    position:absolute;
    height: 60px;
    width: 190px;
    color: #fff;
    /* border: 1px solid #fff; */
    top: 5px;
    left: 97px;
  }
  .volume {
    color: #888;
  }
</style>

