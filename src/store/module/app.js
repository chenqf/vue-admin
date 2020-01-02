import {
  getMenuByRouter,
  getRouteTitleHandled,
  getToken,
  getBreadCrumbList,
  getHomeRoute,
  routeHasExist,
  getTagNavListFromLocalStorage,
  setTagNavListInLocalStorage,
} from '@/libs/tool'

import cache from '@/libs/localCache'

import routers from '@/router/routers'

import config from '@/config'

const { HOME_NAME } = config.ROUTER

const SHOW_LOGO_KEY = getToken() + '_SHOW_LOGO';
const FIXED_HEADER_KEY = getToken() + '_FIXED_HEADER';
const OPEN_TAG_NAV_KEY = getToken() + '_OPEN_TAG_NAV';



export default {
  state: {
    breadCrumbList: [], // 面包屑
    tagNavList: [], // tag标签
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
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (router.name === HOME_NAME){
          state.tagNavList.unshift(router)
        } else if (type === 'push') {
          state.tagNavList.push(router)
        }
        else{
          state.tagNavList.splice(1, 0, router)
        } 
        setTagNavListInLocalStorage([...state.tagNavList])
      }
    },
    setTagNavList(state,list){
      let tagList = [];
      if(list){
        tagList = [...list]
      }else{
        tagList = getTagNavListFromLocalStorage() || []
      }
      //首页在tag中的索引
      let homeTagIndex = tagList.findIndex(item => item.name === HOME_NAME);
      if(homeTagIndex > 0){
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalStorage([...tagList])
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, HOME_NAME)
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
