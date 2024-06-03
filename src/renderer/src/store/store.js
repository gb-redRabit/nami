import { createStore } from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
export default createStore({
  state: {
    fullList: [],
    fullEdit: [],
    listTop: [],
    listSezon: [],
    genresTab: [],
    typeSelect: [],
    listNewSeson: [],
    listNew: []
  },
  getters,
  mutations,
  actions
})
