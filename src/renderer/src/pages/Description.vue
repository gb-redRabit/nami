<template>
  <div class=" flex flex-col  items-center justify-center z-10 relative min-h-screen w-full" v-if="anime && mal">
    <div
      class="absolute top-0 right-0 left-0 h-screen z-[-1]  blur-[1px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0.7)] after:to-[rgba(229,229,229,1)]">
      <img :src="anime.bg ? anime.bg : anime.cover" alt="bg" class='h-screen w-full object-cover '>
    </div>
    <div class="flex gap-9  w-9/12 h-full my-24 text-white">
      <div class="flex flex-col gap-2 w-1/4 ">
        <div class="flex items-center justify-between  p-2 bg-slate-700 rounded-lg" v-if="mal.score">
          <div class="flex ">
            <div v-for="(index, i) in score[0]">
              <CaStarFilled />
            </div>
            <CaStarHalf v-if="score[1]" />
          </div>
          Ocena: {{ mal.score }}
        </div>
        <img class=" w-full h-[520px] rounded-lg" :src="anime.cover" alt="cover">
        <div class="flex w-full">
          <button @click="$router.push({ name: `aaaa`, params: { id: anime.slug, yt: mal.trailer.embed_url } })"
            class="flex justify-center items-center gap-2 w-full bg-slate-700 rounded-lg">
            <BsBoxArrowUpRight />
            <span class="text-lg py-1">Zwiastun</span>
          </button>
        </div>
        <h2 class="font-medium">Informacje</h2>
        <div class="flex flex-col bg-slate-700 rounded-lg gap-2 p-2">
          <p class="flex flex-col"><span class="font-medium">Sezon</span><span
              class="flex items-center gap-2 font-extralight">
              <FlFilledLeafTwo class=" text-green-700" v-if="anime.season == `spring`" />
              <FaRegSnowflake v-if="anime.season == `winter`" />
              <AnFilledSun class=" text-yellow-400" v-if="anime.season == `summer`" />
              <FlFilledUmbrella class=" text-amber-950" v-if="anime.season == `fall`" />
              {{ traslate(anime.season) }} {{
                anime.season_year
              }}
            </span>
          </p>
          <p class="flex flex-col"><span class="font-medium">Ilość Ocen</span><span class="font-extralight">{{
            mal.scored_by }}</span></p>
          <p class="flex flex-col"><span class="font-medium">Rodzaj</span><span class="font-extralight">{{
            anime.series_type }}</span></p>
          <p class="flex flex-col"><span class="font-medium">Odcinki</span><span class="font-extralight">{{
            anime.episodes }}</span></p>
          <p class="flex flex-col"><span class="font-medium">MPAA</span><span class="font-extralight">{{
            mal.rating }}</span></p>
          <p class="flex flex-col"><span class="font-medium">Studio</span><span class="font-extralight">{{
            mal.studios[0].name }}</span></p>
          <p class="flex flex-col"><span class="font-medium">Początek Emisji</span><span class="font-extralight">{{
            new Date(anime.aired_from).toISOString().slice(0, 10) }}</span></p>
          <p class="flex flex-col"><span class="font-medium">Długość odcinków</span><span class="font-extralight">{{
            mal.duration }}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col  w-3/4 gap-2">
        <h1 class="text-4xl mt-7 ">{{ anime.title }}</h1>
        <h2 class="text-2xl ">{{ anime.title_en }}</h2>
        <h2 class="text-2xl font-bold mt-10 ">Opis</h2>
        <p class=" text-justify w-3/5 ">{{ anime.description }}</p>
        <div class="flex  gap-2 mt-10">
          <div class="bg-slate-700 rounded-lg p-2 " v-for="item in anime.genres" :key="item">{{ item }}</div>
        </div>
        <div class="flex flex-col gap-1 mt-10" v-if="related.length > 0">
          <h2>Powiązane serie</h2>
          <div class="flex flex-wrap gap-3">
            <button @click="$router.push({
              name: `anime`, params: {
                id: item.slug
              }
            });" v-for="(item, index) in related" :key="index">
              <div class="bg-gray-900 bg-opacity-60 rounded-md overflow-hidden flex gap-1 w-72 h-24">
                {{ console.log(item) }}
                <img :src="item.cover" alt="cover">
                <div class="flex flex-col ">
                  <span>{{ item.relation }}</span>
                  <span>{{ item.title }}</span>
                  <span> {{ item.title_en }}</span>
                </div>

              </div>
            </button>
          </div>
        </div>
        <div class="flex justify-end mt-10 mx-6  gap-2">
          <div class="bg-gray-600 flex rounded-lg gap-2 p-2">
            <CgMenuGridR class=" size-8  cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleBar }"
              @click="toogleB" />
            <HeOutlineUiMenuGrid class=" size-8  cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleMenu }"
              @click="toogleM" />
            <CaMenu class=" size-8  cursor-pointer" :class="{ 'text-red-600 cursor-default': toogleList }"
              @click="toogleL" />
          </div>
        </div>
        <ListEpisodes :toogleList="toogleList" :toogleMenu="toogleMenu" :toogleBar="toogleBar" :episodes="episodes"
          :anime="anime" />
      </div>
    </div>
    <RouterView v-slot="{ Component }" :key="$route.path">
      <Component :is="Component" />
    </RouterView>
  </div>
  <Loader v-else></Loader>
