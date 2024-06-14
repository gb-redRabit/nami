<template>
  <div class="flex flex-col items-center">


    <div class="flex flex-col  gap-1 w-11/12 justify-center items-center  mt-10">
      <div class="w-full">
        <h1 class="flex justify-center items-center  my-10 gap-2 text-6xl font-medium ">
          <IconSeason :season="date().season" />
          <span>{{ date(false, 'pl').season }}</span>
          <span> {{ date(false, 'pl').yers }}</span>
        </h1>
        <Carousel class="w-full" ref="aaa" :itemsToShow="7" snapAlign="start" :autoplay="0" :wrapAround="true"
          :transition="1000" @init="">
          <Slide v-for=" (index, value) in store.getters.newList " :key="index">
            <div class="flex flex-col gap-5 ">
              <RouterLink :to="{ path: `/list/${index.slug}` }" class=" h-80 w-56 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img :src="index.cover" class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${index.title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>



    <div class="flex flex-col gap-2 justify-center items-center w-full ">
      <h2 class="text-black text-4xl font-medium my-10">Promowane serie </h2>
      <CarouselSlide :data="store.getters.listTop" :p="false" :n="true" :numbering="true" :itemsShow="3" :autoplay="0"
        :top="true" />
    </div>
    <div class="flex  gap-1 w-11/12 mt-10">
      <div class="w-9/12">
        <h1 class=" my-3 text-2xl font-medium"> Ostatnio dodane </h1>
        <Carousel class="w-full" ref="aaa" :itemsToShow="7" snapAlign="start" :autoplay="3000" :wrapAround="true"
          :transition="1000" @init="">
          <Slide v-for=" (index, value) in store.getters.listNewSeson.length / 2" :key="index">
            <div class="flex flex-col gap-5 ">
              <RouterLink
                :to="{ path: `/list/${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].anime_id}/${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].anime_episode_number}` }"
                class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img
                    :src="store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].cover"
                    class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute top-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  Odcinek <span class=" text-amber-300 font-medium">{{ store.getters.listNewSeson[value % 2 === 0 ?
                    (value
                      === 0 ? value : value * 2) : value * 2].anime_episode_number }}</span>
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? value : value * 2) : value *
                    2].title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
              <RouterLink
                :to="{ path: `/list/${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_id}/${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_episode_number}` }"
                class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img
                    :src="store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].cover"
                    class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute top-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  Odcinek <span class=" text-amber-300 font-medium">{{ store.getters.listNewSeson[value % 2 === 0 ?
                    (value
                      === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_episode_number }} </span>
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${store.getters.listNewSeson[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 +
                    1].title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="w-3/12  ml-10">
        <h1 class=" my-3 text-2xl font-medium text-right"> Kategorie </h1>
        <div class=" w-full flex flex-wrap justify-end gap-2">
          <Genres v-for="item in store.getters.genres" :item="item" :select="true" class="" />
        </div>
      </div>
    </div>


    <div class="flex  gap-1 w-11/12 mt-10">
      <div class="w-full">
        <h1 class=" my-3 text-2xl font-medium"> Nieemitowane odcinki </h1>
        <Carousel class="w-full" ref="aaa" :itemsToShow="10" snapAlign="start" :autoplay="3000" :wrapAround="true"
          :transition="1000" @init="">
          <Slide v-for=" (index, value) in store.getters.listNew.length / 2" :key="index">
            <div class="flex flex-col gap-5 ">
              <RouterLink
                :to="{ path: `/list/${store.getters.listNew[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].anime_id}/${store.getters.listNew[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].anime_episode_number}` }"
                class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img
                    :src="store.getters.listNew[value % 2 === 0 ? (value === 0 ? value : value * 2) : value * 2].cover"
                    class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute top-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  Odcinek <span class=" text-amber-300 font-medium">{{ store.getters.listNew[value % 2 === 0 ?
                    (value
                      === 0 ? value : value * 2) : value * 2].anime_episode_number }}</span>
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${store.getters.listNew[value % 2 === 0 ? (value === 0 ? value : value * 2) : value *
                    2].title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
              <RouterLink
                :to="{ path: `/list/${store.getters.listNew[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_id}/${store.getters.listNew[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_episode_number}` }"
                class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img
                    :src="store.getters.listNew[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 + 1].cover"
                    class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute top-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  Odcinek <span class=" text-amber-300 font-medium">{{ store.getters.listNew[value % 2 === 0 ?
                    (value
                      === 0 ? 1 : value * 2 + 1) : value * 2 + 1].anime_episode_number }} </span>
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${store.getters.listNew[value % 2 === 0 ? (value === 0 ? 1 : value * 2 + 1) : value * 2 +
                    1].title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>


    <div class="flex  gap-1 w-11/12 my-10">
      <div class="w-full">
        <h1 class=" my-3 text-2xl font-medium"> Next sezon </h1>
        <Carousel class="w-full" ref="aaa" :itemsToShow="10" snapAlign="start" :autoplay="0" :wrapAround="true"
          :transition="1000" @init="">
          <Slide v-for=" (index, value) in store.getters.nextList " :key="index">
            <div class="flex flex-col gap-5 ">
              <RouterLink :to="{ path: `/list/${index.slug}` }" class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                  class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                  <img :src="index.cover" class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>

                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                  {{ `${index.title.slice(0, 19)}...` }}
                </div>
              </RouterLink>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

import Genres from '../components/Genres.vue'

import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'
import CarouselSlide from '../components/CarouselSlide.vue'

import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
const i = ref(0)
const asdas = () => {
  if (i <= store.getters.listNewSeson.length / 2 - 1)
    return i.value++

}
const aaa = ref(null)
const ipcHandle = () => window.getApi()
</script>
