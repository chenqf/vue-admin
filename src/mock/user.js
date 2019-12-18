import {Random} from 'mockjs'
import {
    mock,
    mockError,
    successResult,
    errorResult
} from './mock'



mock(/\/user\/login/, ({url,type,body})=>{
    const {
        name,
        password
    } = body;
    if(name === 'admin' && password === 'admin'){
        return successResult({
            'id|1-100':2,
            token:Math.random(),
            name:Random.ctitle(),
            photo:Random.image('200x200')
        })
    }else{
        return errorResult('用户名或密码错误')
    }
})


mock(/\/user\/info/, ({url,type,body})=>{
    return successResult({
        'id|1-100':2,
        name:Random.ctitle(),
        photo:'123',//Random.image('200x200')
        access:[
            'admin'
        ]
    })
})