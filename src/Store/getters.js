import season from "../helpers/date";

export default {
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
  list(state) {
    return state.fullList;
  },
  listEdit(state) {
    return state.fullEdit;
  },
  newList(state) {
    return state.fullList.filter(
      (item) =>
        item.season === season().season && item.season_year === season().yers
    );
  },
  nextList(state) {
    return state.fullList.filter(
      (item) =>
        item.season === season(true).season &&
        item.season_year === season(true).yers
    );
  },
};
