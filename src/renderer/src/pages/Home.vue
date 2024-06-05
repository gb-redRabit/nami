<template>
  <div class="flex flex-col items-center">
    <h1 class="flex gap-2 items-center justify-center text-4xl my-10">
      <IconSeason :season="date().season" />
      <span>{{ date(false, 'pl').season }}</span>
      <span> {{ date(false, 'pl').yers }}</span>
    </h1>
    <div class="flex flex-wrap gap-2 justify-center items-center w-full mt-10">
      <h2 class="text-black text-xl font-medium">Najpopularniejsze emitowane w miesiąca</h2>
      <CarouselSlide :data="store.getters.listTop" :p="true" :n="true" :numbering="true" :itemsShow="5"
        :autoplay="3000" />
    </div>
    <CarouselSlide :data="store.getters.nextList" :p="false" :n="false" :numbering="false" :itemsShow="10"
      :autoplay="0" />
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
