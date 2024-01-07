import { createStore } from "vuex";

export default createStore({
  state: {
    fullList: [],
    fullListSezon: [],
    gen: [],
  },
  getters: {
    genres(state) {
      let a = [];
      state.fullList.forEach((item) => {
        a = Array.from(new Set([...a, ...item.genres]));
      });
      return a;
    },
    type(state) {
      let a = [];
      state.fullList.forEach((item) => {
        a = Array.from(new Set([...a, item.series_type]));
      });
      return a;
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
