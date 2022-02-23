import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import permission from './modules/permission'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
})
