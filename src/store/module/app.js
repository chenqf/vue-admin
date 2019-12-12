import {
    getMenuByRouter
} from '@/libs/tool'

import routers from '@/router/routers'

export default{
    state:{

    },
    getters:{
        menuList:(state,getters,rootState)=>getMenuByRouter(routers)
    },
    mutations:{
        
    },
    actions:{

    }
}