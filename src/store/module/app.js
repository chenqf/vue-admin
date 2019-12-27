import {
  getMenuByRouter,
  getToken,
  getBreadCrumbList,
  getHomeRoute
} from '@/libs/tool'

import cache from '@/libs/localCache'

import routers from '@/router/routers'

import config from '@/config'

const { homeName } = config.ROUTER

const SHOW_LOGO_KEY = getToken() + '_SHOW_LOGO';
const FIXED_HEADER_KEY = getToken() + '_FIXED_HEADER';
const OPEN_TAG_NAV_KEY = getToken() + '_OPEN_TAG_NAV';



export default {
  state: {
    breadCrumbList: [], // 面包屑
    homeRoute: {}, // 当前router
    collapsed: false,
    openTagNav:cache.get(OPEN_TAG_NAV_KEY) !== 'false',
    showLogo: cache.get(SHOW_LOGO_KEY) !== 'false',
    fixedHeader: cache.get(FIXED_HEADER_KEY) === 'true',
  },
  getters: {
    menuList: (state, getters, rootState) => {
      return getMenuByRouter(routers, rootState.user.roles)
    }
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    changeCollapsed(state, collapsed) {
      state.collapsed = !state.collapsed;
    },
    changeOpenTagNav(state, value) {
      state.openTagNav = value;
      cache.set(OPEN_TAG_NAV_KEY, value)
    },
    changeShowLogo(state, value) {
      state.showLogo = value;
      cache.set(SHOW_LOGO_KEY, value)
    },
    changeFixedHeader(state, value) {
      state.fixedHeader = value;
      cache.set(FIXED_HEADER_KEY, value)
    }
  },
  actions: {

  }
}
