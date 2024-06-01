export default {
  getFull(state, task) {
    state.fullList = task
  },
  listEdit(state, task) {
    state.fullEdit = task
  },
  addGenres(state, task) {
    state.genresTab.push(task)
  },
  addType(state, task) {
    state.typeSelect.push(task)
  },
  removeGenres(state, task) {
    const index = state.genresTab.findIndex((item) => item === task)
    state.genresTab.splice(index, 1)
  },
  celeanGenres(state) {
    state.genresTab = []
  }
}
