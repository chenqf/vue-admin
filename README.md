

admin-cli

iview-admin https://lison16.github.io/iview-admin-doc/#/

log

mock 相关内容

路由元信息，用作权限管理  登录接口，权限接口，相互独立

addRoutes 动态添加

meta 上添加title 关键字，用于修改浏览器title



excl 的处理

自定义指令：拖拽 复制

dev 下启用日志

request 实现 next

命名视图，实现首页布局

路由传参，使用props进行解耦

?????
菜单 和 路由 二者数据不要一一对应，路由的层级可能层数较少，但菜单的层级确不一定

## 全局前置守卫 beforeEach

**执行过程中，并未跳转**

权限验证：beforeEach中使用next()重置到无权限页面？

router.onError ? 错误异常页面？

## 全局解析守卫 beforeResolve

**执行过程中，并未跳转**

组件内守卫，路由组件被解析后执行

组件的所有生命周期之前执行

beforeEach 和 组件内beforeRouteEnter 之后

## 全局后置钩子 afterEach

在所有路由跳转结束的时候调用

## beforeRouteLeave 

用于离开路由时，确认是否离开 next(true/false)