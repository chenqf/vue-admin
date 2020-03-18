import Mock from "mockjs";
Mock.XHR.prototype.withCredentials = true;
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
// Mock.setup({
//   timeout: 1000
// })

require("./user");
