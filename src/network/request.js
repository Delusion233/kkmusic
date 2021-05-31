import axios from 'axios'

export function request(config){

  const baseUrl = axios.create({
    baseURL: '/api',
    timeout: 5000
  })

  //axios请求拦截
  baseUrl.interceptors.request.use(res => {
    return res
  }, err => {
    console.log(err);
  })
  //响应拦截
  baseUrl.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return baseUrl(config)

}