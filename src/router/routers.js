import Main from '_c/main'
import ParentView from '_c/parent-view';
import config from '@/config';

const {
  HOME_NAME,
  LOGIN_NAME,
  NOTFOUND_NAME,
  NOT_AUTH_NAME,
} = config.ROUTER;



/**
 * name/path：router跳转时需要用到的name和path
 * component：用到的页面组件
 * meta
 *    title：标题（浏览器顶部标题，面包屑标题、菜单标题）
 *    hideInMenu：(default: false)是否在菜单中显示
 *    showAlways：(default: false)只有一个子路由时，是否显示父路由
 *    icon：图标（面包屑图标、菜单图标）TODO
 *    hideInBread：是否在面包屑中显示 TODO
 *    notCache：(default: false)是否启用keep-alive TODO
 *    href：用于外部跳转的链接    TODO
 *    notAuth：(default:false) 是否需要登录，默认都需要登录 TODO 1
 */
export default [
    {
      path: '/login',
      name: LOGIN_NAME,
      meta: {
        title: 'Login - 登录',
        notAuth:true,
        hideInBread:true, // 面包屑中不显示
        hideInMenu: true // 左侧菜单不显示
      },
      component: () => import('@/view/person/login.vue')
    },
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: Main,
      meta: {
        hideInBread:true, // 面包屑中不显示
        hideInMenu: true // 左侧菜单不显示
      },
      children: [ 
        {
          path: '/home',
          name: HOME_NAME,
          meta: {
            hideInMenu: true, // 左侧菜单不显示
            title: '首页',
            notCache: true, // 非 keep-live
            icon: 'el-icon-upload'
          },
          component: () => import('@/view/home/home.vue')
        }
      ]
    },
    // {
    //   path: '',
    //   name: '百度',
    //   meta: {
    //     title: '外部链接', // 菜单中渲染一个点击跳转到外网的链接
    //     href: 'http://www.baidu.com',
    //     icon: 'ios-book'
    //   }
    // },
    {
      path:'/super',
      name:'super',
      component:Main,
      meta:{
        title:'super',
        name:'super',
        showAlways:true,
        access:['super'],
        icon:'el-icon-success',
      }
      ,
      children:[
        {
          path: 'super1',
          name: 'super1',
          meta: {
            access:['super'],
            icon: 'el-icon-date',
            title: 'super1'
          },
          component: () => import('@/view/auth/super/super1.vue')
        }
      ]
    },
    {
      path:'/admin',
      name:'admin',
      component:Main,
      meta:{
        icon: 'el-icon-location',
        title: 'admin',
        access:['super','admin']
      },
      children:[
        {
          path: 'admin1',
          name: 'admin1',
          meta: {
            access:['super','admin'],
            icon: 'el-icon-bell',
            title: 'admin1'
          },
          component: () => import('@/view/auth/admin/admin1.vue')
        },
        {
          path: 'admin2',
          name: 'admin2',
          meta: {
            access:['super','admin'],
            icon: 'el-icon-message',
            title: 'admin2'
          },
          component: () => import('@/view/auth/admin/admin2.vue')
        },
      ]
    },
    {
      path:'/white',
      name:'white',
      component:Main,
      meta:{
        icon: 'el-icon-menu',
        title: 'white'
      },
      children:[
        {
          path: 'white1',
          name: 'white1',
          meta: {
            icon: 'el-icon-news',
            title: 'white1'
          },
          component: () => import('@/view/auth/white/white1.vue')
        },
        {
          path: 'white2',
          name: 'white2',
          meta: {
            icon: 'el-icon-mobile-phone',
            title: 'white2'
          },
          component: () => import('@/view/auth/white/white2.vue')
        },
        {
          path: 'white3',
          name: 'white3',
          meta: {
            icon: 'el-icon-rank',
            title: 'white3'
          },
          component: () => import('@/view/auth/white/white3.vue')
        },
      ]
    },
    {
      path:'/demo',
      name:'_demo',
      component:Main,
      meta:{
        icon: 'el-icon-menu',
        title: '_demo',
        showAlways:true
      },
      children:[
        {
          path: 'directive',
          name: 'directive',
          meta: {
            icon: 'el-icon-news',
            title: '自定义指令'
          },
          component: () => import('@/view/demo/directive.vue')
        },
        {
          path: 'rich',
          name: 'rich',
          meta: {
            icon: 'el-icon-news',
            title: '富文本编辑器'
          },
          component: () => import('@/view/demo/rich.vue')
        },
        {
          path: 'demo',
          name: 'demo',
          meta: {
            icon: 'el-icon-news',
            title: 'demo'
          },
          component: () => import('@/view/demo/demo.vue')
        },
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      component: Main,
      meta: {
        hideInBread: true,
        // showAlways:true,
        icon: 'el-icon-share',
        title: '总显示'
      },
      children: [
        {
          path: 'tag_manage',
          name: 'tag_manage',
          meta: {
            icon: 'el-icon-star-off',
            title: '标签管理'
          },
          component: () => import('@/view/tag/manage.vue')
        }
      ]
    },
    {
      path: '/product',
      name: 'product',
      meta: {
        icon: 'el-icon-tickets',
        title: '商品管理'
      },
      component: Main,
      children: [
        {
          path: 'all',
          name: 'product_all',
          meta: {
            icon: 'el-icon-plus',
            title: '全部商品'
          },
          component: () => import('@/view/product/all.vue')
        },
        {
          path: 'goods',
          name: 'product_goods',
          meta: {
            icon: 'el-icon-phone',
            title: '赠品管理'
          },
          component: () => import('@/view/product/goods.vue')
        },
        {
          path: 'more',
          name: 'more',
          meta: {
            icon: 'el-icon-circle-check',
            title: '更多'
          },
          component: ParentView,
          children: [
            {
              path: 'all',
              name: 'product_more_all',
              meta: {
                icon: 'el-icon-minus',
                title: '全部商品'
              },
              component: () => import('@/view/product/all.vue')
            },
            {
              path: 'goods',
              name: 'product_more_goods',
              meta: {
                icon: 'el-icon-question',
                title: '赠品管理'
              },
              component: () => import('@/view/product/goods.vue')
            },
          ]
        }
      ]

    },
    {
      path: '/401',
      name: NOT_AUTH_NAME,
      meta: {
        hideInMenu: true
      },
      component: () => import('@/view/error-page/401.vue')
    },
    {
      path: '/500',
      name: 'error_500',
      meta: {
        hideInMenu: true
      },
      component: () => import('@/view/error-page/500.vue')
    },
    {
      path: '/404',
      name: NOTFOUND_NAME,
      meta: {
        hideInMenu: true
      },
      component: () => import('@/view/error-page/404.vue')
    }
  ]