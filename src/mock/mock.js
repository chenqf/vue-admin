import Mock from 'mockjs'


export const successResult = function(template){
    return {
        code:0,
        data:Mock.mock(template),
        success:true,
        message:'',
        timestamp: Date.now()
    }
}

export const errorResult = function(msg = '数据有误',code = -1){
    return {
        code,
        success:false,
        message:msg,
        timestamp: Date.now()
    }
}


export const mock = function (rurl, template) {
  return Mock.mock(rurl, function (req) {
    if(typeof template === 'function'){
      return template((req.body = JSON.parse(req.body), req))
    }else{
      return successResult(template);
    }
  })
}

export const mockError = function (rurl, errorMsg = '数据有误', errorCode = 1) {
  return Mock.mock(rurl, function () {
    return errorResult(errorMsg,errorCode)
  })
}
