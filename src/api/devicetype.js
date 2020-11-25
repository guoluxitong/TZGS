import request from '@/utils/request'
import qs from 'qs'
export function getDeviceType(query) {
  return request({
    url: '/tzgs/device/list/type',
    method: 'get',
    params:query
  })
}
export function getHumidity(query) {
  return request({
    url: '/tzgs/humidity/find',
    method: 'get',
    params:query
  })
}
