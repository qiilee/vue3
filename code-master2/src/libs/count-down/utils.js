import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 中文
dayjs.locale('zh')
// duration 插件
dayjs.extend(duration)

export default dayjs
