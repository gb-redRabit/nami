<template>
  <div class="flex overflow-hidden relative">

    <TitleBar />
    <Navbar />
    <RouterView v-slot="{ Component }" :key="$route.params.id" v-if="list"
      class="ml-[40px] bg-neutral-200 min-h-screen min-w-[calc(100%-40px)]">
      <Component :is="Component" />
    </RouterView>
    <Loader v-else></Loader>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'


import season from './helpers/date'
import Loader from './components/Loader.vue'
import Navbar from './components/Navbar.vue'
import TitleBar from './components/TitleBar.vue'
const store = useStore()
const list = ref(null)

window.electron.ipcRenderer.on('sendApiOne', (__, data) => {
  list.value = data
  store.dispatch('getFull', data)
  store.dispatch('listEdit', data)
})

window.electron.ipcRenderer.on('sendApiEight', (__, data) => {
  const top = data.sort((a, b) => b.score - a.score)
  store.dispatch('listTop', top)
})

window.electron.ipcRenderer.on('sendApiNewSeson', (__, data) => {
  store.dispatch('listNewSeson', data)
})

window.electron.ipcRenderer.on('sendApiNew', (__, data) => {
  store.dispatch('listNew', data)
})

onMounted(async () => {
  window.electron.ipcRenderer.send(
    'getApiEight',
    'https://api.jikan.moe/v4/top/anime?filter=airing'
  )
  window.electron.ipcRenderer.send('getApiOne', 'https://api.docchi.pl/v1/series/list')
  window.electron.ipcRenderer.send(
    'getApiNewSeson',
    `https://api.docchi.pl/v1/episodes/latest?season=${season().season}&season_year=${season().yers}`
  )
  window.electron.ipcRenderer.send(
    'getApiNew',
    `https://api.docchi.pl/v1/episodes/latest?season=${season().season}&season_year=${season().yers}&type=not`
  )
})
</script>
