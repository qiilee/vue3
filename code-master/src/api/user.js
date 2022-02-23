import request from '@/utils/request'

export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
