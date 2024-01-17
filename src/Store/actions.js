export default {
  getFull({ commit }, task) {
    commit("getFull", task);
  },
  listEdit({ commit }, task) {
    commit("listEdit", task);
  },
  addGenres({ commit }, task) {
    commit("addGenres", task);
  },
  removeGenres({ commit }, task) {
    commit("removeGenres", task);
  },
  celeanGenres({ commit }) {
    commit("celeanGenres");
  },
};
