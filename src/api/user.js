
import {createRequest} from '@api.request'

const request = createRequest(); //这里也可以设置baseUrl

export const login = ({name,password}) => {
  const data = {
    name,
    password
  }
  return request.get({
    url: '/user/login',
    data
  })
}
