import { createStore } from "vuex";

export default createStore({
  state: {
    fullList: [],
    fullListSezon: [],
  },
  getters: {},
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
