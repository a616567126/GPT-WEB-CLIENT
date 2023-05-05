/*
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-29 11:14:51
 * @FilePath: /chat_gpt/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import MainUserVue from '@/layout/mainUser.vue'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    name: '客户端',
    type: 'user',
    component: MainUserVue,
    children: [
      {
        name: '首页',
        meta: {
          icon: 'el-icon-s-home',
          title: '首页'
        },
        path: '/',
        name: 'home',
        component: () => import('../views/scoket/index.vue')
      },
      {
        name: '即时聊天',
        meta: {
          icon: 'el-icon-s-home',
          title: '即时聊天'
        },
        path: '/scoket',
        name: 'scoket',
        component: () => import('../views/user/index.vue')
      },
      {
        name: '商品列表',
        meta: {
          title: '商品列表'
        },
        path: '/user/product',
        name: 'product',
        component: () => import('../views/user/product.vue')
      },
      {
        name: '公告指南',
        meta: {
          title: '公告指南'
        },
        path: '/user/notice',
        name: 'notice',
        component: () => import('../views/user/notice.vue')
      },
      {
        name: 'SD',
        meta: {
          title: 'SD'
        },
        path: '/sdPage/index',
        name: 'sdPage',
        component: () => import('../views/sdPage/index.vue')
      },
      {
        name: 'newBing',
        meta: {
          title: 'newBing'
        },
        path: '/newBing/index',
        name: 'newBing',
        component: () => import('../views/newBing/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path !== '/login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      // const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

      // if (userInfo.mobile !== 'admin') {
      //   next('/user/index')
      // } else {
      //   next()
      // }
      document.title = to.meta.title
      next()
    }
  } else if (to.path == '/login') {
    next()
  }
})
export default router
