import directive from './directives'

const importDirective = Vue => {
  /**
   * clipboard指令 v-clipboard="options"
   * options = {
   *  value:    在输入框中使用v-model绑定的值,
   *  success:  复制成功后的回调,
   *  error:    复制失败后的回调
   * }
   */
  Vue.directive('clipboard', directive.clipboard)
  //监听dom大小变更
  Vue.directive('resize', directive.resize)
  // 自动获取焦点
  Vue.directive('focus', directive.focus) 
  // 代码高亮
  Vue.directive('highlight', directive.highlight)
  // 数字转为千分位
  Vue.directive('price', directive.price)
  // 控制dom是否有权限显示
  Vue.directive('permission', directive.permission)
}

export default importDirective
