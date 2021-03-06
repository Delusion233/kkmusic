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
export function getPlayList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

/** song list category */
export function getSongListCategory() {
  return request({
    url: "/playlist/hot"
  })
}

/** highquality song list */
export function getHighqualitySongList(cat='全部', limit=13) {
  return request({
    url: "/top/playlist/highquality",
    params: {
      cat,
      limit
    }
  })
}

/** personalized */
export function getPersonalized() {
  return request({
    url: "/personalized/privatecontent"
  })
}

/** personalized new song list */
export function getNewSongList(limit = 10) {
  return request({
    url: "/personalized/newsong",
    params:{
      limit
    }
  })
}

/** top song list */
export function getTopSongList(type = 0) {
  return request({
    url: "/top/song",
    params: {
      type
    }
  })
}

/** top album list */
export function getTopAlbumList(offset = 0, area = "ALL",limit = 20) {
  return request({
    url: "/top/album",
    params: {
      offset,
      area,
      limit
    }
  })
}