import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/Home'
import LeaveingMessage from '@/components/leaveing-message/LeaveingMessage'
import Article from '@/components/article/Article'
import Music from '@/components/music/Music'
import Center from '@/components/center/Center'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/leaveingMessage',
      name: 'LeaveingMessage',
      component: LeaveingMessage
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    }
  ]
})
