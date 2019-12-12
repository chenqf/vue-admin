import Qs from 'qs'

export const defaultHttpInterceptors = function(instance,options){

    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if(config.method === 'get'){
            config.params = config.params || config.data;
        }else if(config.method === 'post'){
            config.data = Qs.stringify(config.data);
        }
        return config;
    }, function (error) {
        console.warn('error',error)
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        console.log(response.data)
        let data = response.data;
        let code = data.code;
        if(data.success){
            return data.data;
        }else{
            if(code === 888){
                
            }
            console.warn('error',data.message)
            // 对响应错误做点什么
            return Promise.reject(new Error(data.message));
        }
    }, function (error) {
        console.warn('error',error)
        // 对响应错误做点什么
        return Promise.reject(error)
    });
}