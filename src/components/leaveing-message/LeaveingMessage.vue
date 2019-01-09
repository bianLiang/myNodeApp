<template>
  <div class="LeaveingMessage">
    <header>
        <div class="inputBox">
            <input v-model="inputContent" type="text" class="form-control" @keyup="show()" placeholder="留个言吧...">
            <button class="btn btn-default" style="background-color: #08979c;color: #fff;" v-on:click="Submission()">留言</button>
            <transition name="fade">
                <div v-if="showInputContent">{{ inputContent }}</div>
            </transition>
        </div>
    </header>
    <section  style="margin-bottom: 64px;">
        <div class="contentBox" v-for="(item, index) in leavingMessageList" :key="index">
            <div class="name">
                <div class="iconBox">
                    <i class="fa fa-odnoklassniki myIcon"></i>
                </div>
                <div class="nameBox">
                    <span>{{ item.name }}</span>
                    <span>{{ item.creationTime }}</span>
                </div>
            </div>
            <div class="content">
                <p>{{ item.content }}</p>
            </div>
        </div>
    </section>
    <footer>
      <BottomNavigation BottomNav="leaveingMessage"></BottomNavigation>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import BottomNavigation from '../public-components/BottomNavigation'
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
Vue.use(Loading);
export default {
  name: 'LeaveingMessage',
  components: {BottomNavigation},
  data () {
    return {
      inputContent: '',
      showInputContent: false,
      leavingMessageList: []
    }
  },
  methods: {
    getLeavingmessageList () {
      const loading = this.$loading({
      overlayColor: 'hsla(0,0%,100%,.9)',// 背景色
      });
      this.axios.get(`${this.axios.defaults.baseURL}/leavingmessage/list`).then((res) => {
        this.leavingMessageList = res.data.data
        this.leavingMessageList.reverse()
        loading.close();
      })
    },
    show () {
      if (this.inputContent) {
        this.showInputContent = true
      } else {
        this.showInputContent = false
      }
    },
    getNewData () {
      let myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      let xDate = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      let hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
      let minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
      let seconds = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
      let timeValue = year + '-' + month + '-' + xDate + ' ' + hours + ':' + minutes + ':' + seconds
      // let timeValue =`${year.toString()}-${month.toString()}-${xDate.toString()} ${hours.toString()}:${minutes.toString()}:${seconds.toString()}`
      return timeValue
    },
    Submission () {
      // 这里向后台提交留言数据
      if (this.inputContent) {
        var params = new URLSearchParams()
        params.append('headPortrait', '')
        params.append('name', `匿名${this.leavingMessageList.length + 1}`)
        params.append('creationTime', this.getNewData())
        params.append('content', this.inputContent)
        this.axios.post(`${this.axios.defaults.baseURL}/leavingmessage/add_leaving_message`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
          if (res.data.code === 200) {
            this.axios.get(`${this.axios.defaults.baseURL}/leavingmessage/list`).then((res) => {
              this.leavingMessageList = res.data.data
              this.leavingMessageList.reverse()
              this.inputContent = ''
              this.showInputContent = false
            })
          }
        })
      }
    }
  },
  beforeMount () {
    this.getLeavingmessageList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
      transition: opacity .6s;
    }
  .fade-enter, .fade-leave-to {
      opacity: 0;
  }

  .bodyBox {
      background: #fff2e8;
  }
  .inputBox {
      position: relative;
  }
  .inputBox input {
      padding-right: 7rem;
  }
  .inputBox button {
      position: absolute;
      right: 0;
      top: 0;
  }
  .inputBox div {
      position: absolute;
      width: 100%;
      padding: 2rem;
      background: #b5f5ec;
  }
  .contentBox {
      background: #fff;
      width: 100%;
      margin: 0.6rem 0;
      padding: 0.5rem;
  }
  .iconBox {
      width: 2rem;
      height: 2rem;
      border: 1px solid #888;
      border-radius: 50%;
      text-align: center;
      line-height: 2rem;
  }
  .myIcon {
      font-size: 1rem;
      color: #888;
  }
  .nameBox {
      font-size: 0.5rem;
      color: #666;
  }
  .content {
      padding: 2rem;
      text-align: center;
  }
  .content p {
      width : auto;
      display : inline-block;
      text-align : left;
  }
</style>
