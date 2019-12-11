import Main from '_c/main'
import ParentView from '_c/parent-view';
import config from '@/config';

const {
  HOME_NAME,
  LOGIN_NAME,
  NOTFOUND_NAME
} = config.ROUTER;



/**
 * name/path：router跳转时需要用到的name和path
 * component：用到的页面组件
 * meta
 *    title：标题（浏览器顶部标题，面包屑标题、菜单标题）
 *    hideInMenu：(default: false)是否在菜单中显示
 *    showAlways：(default: false)只有一个子路由时，是否显示父路由 TODO
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
      component: () => import('@/view/login/login.vue')
    },
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: Main,
      meta: {
        notAuth:true,
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
            icon: 'md-home'
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
    //仅有一级标题，无二级，面包屑中不显示
    {
      path: '/tag',
      name: 'tag',
      component: Main,
      meta: {
        hideInBread: true,
        // showAlways:true,
        icon: '_qq',
        title: '总显示'
      },
      children: [
        {
          path: 'tag_manage',
          name: 'tag_manage',
          meta: {
            icon: '_qq',
            title: '标签管理'
          },
          component: () => import('@/view/tag/manage.vue')
        }
      ]
    },
    //多级菜单
    {
      path: '/product',
      name: 'product',
      meta: {
        icon: 'logo-buffer',
        title: '商品管理'
      },
      component: Main,
      children: [
        {
          path: 'all',
          name: 'product_all',
          meta: {
            icon: 'md-arrow-dropdown-circle',
            title: '全部商品'
          },
          component: () => import('@/view/product/all.vue')
        },
        {
          path: 'goods',
          name: 'product_goods',
          meta: {
            icon: 'md-arrow-dropdown-circle',
            title: '赠品管理'
          },
          component: () => import('@/view/product/goods.vue')
        },
        {
          path: 'more',
          name: 'more',
          meta: {
            icon: 'logo-buffer',
            title: '更多'
          },
          component: ParentView,
          children: [
            {
              path: 'all',
              name: 'product_more_all',
              meta: {
                icon: 'md-arrow-dropdown-circle',
                title: '全部商品'
              },
              component: () => import('@/view/product/all.vue')
            },
            {
              path: 'goods',
              name: 'product_more_goods',
              meta: {
                icon: 'md-arrow-dropdown-circle',
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
      name: 'error_401',
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