import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/config'
import store from '@/store'
import {
  getToken,setToken,canTurnTo,setTitle
} from '@/libs/tool'

const {
  HOME_NAME,
  LOGIN_NAME,
  NOTFOUND_NAME,
  NOT_AUTH_NAME,
} = config.ROUTER;


NProgress.configure({showSpinner: false}); // 不显示进度条转圈圈

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



const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)){
    next() // 有权限，可访问
  } 
  else{
    next({ replace: true, name: NOT_AUTH_NAME }) // 无权限，重定向到401页面
  } 
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()
  const {
    meta:toMeta = {},
    name:toName
  } = to;
  if(to.name === from.name){
    NProgress.done()
  }
  // 无token && 需要登录的页面 -> 去登陆
  if (!token && !toMeta.notAuth) {
    next({name: LOGIN_NAME})
  } 
  // 无token && 不需要登录的页面 -> 跳转
  else if (!token && toMeta.notAuth) {
    next() 
  } 
  // 有token && 登录页面 -> 去首页
  else if (token && toName === LOGIN_NAME) {
    next({name: HOME_NAME})
  } 
  // 有token -> 判断权限
  else {
    // 有个人信息
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } 
    // 无个人信息
    else {
      store.dispatch('getUserInfo').then(user => {
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({name: LOGIN_NAME})
      })
    }
    next();
  }

})

router.afterEach(to => {
  setTitle(to, router.app)
  NProgress.done();
  window.scrollTo(0, 0)
})

export default router
