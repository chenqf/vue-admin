import config from '@/config'


/**
 * 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()


export const hasOneOf = (targetArr, arr) => {
  return targetArr.some(_ => arr.indexOf(_) > -1)
}


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