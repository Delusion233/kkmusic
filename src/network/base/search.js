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