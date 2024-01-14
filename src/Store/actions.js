export default {
  getFull({ commit }, task) {
    commit("getFull", task);
  },
  addGenres({ commit }, task) {
    commit("addGenres", task);
  },
  removeGenres({ commit }, task) {
    commit("removeGenres", task);
  },
};
