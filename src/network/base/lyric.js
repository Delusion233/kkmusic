import { request } from '../request'

/** lyric */
export function getLyric(id) {
  return request({
    url: "/lyric",
    params:{
      id
    }
  })
}