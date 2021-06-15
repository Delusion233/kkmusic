import { request } from '../request'

/** lyric */
export function getMvUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id
    }
  })
}