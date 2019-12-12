import config from '@/config'
import Cookie from 'js-cookie'

const {TOKEN,COOKIE_DOMAIN} = config;
const {
  KEY:TOKEN_KEY,
  EXPIRES:TOKEN_EXPIRES
} = TOKEN;

export const getTimestampFor = (str)=>{
    let tag = str.slice(-1);
    let num = Number(str.slice(0,-1));
    if(tag === 'd'){
      return 24 * 60 * 60 * 1000 * num;
    }else if(tag === 'h'){
      return 60 * 60 * 1000 * num;
    }else if(tag === 'm'){
      return 60 * 1000 * num;
    }else if(tag === 's'){
      return 1000 * num;
    }else{
      return num;
    }
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





export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

//TODO 判断是否有权限
const showThisMenuEle = (item, access) => {
  //   if (item.meta && item.meta.access && item.meta.access.length) {
  //     if (hasOneOf(item.meta.access, access)){
  //         return true
  //     } 
  //     else{
  //         return false
  //     } 
  //   } else{
  //     return true
  //   } 
  return true;
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
