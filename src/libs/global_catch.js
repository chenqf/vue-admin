import { Notification } from "element-ui";

const notice = function(title, message) {
  Notification({
    type: "error",
    title,
    message,
    duration: 2500
  });
};

//请求成功-返回数据提示错误
const responseErrorFn = function(reason) {
  console.warn(reason.data);
  const { code, data, message } = reason.data;
  if (code === 400) {
    //请求参数错误
    notice("参数错误", message);
  } else if (code === 401) {
    //没有权限
    notice("TODO 未登录", "TODO 跳转到登录");
  } else {
    // 其他错误
    notice("错误", message);
  }
};

// 请求不成功
const httpErrorFn = function(reason) {
  const { code, error, message } = reason;
  console.warn(error);
  notice("错误", message);
};

window.addEventListener("unhandledrejection", function(event) {
  const { reason } = event;
  if (reason instanceof Error) {
    // 请求成功-responseErrorFn
    if (reason.code === 200) {
      responseErrorFn(reason);
    }
    // 请求失败-httpError
    if (reason.code === -1) {
      httpErrorFn(reason);
    }
  }
});
