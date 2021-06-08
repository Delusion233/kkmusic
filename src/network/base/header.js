import {request} from '../request'

/** searchResult */
export function getSearchResult(keywords, limit = 30, offset = 0, type = 1) {
  return request({
    url: "/search",
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}

/** loginin */
export function getLogin(phone, password, timestamp=new Date().getTime()) {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      password,
      timestamp
    }
  })
}

/** logout */
export function logout(timestamp = new Date().getTime()) {
  return request({
    url: "/logout",
    params:{
      timestamp
    }
  })
}