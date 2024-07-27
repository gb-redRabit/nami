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
      <h2 class=" text-4xl font-medium my-10">Promowane serie </h2>
      <Carousel class="w-11/12" ref="myCarousel" :itemsToShow="3" snapAlign="start" :autoplay="0" :wrapAround="true"
        :transition="1000">
        <Slide v-for="(item, index) in store.getters.listTop" :key="index">
          <div class="h-96 w-[560px] relative rounded-xl text-gray-100 overflow-hidden">
            <div
              class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-lg after:h-full after:content-[''] after:bg-black after:opacity-60 dark:after:opacity-20">
              <img :src="item.images.jpg.large_image_url" class="w-full absolute object-cover rounded-lg "
                alt="cover" />
            </div>
            <div
              class="absolute z-10 top-1 right-1 bg-amber-300 dark:bg-neutral-900 size-9 flex justify-center items-center rounded-full font-medium">
              <McCupcakeFill class=" text-neutral-200 text-2xl" v-if="index === 0" />
              <span v-else>#</span>{{ index + 1 }}
            </div>
            <div class="absolute top-0  text-left w-full flex flex-col justify-start items-start gap-2 p-4  ">
              <div class="text-2xl font-medium">{{ item.title.length <= 40 ? item.title : `${item.title.slice(0,
                40)}...` }}</div>
                  <div class="flex justify-center items-center ">
                    <div class="text-amber-300 font-medium">{{ item.type }}</div>
                    <BsDot class=" text-xl" />
                    <div>Odcinki
                      <span v-if="item.episodes">{{ item.episodes
                        }}</span>
                      <span v-else>??</span>
                    </div>
                    <BsDot class=" text-xl" />
                    <div>{{ item.duration.slice(0, 6) }}</div>
                  </div>
                  <div> {{ item.synopsis.length <= 120 ? item.synopsis : `${item.synopsis.slice(0, 120)}...` }}</div>
                  </div>
                  <div class=" flex gap-2 absolute bottom-1 left-1 py-1 px-2 ">
                    <button @click="$router.push({ path: `/list/${item.slug}/1` })"
                      class="flex justify-center items-center py-1 px-2 rounded-lg  bg-amber-300  hover:bg-amber-600 dark:bg-neutral-900  dark:hover:bg-neutral-700 ">
                      <BxPlay class="text-2xl" /> Oglądaj
                    </button> <button @click="$router.push({ path: `/list/${item.slug}` })"
                      class=" flex gap-2 justify-center items-center  py-1 px-2 rounded-lg text-amber-300   border-amber-300  border-4 border-solid hover:border-amber-600 hover:text-amber-600 dark:border-neutral-900 dark:text-neutral-900  dark:hover:border-neutral-700 dark:hover:text-neutral-700">
                      <BxSolidBookBookmark /> Wiecej
                    </button>

                  </div>
              </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
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

import { McCupcakeFill } from '@kalimahapps/vue-icons'
import Genres from '../components/Genres.vue'

import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'


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

<style>
:root {
  --vc-pgn-background-color: red;
  --vc-pgn-active-color: green;
  --vc-pgn-border-radius: 50%;
  --vc-pgn-width: 10px;
  --vc-pgn-height: 10px;
  --vc-pgn-margin: 10px;
  --vc-nav-width: 30px;
  --vc-nav-height: 30px;
  --vc-nav-color: green;
  --vc-nav-color-hover: blue;
}

.carousel__prev {
  @apply size-10 border-neutral-200 border-8 border-solid bg-amber-300 rounded-full text-black hover:text-white hover:bg-amber-500 -ml-7 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-300 dark:hover:text-neutral-900;
}

.carousel__next {
  @apply size-10 border-neutral-200 border-8 border-solid bg-amber-300 rounded-full text-black hover:text-white hover:bg-amber-500 -mr-7 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-300 dark:hover:text-neutral-900;
}
</style>