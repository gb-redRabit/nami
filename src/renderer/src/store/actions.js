export default {
  getFull({ commit }, task) {
    commit('getFull', task)
  },
  listEdit({ commit }, task) {
    commit('listEdit', task)
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