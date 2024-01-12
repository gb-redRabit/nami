import { createStore } from "vuex";

export default createStore({
  state: {
    fullList: [],
    listSezon: [],
  },
  getters: {
    genres(state) {
      let tab = [];
      state.fullList.forEach((item) => {
        tab = new Set([...tab, ...item.genres]);
      });
      return tab;
    },
    type(state) {
      let tab = [];
      state.fullList.forEach((item) => {
        tab = new Set([...tab, item.series_type]);
      });
      return tab;
    },
    movieList(state) {
      return state.fullList.filter((item) => item.series_type === "Movie");
    },
    restList(state) {
      return state.fullList.filter((item) => item.series_type !== "Movie");
    },
    newList(state) {
      return state.fullList.filter((item) => item.series_type === "Movie");
    },
    nextList(state) {
      return state.fullList.filter((item) => item.series_type === "Movie");
    },
  },
  mutations: {
    getFull(state, task) {
      state.fullList = task;
    },
  },
  actions: {
    getFull({ commit }, task) {
      commit("getFull", task);
    },
  },
});
