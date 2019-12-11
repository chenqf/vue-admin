import config from '@/config'

const {TOKEN_KEY} = config;


export const getToken = function(){
  return true;
}

export const setToken = function(){
  
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
