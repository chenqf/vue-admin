export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    if(el.tagName.toUpperCase() === 'INPUT'){
      el.focus();
      el.setAttribute('autofocus','autofocus')
    }else{
      let input = el.querySelector('input');
      if(input){
        input.focus();
        input.setAttribute('autofocus','autofocus')
      }
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
