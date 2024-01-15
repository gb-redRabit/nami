export default {
  getFull(state, task) {
    state.fullList = task;
  },
  addGenres(state, task) {
    state.genresTab.push(task);
  },
  removeGenres(state, task) {
    const index = state.genresTab.findIndex((item) => item === task);
    state.genresTab.splice(index, 1);
  },
  celeanGenres(state) {
    state.genresTab = [];
  },
};
