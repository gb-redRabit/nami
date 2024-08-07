<template>
  <div class="flex flex-col items-center justify-center z-10 relative min-h-screen w-full  dark:text-white"
    v-if="anime">
    <div
      class="absolute -top-20 right-0 left-0 h-screen z-[-1] blur-[1px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0.7)] after:to-[rgba(229,229,229,1)] dark:after:from-[rgba(255,255,255,0.7)] dark:after:to-[rgba(38,38,38,1)]">
      <iframe v-if="mal && anime.adult_content == 'false'" frameborder="0" allowfullscreen
        class="absolute w-full h-full top-0"
        allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        :title="mal.title" referrerpolicy="strict-origin-when-cross-origin"
        :src="`https://www.youtube.com/embed/${mal.trailer.youtube_id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1`"
        data-gtm-yt-inspected-6="true" />
      <img v-if="anime.adult_content == 'ture'" :src="anime.bg ? anime.bg : anime.cover" alt="bg"
        class="h-screen w-full object-cover absolute -top-20" />
    </div>
    <div class="flex gap-9 w-9/12 h-full my-24 text-white dark:text-gray-200" v-if="episodes">
      <About :mal="mal" :anime="anime" />
      <div class="flex flex-col w-3/4 gap-2">
        <div class="text-4xl">{{ anime.title }}</div>
        <h2 class="text-2xl">{{ anime.title_en }}</h2>
        <h2 class="text-2xl font-bold mt-10">Opis</h2>
        <p class="text-justify w-3/5">{{ anime.description }}</p>
        <div class="flex gap-2 my-10">
          <Genres v-for="item in anime.genres" :item="{ title: item, isActive: false }" :select="true" />
        </div>
        <Related :mal="mal.relations" v-if="mal" />
        <div v-if="episodes === 'ERR_BAD_REQUEST' && mal" class="flex flex-col justify-center items-center mt-10">
          <img src="../assets/cat.png" alt="cat" class="grayscale w-44" />
          <h2 class="text-2xl text-center bg-slate-700 rounded-lg py-2 px-10 -mt-9 dark:bg-slate-800">
            Brak odcinków.
          </h2>
        </div>
        <div v-else-if="episodes === 'ERR_BAD_REQUEST'" class="flex flex-col justify-center items-center mt-10">
          <img src="../assets/cat.png" alt="cat" class="grayscale w-44" />
          <h2 class="text-2xl text-center bg-slate-700 rounded-lg py-2 px-10 -mt-9 dark:bg-slate-800">
            Problem przy pobieraniu, spróbuj ponownie pózniej.
          </h2>
        </div>
        <template v-else>
          <div class="flex justify-between mt-10 gap-2" v-if="anime.episodes > 1 && episodes !== 'ERR_BAD_REQUEST'">
            <div class="flex justify-center items-center gap-2 px-2 text-gray-600  dark:text-gray-300">
              <h2>Sortuj odcinki od</h2>
              <div
                class="group w-36 flex flex-row justify-center items-center rounded-lg bg-gray-600  text-neutral-200 hover:text-gray-300 dark:bg-neutral-900 dark:hover:text-gray-400"
                v-if="episodes[0].anime_episode_number === 1"
                @click="episodes.sort((a, b) => b.anime_episode_number - a.anime_episode_number)">
                najstarszych
                <CgSortAz
                  class="text-4xl cursor-pointer border-gray-400  rounded-lg group-hover:text-gray-400 dark:group-hover:text-gray-500" />
              </div>
              <div v-else
                class="group w-36 flex flex-row justify-center items-center rounded-lg bg-gray-600 text-neutral-200 hover:text-gray-300 dark:bg-neutral-900 dark:hover:text-gray-400"
                @click="episodes.sort((a, b) => a.anime_episode_number - b.anime_episode_number)">
                najnowszych
                <CgSortZa
                  class="text-4xl cursor-pointer border-gray-400 rounded-lg group-hover:text-gray-400 dark:group-hover:text-gray-500" />
              </div>
            </div>
            <div class="bg-gray-600 flex rounded-lg gap-2 p-2 dark:bg-neutral-900">
              <CgMenuGridR class="size-8 cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleBar }"
                @click="toogleB" />
              <HeOutlineUiMenuGrid class="size-8 cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleMenu }"
                @click="toogleM" />
              <CaMenu class="size-8 cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleList }"
                @click="toogleL" />
            </div>
          </div>
          <ListEpisodes v-if="anime.episodes > 1 && episodes !== 'ERR_BAD_REQUEST'" :toogleList="toogleList"
            :toogleMenu="toogleMenu" :toogleBar="toogleBar" :episodes="episodes" :anime="anime" />
        </template>
        <RouterView v-slot="{ Component }" :key="$route.path" :anime="anime">
          <Component :is="Component" />
        </RouterView>
      </div>
    </div>
    <Skeleton v-else />
  </div>
</template>


<script setup>
import {
  CaMenu,
  CgMenuGridR,
  HeOutlineUiMenuGrid,
  CgSortAz,
  CgSortZa,
  BsImageFill
} from '@kalimahapps/vue-icons'

import Genres from '../components/Genres.vue'
import Skeleton from '../components/description/Skeleton.vue'
import Related from '../components/description/Related.vue'
import ListEpisodes from '../components/description/ListEpisodes.vue'
import About from '../components/description/About.vue'

import { onMounted, ref } from 'vue'

const toogleBar = ref(true)
const toogleMenu = ref(false)
const toogleList = ref(false)
const anime = ref(null)
const mal = ref(null)
const episodes = ref(null)

const { id } = defineProps({
  id: String,
})

const toogleB = () => {
  if (!toogleBar.value) {
    toogleBar.value = !toogleBar.value
    toogleList.value = false
    toogleMenu.value = false
  }
}
const toogleM = () => {
  if (!toogleMenu.value) {
    toogleMenu.value = !toogleMenu.value
    toogleList.value = false
    toogleBar.value = false
  }
}
const toogleL = () => {
  if (!toogleList.value) {
    toogleList.value = !toogleList.value
    toogleBar.value = false
    toogleMenu.value = false
  }
}
// info z docchi
window.electron.ipcRenderer.on('sendApiTwo', (__, data) => {
  anime.value = data
  window.electron.ipcRenderer.send(
    'getApiThree',
    `https://api.jikan.moe/v4/anime/${anime.value.mal_id}/full`
  )
})

// infor z mal
window.electron.ipcRenderer.on('sendApiThree', (__, data) => {
  mal.value = data.data
})

window.electron.ipcRenderer.on('sendApiFive', (__, data) => {
  if (data !== 'ERR_BAD_REQUEST') {
    episodes.value = data
      .sort((a, b) => a.anime_episode_number - b.anime_episode_number)
      .filter(
        ({ anime_episode_number }, index, arr) =>
          index === arr.findIndex((item) => item.anime_episode_number === anime_episode_number)
      )
  } else {
    episodes.value = data
  }
})

onMounted(() => {
  window.electron.ipcRenderer.send('getApiTwo', `https://api.docchi.pl/v1/series/find/${id}`)
  window.electron.ipcRenderer.send('getApiFive', `https://api.docchi.pl/v1/episodes/count/${id}`)
})
</script>
