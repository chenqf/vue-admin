

const DEV = process.env.NODE_ENV === 'development' ? 'DEV' : 'PRODUCT';

export default {
    HTTP:{
        PROTOCOL:DEV ? 'http:':'http:',
        HOSTNAME:DEV ? '10.13.1.93':'10.13.1.93',
        PORT:DEV ? '3001':'3001',
        WITH_CREDENTIALS:DEV ? true:true,
        TIMEOUT:DEV ? 3000:3000
    },
    ROUTER:{
        HOME_NAME:'home',
        LOGIN_NAME:'login',
        NOTFOUND_NAME:'error_404',
    },
    COOKIE_DOMAIN:DEV ? '':'',
    TOKEN:{
        KEY:'token',
        EXPIRES:'2h' // 单位 d h m s 天 时 分 秒
    }
}