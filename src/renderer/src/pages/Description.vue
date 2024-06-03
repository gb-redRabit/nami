<template>
  <div class=" flex flex-col  items-center justify-center z-10 relative min-h-screen w-full" v-if="anime && mal">
    <div
      class="absolute top-0 right-0 left-0 h-screen z-[-1]  blur-[1px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0.7)] after:to-[rgba(229,229,229,1)]">
      <img :src="anime.bg ? anime.bg : anime.cover" alt="bg" class='h-screen w-full object-cover '>
    </div>
    <div class="flex gap-9  w-9/12 h-full my-24 text-white">
      <About :mal="mal" :anime="anime" />
      <div class="flex flex-col  w-3/4 gap-2">
        <h1 class="text-4xl ">{{ anime.title }}</h1>
        <h2 class="text-2xl ">{{ anime.title_en }}</h2>
        <h2 class="text-2xl font-bold mt-10 ">Opis</h2>
        <p class=" text-justify w-3/5 ">{{ anime.description }}</p>
        <div class="flex  gap-2 my-10">
          <div class="bg-slate-700 rounded-lg p-2 " v-for="item in anime.genres" :key="item">{{ item }}</div>
        </div>
        <Related :mal="mal.relations" />
        <div v-if="episodes === 'ERR_BAD_REQUEST' || episodes == null"
          class="flex flex-col justify-center items-center  mt-10">
          <img src="../assets/cat.png" alt="cat" class="grayscale w-44 ">
          <h2 class="text-2xl text-center bg-slate-700  rounded-lg  py-2 px-10 -mt-9">Brak odcinków</h2>
        </div>
        <template v-else>
          <div class="flex justify-end mt-10 mx-6  gap-2" v-if="anime.episodes > 1 && episodes !== 'ERR_BAD_REQUEST'">
            <div class="bg-gray-600 flex rounded-lg gap-2 p-2">
              <CgMenuGridR class=" size-8  cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleBar }"
                @click="toogleB" />
              <HeOutlineUiMenuGrid class=" size-8  cursor-pointer"
                :class="{ 'text-red-600 cursor-default': toogleMenu }" @click="toogleM" />
              <CaMenu class=" size-8  cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleList }"
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

  </div>
  <Loader v-else></Loader>
</template>

<script setup>

import { CaMenu, CgMenuGridR, HeOutlineUiMenuGrid } from "@kalimahapps/vue-icons";

import Related from '../components/description/Related.vue'
import Loader from '../components/Loader.vue';
import ListEpisodes from "../components/description/ListEpisodes.vue";
import About from "../components/description/About.vue";

import { onMounted, ref } from 'vue'

const toogleBar = ref(true)
const toogleMenu = ref(false)
const toogleList = ref(false)
const anime = ref(null);
const mal = ref(null);
const episodes = ref(null);

const { id } = defineProps({
  id: {
    type: String,
  },
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
  window.electron.ipcRenderer.send('getApiThree', `https://api.jikan.moe/v4/anime/${anime.value.mal_id}/full`);

})

// infor z mal
window.electron.ipcRenderer.on('sendApiThree', (__, data) => {
  mal.value = data.data

})

window.electron.ipcRenderer.on('sendApiFive', (__, data) => {
  if (data !== 'ERR_BAD_REQUEST') {
    episodes.value = data.sort((a, b) => a.anime_episode_number - b.anime_episode_number)
    const ids = episodes.value.map(({ anime_episode_number }) => anime_episode_number);
    episodes.value = episodes.value.filter(({ anime_episode_number }, index) =>
      !ids.includes(anime_episode_number, index + 1));
  } else {
    episodes.value = data
  }
})

onMounted(() => {
  window.electron.ipcRenderer.send('getApiTwo', `https://api.docchi.pl/v1/series/find/${id}`);
  window.electron.ipcRenderer.send('getApiFive', `https://api.docchi.pl/v1/episodes/count/${id}`);
})

</script>
