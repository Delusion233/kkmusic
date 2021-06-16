import { request } from '../request'

/** get mv url to play */
export function getPrivateContent(limit=20,offset=0) {
  return request({
    url: "/personalized/privatecontent/list",
    params: {
      limit,
      offset
    }
  })
}

/** get mv url to play */
export function getMvUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id
    }
  })
}
