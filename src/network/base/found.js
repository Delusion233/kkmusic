import {request} from  '../request'

/** banners */
export function getSwiper() {
  return request({
    url: "/banner",
  })
}

/** get song url to play */
export function getSongUrl(songId) {
  return request({
    url: "song/url",
    params: {
      id: songId,
    }
  })
}
/** get song detail */
export function getSongDetail(songId) {
  return request({
    url: "song/detail",
    params: {
      ids: songId,
    }
  })
}

/** recommend song list */
export function  getSongList(limit=10) {
  return request({
    url: "/personalized",
    params: {
      limit:limit
    }
  })
}

/** newsong list */
export function getNewSongList(limit = 10) {
  return request({
    url: "/personalized/newsongs",
    params: {
      limit
    }
  })
}