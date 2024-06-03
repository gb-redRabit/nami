export default {
  getFull({ commit }, task) {
    commit('getFull', task)
  },
  listNewSeson({ commit }, task) {
    commit('listNewSeson', task)
  },
  listNew({ commit }, task) {
    commit('listNew', task)
  },
  listEdit({ commit }, task) {
    commit('listEdit', task)
  },
  listTop({ commit }, task) {
    commit('listTop', task)
  },
  addGenres({ commit }, task) {
    commit('addGenres', task)
  },
  addType({ commit }, task) {
    commit('addType', task)
  },
  removeGenres({ commit }, task) {
    commit('removeGenres', task)
  },
  celean({ commit }) {
    commit('celean')
  }
}
