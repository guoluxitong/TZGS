import request from '@/utils/request'
import qs from 'qs'
export function wechatlogin(query) {
  return request({
    url: '/tzgs/user/unionId',
    method: 'get',
    params:query
  })
}

