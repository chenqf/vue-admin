import Clipboard from 'clipboard'
export default {
  bind: (el, binding) => {
    const arg = binding.arg;
    if(arg === 'copy' || !arg){
      const clipboard = new Clipboard(el, {
        text: () => binding.value
      })
      el.__clipboard__ = clipboard
      if(el.__success_callback__){
        clipboard.on('success', e => {
          const callback = el.__success_callback__
          callback && callback(e)
        })
      }
      if(el.__error_callback__){
        clipboard.on('error', e => {
          const callback = el.__error_callback__
          callback && callback(e)
        })
      }
    }else if(arg === 'success'){
      const callback = binding.value;
      el.__success_callback__ = callback
      const clipboard = el.__clipboard__
      clipboard && clipboard.on('success', e => {
        callback && callback(e)
      })
    }else if(arg === 'error'){
      const callback = binding.value;
      el.__error_callback__ = callback
      const clipboard = el.__clipboard__
      clipboard && clipboard.on('error', e => {
        callback && callback(e)
      })
    }
    
  },
  update: (el, binding) => {
    let arg = binding.arg;
    if(arg === 'copy'){
      el.__clipboard__.text = () => binding.value
    }else if(arg === 'success'){
      el.__success_callback__ = binding.value
    }else if(arg === 'error'){
      el.__error_callback__ = binding.value
    }
  },
  unbind: (el, binding) => {
    delete el.__success_callback__
    delete el.__error_callback__
    el.__clipboard__.destroy()
    delete el.__clipboard__
  }
}
