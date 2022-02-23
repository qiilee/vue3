/**
 * Mutations业务层数据提交
 */
import storage from './../utils/storage'

export default {
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo;
        storage.setItem('userInfo', userInfo)
    },
    saveMenuList(state, menuList) {
        state.menuList = menuList;
        storage.setItem('menuList', menuList)
    },
    saveActionList(state, actionList) {
        state.actionList = actionList;
        storage.setItem('actionList', actionList)
    },
    saveNoticeCount(state, noticeCount) {
        state.noticeCount = noticeCount;
        storage.setItem('noticeCount', noticeCount)
    }
}