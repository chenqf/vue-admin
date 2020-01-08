import store from "@/store";
export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, binding) {
    const { value } = binding;
    const roles = store.state.user.roles;
    if (value && Array.isArray(value) && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','super']"`);
    }
  },
  // 只调用一次，第一次绑定到元素时调用
  bind(el) {},
  // 左键的VNode更新时调用
  update(el) {},
  // 指令所在组件VNode及子VNode全部更新后调用
  componentUpdated(el) {},
  // 只调用一次，指令与元素解绑时调用
  unbind(el) {}
};
