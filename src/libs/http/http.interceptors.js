import Qs from "qs";
import { ResponseError, HttpError } from "../custom_error";

export const defaultHttpInterceptors = function(instance, options) {
  // 添加请求拦截器
  instance.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      if (config.method === "get") {
        config.params = config.params || config.data;
      } else if (config.method === "post") {
        config.data = Qs.stringify(config.data);
      }
      return config;
    },
    function(error) {
      return Promise.reject(new HttpError(error));
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function(response) {
      let data = response.data;
      if (data.success) {
        return data.data;
      } else {
        return Promise.reject(new ResponseError(data));
      }
    },
    function(error) {
      return Promise.reject(new HttpError(error));
    }
  );
};
