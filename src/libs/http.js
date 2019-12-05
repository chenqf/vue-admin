
import axios from 'axios';
import Qs from 'qs';
import setting from '../config.js'


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.baseURL = setting.HTTP.PROTOCOL + '//' + setting.HTTP.HOSTNAME + (setting.HTTP.PORT ? `:${setting.HTTP.PORT}`:'')
    config.withCredentials = setting.HTTP.WITH_CREDENTIALS;
    config.timeout = setting.HTTP.TIMEOUT
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.data = Qs.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    let data = response.data;
    let code = data.code;
    if(data.success){
        return data.data;
    }else{
        if(code === 888){
            
        }
        console.log('error',data.message)
        // 对响应错误做点什么
        return Promise.reject(new Error(data.message));
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default {
    post(url,params = {}){
        return axios.post(url, params);
    },
    get(url,params = {}){
        let paramsStr = Qs.stringify(params)
        url = `${url}${paramsStr? '?' + paramsStr : ''}`
        return axios.get(url);
    }
}