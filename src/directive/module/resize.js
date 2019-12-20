import {debounce,throttle,everyTime,stopTime} from '@/libs/util';

const getOffset = function(el){
  return {
    width:el.offsetWidth,
    height:el.offsetHeight
  }
}



export default {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el,binding) {
      let {
        value,
        arg,
        modifiers
      } = binding;
      let keys = Object.keys(modifiers),
          handler,
          wait = 50;
      if(keys[0] && /^\d*$/.test(keys[0])){
        wait = + keys[0]
      }
      //防抖
      if(arg === 'debounce'){
        handler = debounce(value,wait)
      }
      //节流
      else if(arg === 'throttle'){
        handler = throttle(value,wait)
      }else{
        handler = value;
      }
      
      if(false && typeof ResizeObserver === 'function'){
        let init = true;
        const resizeObserver = new ResizeObserver(entries => {
            if(!init){
              handler(el,newObj)
            }else{
                init = false;
            }
        });
        resizeObserver.observe(el);
      }else{
        let prev = getOffset(el);
        everyTime(function(){
          let cur = getOffset(el);
          if(cur.width !== prev.width || cur.height !== prev.height){
            handler(el)
            prev = cur;
          }
        },17,function(key){
          el.dataset._key = key;
        })
      }
      
    },
    // 只调用一次，第一次绑定到元素时调用 
    bind(el) {
      
    },
    // 左键的VNode更新时调用
    update(el){
  
    },
    // 指令所在组件VNode及子VNode全部更新后调用
    componentUpdated(el){
  
    },
    // 只调用一次，指令与元素解绑时调用
    unbind(el){
      let _key = el.dataset._key;
      if(_key){
        stopTime(_key)
      }
    }
  }
  