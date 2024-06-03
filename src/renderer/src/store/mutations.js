export default {
  getFull(state, task) {
    state.fullList = task
  },
  listNewSeson(state, task) {
    state.listNewSeson = task
  },
  listNew(state, task) {
    state.listNew = task
  },
  listEdit(state, task) {
    state.fullEdit = task
  },
  listTop(state, task) {
    state.listTop = task
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
  celean(state) {
    state.genresTab = []
    state.typeSelect = []
  }
}
