import {
    getMenuByRouter
} from '@/libs/tool'

import routers from '@/router/routers'

export default{
    state:{

    },
    getters:{
        menuList:(state,getters,rootState)=>{
            return getMenuByRouter(routers,rootState.user.access)
        }
    },
    mutations:{
        
    },
    actions:{

    }
}