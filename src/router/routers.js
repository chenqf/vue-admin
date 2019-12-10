import Main from '@components/main/main.vue'

export default [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login - 登录',
        hideInBread:true, // 面包屑中不显示
        hideInMenu: true // 左侧菜单不显示
      },
      component: () => import('@view/login/login.vue')
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
          name: 'home',
          meta: {
            hideInMenu: true, // 左侧菜单不显示
            title: '首页',
            notCache: true, // 非 keep-live
            icon: 'md-home'
          },
          component: () => import('@view/home/home.vue')
        }
      ]
    },
    {
      path: '',
      name: '百度',
      meta: {
        title: '外部链接', // 菜单中渲染一个点击跳转到外网的链接
        href: 'http://www.baidu.com',
        icon: 'ios-book'
      }
    },
    //仅有一级标题，无二级，面包屑中不显示
    {
      path: '/tag',
      name: 'tag',
      component: Main,
      meta: {
        hideInBread: true
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
          component: () => import('@view/product/all.vue')
        },
        {
          path: 'goods',
          name: 'product_goods',
          meta: {
            icon: 'md-arrow-dropdown-circle',
            title: '赠品管理'
          },
          component: () => import('@view/product/goods.vue')
        },
      ]
    },
    {
      path: '/401',
      name: 'error_401',
      meta: {
        hideInMenu: true
      },
      component: () => import('@view/error-page/401.vue')
    },
    {
      path: '/500',
      name: 'error_500',
      meta: {
        hideInMenu: true
      },
      component: () => import('@view/error-page/500.vue')
    },
    {
      path: '*',
      name: 'error_404',
      meta: {
        hideInMenu: true
      },
      component: () => import('@view/error-page/404.vue')
    }
  ]