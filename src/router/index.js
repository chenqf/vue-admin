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
        path: 'about1',
        name: 'about1',
        component: () => import(/* webpackChunkName: "about" */ '../views/About1.vue')
      },
      {
        path: 'about2',
        name: 'about2',
        component: () => import(/* webpackChunkName: "about" */ '../views/About2.vue')
      },
      {
        path: 'about3',
        name: 'about3',
        component: () => import(/* webpackChunkName: "about" */ '../views/About3.vue')
      },
      {
        path: 'about4',
        name: 'about4',
        component: () => import(/* webpackChunkName: "about" */ '../views/About4.vue')
      },
      {
        path: 'v1',
        name: 'v1',
        component: () => import(/* webpackChunkName: "about" */ '../views/v1.vue')
      },
      {
        path: 'v2',
        name: 'v2',
        component: () => import(/* webpackChunkName: "about" */ '../views/v2.vue')
      },
      {
        path: 'v3',
        name: 'v3',
        component: () => import(/* webpackChunkName: "about" */ '../views/v3.vue')
      },
      {
        path: 'v4',
        name: 'v4',
        component: () => import(/* webpackChunkName: "about" */ '../views/v4.vue')
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
