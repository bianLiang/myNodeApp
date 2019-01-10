// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'

import 'muse-ui/lib/styles/base.less'
import { Button, Helpers, Grid, BottomNav, Card, Avatar, Progress, Snackbar, Icon} from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'

Vue.use(Button)
Vue.use(Helpers)
Vue.use(Grid)
Vue.use(BottomNav)
Vue.use(Card)
Vue.use(Avatar)
Vue.use(Progress)
Vue.use(Snackbar)
Vue.use(Icon)


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

// import mobileEvent from './assets/js/customize-mobile-events.js'
// import {arrayContain} from '../../js/utils';
// Vue.prototype.$mobileEvent = mobileEvent



Vue.config.productionTip = false
// 配置不同环境的请求路径
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:80'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://45.76.195.155:80'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
