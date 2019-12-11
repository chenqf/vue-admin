import HttpRequest from './http.request.js'
import config from '../../config.js'

const HTTP_SETTING = config.HTTP;

const BASE_URL = HTTP_SETTING.PROTOCOL + '//' + HTTP_SETTING.HOSTNAME + (HTTP_SETTING.PORT ? `:${HTTP_SETTING.PORT}`:'')

const WITH_CREDENTIALS = HTTP_SETTING.WITH_CREDENTIALS;

const TIMEOUT = HTTP_SETTING.TIMEOUT;

export const createRequest = function(options = {}){
    let {
        baseUrl = BASE_URL,
        withCredentials = WITH_CREDENTIALS,
        timeout = TIMEOUT
    } = options;
    return new HttpRequest({
        baseUrl,
        withCredentials,
        timeout
    })
}
