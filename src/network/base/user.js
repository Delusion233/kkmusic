import { request } from '../request'

/** get user playlist */
export function getPlayList(uid) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  })
}