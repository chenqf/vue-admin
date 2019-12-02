import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'note/index',
        name: 'note/index',
        component: () => import(/* webpackChunkName: "about" */ '../views/note/Index.vue')
      },
      {
        path: 'note/review',
        name: 'note/review',
        component: () => import(/* webpackChunkName: "about" */ '../views/note/Review.vue')
      },
      {
        path: 'word/search',
        name: 'word/search',
        component: () => import(/* webpackChunkName: "about" */ '../views/word/Search.vue')
      },
      {
        path: 'word/index',
        name: 'word/index',
        component: () => import(/* webpackChunkName: "about" */ '../views/word/Index.vue')
      },
      {
        path: 'word/review',
        name: 'word/review',
        component: () => import(/* webpackChunkName: "about" */ '../views/word/Review.vue')
      },
      {
        path: 'word/test',
        name: 'word/test',
        component: () => import(/* webpackChunkName: "about" */ '../views/word/Test.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
