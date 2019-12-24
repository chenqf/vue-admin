import {
    getMenuByRouter,
    getToken
} from '@/libs/tool'

import cache from '@/libs/localCache'

import routers from '@/router/routers'

const SHOW_LOGO_KEY = getToken() + '_SHOW_LOGO';
const FIXED_HEADER_KEY = getToken() + '_FIXED_HEADER';



export default{
    state:{
        collapsed:false,
        showLogo:cache.get(SHOW_LOGO_KEY) !== 'false',
        fixedHeader:cache.get(FIXED_HEADER_KEY) === 'true',
    },
    getters:{
        menuList:(state,getters,rootState)=>{
            return getMenuByRouter(routers,rootState.user.roles)
        }
    },
    mutations:{
        changeCollapsed (state, collapsed) {
            state.collapsed = !state.collapsed;
            
        },
        changeShowLogo(state,value){
            state.showLogo = value;
            cache.set(SHOW_LOGO_KEY,value)
        },
        changeFixedHeader(state,value){
            state.fixedHeader = value;
            cache.set(FIXED_HEADER_KEY,value)
        }
    },
    actions:{

    }
}