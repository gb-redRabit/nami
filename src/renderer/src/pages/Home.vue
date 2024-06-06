<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-2 w-full mt-5 ml-10">
      <h1 class="flex gap-2 text-3xl font-medium ">
        <IconSeason :season="date().season" />
        <span>{{ date(false, 'pl').season }}</span>
        <span> {{ date(false, 'pl').yers }}</span>
      </h1>
    </div>
    <div class="flex flex-col gap-2 justify-center items-center w-full mt-10">
      <h2 class="text-black text-4xl font-medium my-10">Promowane serie </h2>
      <CarouselSlide :data="store.getters.listTop" :p="false" :n="true" :numbering="true" :itemsShow="3" :autoplay="0"
        :top="true" />
    </div>
    <div class=" flex gap-2 w-11/12 mt-10">
      <div class="flex flex-col items-center w-1/2  ">
        <h1 class=" my-3 text-2xl font-medium"> Emitowane </h1>
        <CarouselSlide :data="store.getters.listNewSeson" :p="false" :n="true" :numbering="true" :itemsShow="5"
          :autoplay="5000" :top="false" />
      </div>
      <div class="flex flex-col items-center w-1/2  ">
        <h1 class=" my-3 text-2xl font-medium"> Pozostałe </h1>
        <CarouselSlide :data="store.getters.listNew" :p="false" :n="true" :numbering="true" :itemsShow="5"
          :autoplay="5000" :top="false" />
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
