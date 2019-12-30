import config from '@/config'





export const everyTime = (func, time, callback) => {
  let key;
  let fn = function loop() {
    key = setTimeout(loop, time);
    func();
    callback(key)
  };
  key = setTimeout(fn, time);
  callback(key)
};

export const stopTime = key => {
  window.clearTimeout(key);
};


/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}


export const hasScrollbar = () => {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}


export const getScrollbarWidth = () => {
  let scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}


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


/**
 * 节流函数
 * @param func 用户传入的节流函数
 * @param wait 间隔的时间
 * @param opts leading 是否第一次执行 trailing 是否停止触发后执行
 */
export const throttle = function (func, wait = 50, opts = {}) {
  let preTime = 0,
    timer = null,
    {
      leading = false,
      trailing = true
    } = opts,
    throttled = function (...args) {
      let now = Date.now();
      if (!leading && !preTime) {
        preTime = now;
      }
      // 没有剩余时间 || 修改了系统时间
      if (now - preTime >= wait || preTime > now) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        preTime = now;
        func.apply(this, args);
      } else if (!timer && trailing) {
        timer = setTimeout(() => {
          preTime = Date.now();
          timer = null;
          func.apply(this, args)
        }, wait - now + preTime);
      }
    };
  throttled.cancel = function () {
    clearTimeout(timer);
    timer = null;
    preTime = 0;
  };
  return throttled;
};



/**
 * 防抖函数
 * @param func 用户传入的防抖函数
 * @param wait 等待的时间
 * @param immediate 是否立即执行
 */
export const debounce = function (func, wait = 50, immediate = false) {
  // 缓存一个定时器id
  let timer = null;
  let result;
  let debounced = function (...args) {
    // 如果已经设定过定时器了就清空上一次的定时器
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      //等待wait的时间间隔后，timer为null的时候，函数才可以继续执行
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      //未执行过，执行
      if (callNow) result = func.apply(this, args);
    } else {
      // 开始一个定时器，延迟执行用户传入的方法
      timer = setTimeout(() => {
        //将实际的this和参数传入用户实际调用的函数
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  // 这里返回的函数时每次用户实际调用的防抖函数
  return debounced;
};


export const hasOneOf = (targetArr, arr) => {
  return targetArr.some(_ => arr.indexOf(_) > -1)
}


export const getTimestampFor = (str) => {
  let tag = str.slice(-1);
  let num = Number(str.slice(0, -1));
  if (tag === 'd') {
    return 24 * 60 * 60 * 1000 * num;
  } else if (tag === 'h') {
    return 60 * 60 * 1000 * num;
  } else if (tag === 'm') {
    return 60 * 1000 * num;
  } else if (tag === 's') {
    return 1000 * num;
  } else {
    return num;
  }
}
