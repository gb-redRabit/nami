import season from '../helpers/date'

export default {
  genres(state) {
    let tab = []
    let tabActive = []
    state.fullList.forEach((item) => {
      tab = new Set([...tab, ...item.genres])
    })
    tab.forEach((item) => {
      tabActive.push({ title: item, isActive: false })
    })
    return tabActive
  },
  type(state) {
    let tab = []
    let tabActive = []
    state.fullList.forEach((item) => {
      tab = new Set([...tab, item.series_type])
    })
    tab.forEach((item) => {
      tabActive.push({ title: item, isActive: false })
    })
    return tabActive
  },
  list(state) {
    return state.fullList
  },
  listEdit(state) {
    return state.fullEdit
  },
  listTop(state) {
    state.fullList.forEach((value) => {
      const matchingItem = state.listTop.find((item) => item.mal_id === value.mal_id)
      if (matchingItem) {
        matchingItem.slug = value.slug
      }
    })
    return state.listTop
  },
  newList(state) {
    return state.fullList.filter(
      (item) => item.season === season().season && item.season_year === season().yers
    )
  },
  nextList(state) {
    return state.fullList.filter(
      (item) => item.season === season(true).season && item.season_year === season(true).yers
    )
  }
}
