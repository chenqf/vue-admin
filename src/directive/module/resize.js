export default {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el,binding) {
      let handler = binding.value;
      if(typeof ResizeObserver === 'function'){
        let init = true;
        const resizeObserver = new ResizeObserver(entries => {
            if(!init){
                handler(el)
            }else{
                init = false;
            }
        });
        resizeObserver.observe(el);
      }else{
        
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
  
    }
  }
  