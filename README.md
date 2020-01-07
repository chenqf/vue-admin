

windows ssh key


埋点：

+ 关于pv

某新闻类的网站，每次看完之后，都会下拉刷新，加载新的内容，这个时候是算一次PV还是多次？
天猫商品列表页，看完一屏之后，向上滚动会再加载新的一屏，PV该算一次还是多次？
阿里云邮后台一直开着，每周上百次查看，是算一个PV还是每次查看都计算一次？
未关闭的浏览器tab几小时之后再次浏览，该不该再计一次PV?
查找信息时，浏览器Tab之间快速切换，切换过程中要不要计一次PV？
其实还有很多其它层出不穷的场景，具体该如何去统计PV留给大家去思考, 不再展开。

+ 关于错误还原

首先，每一次会话都有一个唯一的session ID，这是串联起所有行为的纽带。
其次，用户行为又分成两个部分，其一是用户的操作，比如鼠标滑动，点击，页面滚动等，其二是页面的变化。这两者我们都统称为用户行为，记录在同一个队列中。
一开始的时候，系统会记录下初始的页面作为第一帧，这是唯一的一次完整页面记录。
针对用户操作，我们会记录事件的类型，鼠标位置等关键信息，保存到队列中。
针对页面变动，我们会起一个mutationObserve侦听页面的改动，每次只记录改动的部分，保存到队列中。
无论是事件还是页面改动，都是对等的一帧，每一帧都会有当前时间，与上一帧间隔时间等基本信息用户还原。
一旦出错，SDK就把队列发送到监控系统，并清空当前队列。
还原端根据记录的行为队列，根据时间逐一播放出来。最终形成一个类似于视频的效果。

204 返回无响应体的response

文件对应的url，占用空间，抽取为变量



理念：工具为王效率至上

大型项目搭建方式：monorepo 

admin-cli

iview-admin https://lison16.github.io/iview-admin-doc/#/
element-admin https://panjiachen.github.io/vue-element-admin/

侧边栏-系统设置

返回顶部

引导页：[driver](https://github.com/kamranahmedse/driver.js)

JOSN 编辑器

markdown

富文本--上传

sticky 吸顶

图标 ？

同url跳转-进度条问题

keep-alive

before-close

addRoutes 动态添加

excl 的处理

request 实现 next

路由传参，使用props进行解耦

## beforeRouteLeave  

before_close event ?

用于离开路由时，确认是否离开 next(true/false)