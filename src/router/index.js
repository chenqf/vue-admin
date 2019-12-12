import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/config'
import {
  getToken
} from '@/libs/tool'

const {
  HOME_NAME,
  LOGIN_NAME,
  NOTFOUND_NAME
} = config.ROUTER;


NProgress.configure({showSpinner: false});

//白名单

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes:[
    ...routes,
    {
      path: '*',
      redirect: { name: NOTFOUND_NAME }
    }
  ]
})



// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()
  const {
    meta:toMeta = {},
    name:toName
  } = to;
  //未登陆 && 需要登录的页面 -> 去登陆
  if (!token && !toMeta.notAuth) {
    next({name: LOGIN_NAME})
  } 
  //未登录 && 不需要登录的页面 -> 跳转
  else if (!token && toMeta.notAuth) {
    next() 
  } 
  //登录 && 登录页面 -> 去首页
  else if (token && toName === LOGIN_NAME) {
    next({name: HOME_NAME})
  } 
  //登录 -> 判断权限
  else {
    // if (store.state.user.hasGetInfo) {
    //   turnTo(to, store.state.user.access, next)
    // } else {
    //   store.dispatch('getUserInfo').then(user => {
    //     // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
    //     turnTo(to, user.access, next)
    //   }).catch(() => {
    //     setToken('')
    //     next({
    //       name: 'login'
    //     })
    //   })
    // }
    next();
  }

})

router.afterEach(to => {
  // setTitle(to, router.app)
  NProgress.done();
  window.scrollTo(0, 0)
})

export default router
