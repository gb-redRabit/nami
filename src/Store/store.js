import { createStore } from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
export default createStore({
  state: {
    fullList: [],
    fullEdit: [],
    listSezon: [],
    genresTab: [],
  },
  getters,
  mutations,
  actions,
});
