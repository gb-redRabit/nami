<template>
  {{ console.log(anime) }}
  <div class="fixed top-0 left-[40px] w-screen h-screen bg-white bg-opacity-40 flex justify-center items-center"
    v-if="anime.episodes > 1">
    <div class="absolute w-full h-full cursor-pointer" @click="$router.push({ name: `anime`, params: { id: id } })">
    </div>
    <div class="bg-black bg-opacity-40 w-5/6 h-5/6 flex flex-col justify-center items-center z-10 relative">
      <button
        class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600 absolute top-2 right-2"
        @click="$router.push({ name: `anime`, params: { id: id } })">
        <ClCloseCircle class="size-8" />
      </button>
      <h1 class="text-white">Odcinek {{ episode }}</h1>
      <Player :idr="id" :episode="episode" />
    </div>
  </div>
  <div v-else>
    <Player :idr="id" :episode="episode" />
  </div>
</template>

<script setup>
import { ClCloseCircle } from '@kalimahapps/vue-icons'

import Player from '../components/episode/Player.vue'

defineProps({
  id: String,
  episode: String,
  anime: Object,
})
</script>
