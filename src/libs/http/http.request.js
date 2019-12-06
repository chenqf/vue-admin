import axios from 'axios'
import {defaultHttpInterceptors} from './http.interceptors.js'

export default class HttpRequest{
    constructor(options){
        let {
            baseUrl,
            withCredentials = false,
            timeout
        } = options;
        this.baseUrl = baseUrl;
        this.withCredentials = withCredentials;
        this.timeout = timeout;
    }
    getDefaultConfig(){
        return {
            baseURL:this.baseUrl,
            withCredentials:this.withCredentials,
            timeout:this.timeout,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
    }
    setDefaultInterceptors(instance,options){
        defaultHttpInterceptors(instance,options)
    }
    post(options){
        return this.getInstance(Object.assign(options,{method: 'post'}))
    }
    get(options){
        return this.getInstance(Object.assign(options,{method: 'get'}))
    }
    getInstance(options = {}){
        const instance = axios.create();
        //当前请求所有配置
        options = Object.assign(this.getDefaultConfig(), options)
        //设置拦截器
        if(options.interceptors && typeof options.interceptors === 'function'){
            options.interceptors(instance,options)
        }else{
            this.setDefaultInterceptors(instance,options)
        }
        return instance(options)
    }
}

