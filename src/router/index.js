import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/404',
    name:'notFound',
    component:()=>import('../views/404.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'note/index',
        name: 'note/index',
        component: () => import(/* webpackChunkName: "note" */ '../views/note/Index.vue')
      },
      {
        path: 'note/review',
        name: 'note/review',
        component: () => import(/* webpackChunkName: "note" */ '../views/note/Review.vue')
      },
      {
        path: 'word/search',
        name: 'word/search',
        component: () => import(/* webpackChunkName: "word" */ '../views/word/Search.vue')
      },
      {
        path: 'word/index',
        name: 'word/index',
        component: () => import(/* webpackChunkName: "word" */ '../views/word/Index.vue')
      },
      {
        path: 'word/review',
        name: 'word/review',
        component: () => import(/* webpackChunkName: "word" */ '../views/word/Review.vue')
      },
      {
        path: 'word/test',
        name: 'word/test',
        component: () => import(/* webpackChunkName: "word" */ '../views/word/Test.vue')
      }
    ]
  },
  { 
    path: '/*', redirect: { name: 'notFound' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  
  next();
})

router.beforeResolve ((to, from, next) => {
  
  next();
})

router.afterEach((to, from) => {
  
})

export default router
