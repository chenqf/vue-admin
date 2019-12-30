import config from '@/config'
import Cookie from 'js-cookie'

import {  hasOneOf ,getTimestampFor,objEqual} from '@/libs/util'

const {TOKEN,COOKIE_DOMAIN,BASE_TITLE} = config;
const {
  KEY:TOKEN_KEY,
  EXPIRES:TOKEN_EXPIRES
} = TOKEN;


/**
 * 根据首页name找到首页route对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name){
        return res
      } 
    } else {
      if (item.name === homeName){
        homeRoute = item
      }
    }
  }
  return homeRoute
}


/**
 * 获取面包屑数据
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMatched = route.matched
  if (routeMatched.some(item => item.name === homeRoute.name)){
    return [homeItem]
  } 
  let res = routeMatched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    // TOOD title 为函数
    // if (meta.title && typeof meta.title === 'function') {
    //   meta.__titleIsFunction__ = true
    //   meta.title = meta.title(route)
    // }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      path:item.path,
      meta: meta
    }
    return obj
  })
  // res = res.filter(item => {
  //   return !item.meta.hideInMenu
  // })
  return [homeItem, ...res]
}


export const getToken = ()=>{
    return Cookie.get(TOKEN_KEY,{
        domain:COOKIE_DOMAIN
    })
}

export const setToken = (value)=>{
    return Cookie.set(TOKEN_KEY,value,{
      domain:COOKIE_DOMAIN,
      expires:new Date(Date.now() + getTimestampFor(TOKEN_EXPIRES))
  })
}


const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) {
    return hasOneOf(access, route.meta.access)
  }
  else {
    return true
  }
}


export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }
  return routePermissionJudge(routes)
}

export const getRouteTitleHandled = (route)=>{
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else{
      title = meta.title
    }
  }
  meta.title = title
  router.meta = meta
  return router
}

export const setTitle = (router,vm)=>{
  const route = getRouteTitleHandled(router)
  const pageTitle = (route.meta && route.meta.title) || route.name;
  const resTitle = pageTitle ? `${BASE_TITLE} - ${pageTitle}` : title
  window.document.title = resTitle
}


export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

export const routeHasExist = (tagNavList,routeItem)=>{
  let len = tagNavList.length
  while(len > 0){
    if(routeEqual(tagNavList[len - 1],routeItem)){
      return true;
    }
  }
  return false;
}

export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}





export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

//判断是否有权限
const showThisMenuEle = (item, access = []) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
      if (hasOneOf(item.meta.access, access)){
          return true
      } 
      else{
          return false
      } 
    } else{
      return true
    } 
}


export const getMenuByRouter = (list, access) => {
  let res = [];
  list.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) {
        obj.href = item.meta.href
      }
      if (showThisMenuEle(item, access)) {
        res.push(obj)
      }
    }
  })
  return res
}
