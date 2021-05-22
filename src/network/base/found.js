import {request} from  '../request'

export function getSwiper() {
  return request({
    url: "/banner",
  })
}