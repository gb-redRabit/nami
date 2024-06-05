<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-2 w-full mt-5 ml-10">
      <h1 class="flex gap-2 text-3xl font-medium ">
        <IconSeason :season="date().season" />
        <span>{{ date(false, 'pl').season }}</span>
        <span> {{ date(false, 'pl').yers }}</span>
      </h1>
    </div>
    <!-- <div class="flex flex-col gap-2 justify-center items-center w-full mt-10">
      <h2 class="text-black text-2xl font-medium">Top 10 </h2>
      <CarouselSlide :data="store.getters.listTop" :p="false" :n="true" :numbering="true" :itemsShow="3"
        :autoplay="30000" />
    </div> -->
    <div class=" flex gap-2 w-11/12 mt-10">
      <div class="flex flex-col items-center w-1/3 g ">
        <h1 class="bg-slate-700 rounded-lg py-1 px-4 my-3 text-xl font-medium"> Nowe odcinki z tego sezonu </h1>
        <div class="flex flex-col items-start w-3/4">
          <button @click="$router.push({ path: `/list/${item.anime_id}/${item.anime_episode_number}` })"
            v-for="(item, index) in store.getters.listNewSeson" :key="index"> - {{ item.title.length <= 30 ? item.title
              : `${item.title.slice(0, 19)}...` }} - Odcinek {{ item.anime_episode_number }}</button>
        </div>
      </div>
      <div class="flex flex-col items-center w-1/3 g ">
        <h1 class="bg-slate-700 rounded-lg py-1 px-4 my-3 text-xl font-medium"> Nowe odcinki </h1>
        <div class="flex flex-col items-start w-3/4">
          <button @click="$router.push({ path: `/list/${item.anime_id}/${item.anime_episode_number}` })"
            v-for="(item, index) in store.getters.listNew" :key="index"> - {{ item.title.length <= 30 ? item.title :
              `${item.title.slice(0, 19)}...` }} - Odcinek {{ item.anime_episode_number }}</button>
        </div>
      </div>
      <div class="flex w-1/3 bg-red-200">
        3
      </div>
    </div>
    <!-- <CarouselSlide :data="store.getters.nextList" :p="false" :n="false" :numbering="false" :itemsShow="10"
      :autoplay="0" /> -->
  </div>
</template>

<script setup>
import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'
import CarouselSlide from '../components/CarouselSlide.vue'

import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()

const ipcHandle = () => window.getApi()
</script>
