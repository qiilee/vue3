import { WEI_BO_APP_KEY, WEI_BO_UID } from '@/constants'

/**
 * 微博分享
 * @param {*} imgUrl 分享的图片 URL
 * @param {*} path 网页链接
 */
export const weiboShare = (imgUrl, path) => {
  window.open(
    `https://service.weibo.com/share/share.php?appkey=${WEI_BO_APP_KEY}&ralateUid=${WEI_BO_UID}&pic=${imgUrl}&title=这张图不错哦，给大家分享一下 ${path}`,
    '_blank'
  )
}