</template>

<script setup>
import traslate from "../helpers/traslate"
import { FlFilledLeafTwo } from "@kalimahapps/vue-icons";
import { FaRegSnowflake } from "@kalimahapps/vue-icons";
import { AnFilledSun } from "@kalimahapps/vue-icons";
import { FlFilledUmbrella } from "@kalimahapps/vue-icons";
import { CaMenu } from "@kalimahapps/vue-icons";
import { CgMenuGridR } from "@kalimahapps/vue-icons";
import { HeOutlineUiMenuGrid } from "@kalimahapps/vue-icons";

import { onMounted, ref } from 'vue'
import { CaStarHalf } from "@kalimahapps/vue-icons";
import { CaStarFilled } from "@kalimahapps/vue-icons";
import { BsBoxArrowUpRight } from "@kalimahapps/vue-icons";
import Loader from '../components/Loader.vue';
import ListEpisodes from "../components/description/ListEpisodes.vue";



const toogleBar = ref(true)
const toogleMenu = ref(false)
const toogleList = ref(false)
const anime = ref(null);
const mal = ref(null);
const related = ref([]);
const episodes = ref(null);
const score = ref([]);
const props = defineProps({
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

  score.value.push(Math.floor(mal.value.score))
  score.value.push((mal.value.score - Math.floor(mal.value.score)) > 0.5)

  mal.value.relations.forEach((value) => {
    if (value.relation !== "Adaptation" && value.relation !== "Other") {
      value.entry.forEach((link) => {
        window.electron.ipcRenderer.send('getApiFour', `https://api.docchi.pl/v1/series/related/${link.mal_id}`);
        // poprawić
        // powiązane anime 
        let epis = '';
        window.electron.ipcRenderer.on('sendApiFour', (__, data) => {
          let obj = data[0]
          if (obj != undefined) {
            obj.relation = value.relation
            related.value.push(obj)
            const ids = related.value.map(({ mal_id }) => mal_id);
            related.value = related.value.filter(({ mal_id }, index) =>
              !ids.includes(mal_id, index + 1));
          }
        })
      })
    }
  })
})

window.electron.ipcRenderer.on('sendApiFive', (__, data) => {
  episodes.value = data.sort((a, b) => a.anime_episode_number - b.anime_episode_number)
  const ids = episodes.value.map(({ anime_episode_number }) => anime_episode_number);
  episodes.value = episodes.value.filter(({ anime_episode_number }, index) =>
    !ids.includes(anime_episode_number, index + 1));
})

onMounted(() => {
  window.electron.ipcRenderer.send('getApiTwo', `https://api.docchi.pl/v1/series/find/${props.id}`);
  window.electron.ipcRenderer.send('getApiFive', `https://api.docchi.pl/v1/episodes/count/${props.id}`);
})

</script>
