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
        path: 'note',
        name: 'note',
        component: () => import(/* webpackChunkName: "about" */ '../views/Note.vue')
      },
      {
        path: 'word',
        name: 'word',
        component: () => import(/* webpackChunkName: "about" */ '../views/Word.vue')
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
