<template>
  <div class="flex flex-col" v-if="list !== 'ERR_BAD_REQUEST' && description">
    <div class="flex lex-col justify-center items-center">
      <button :disabled="episode == 1"
        class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600 flex"
        :class="{ ' hidden': episode == 1 }" @click="
          $router.push({ name: `episode`, params: { id: idr, episode: Number(episode) - 1 } })
          ">
        <FlFilledPreviousFrame class="size-8" />
      </button>
      <iframe :src="player(select)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
        allow="clipboard-write" title="player" class="z-10 min-w-[1000px] h-[600px] m-2 bg-black"
        :class="{ ' invert': typHost === 'vk' }" />
      <button class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600 flex" :class="{
        hidden:
          description.episodes == episode
      }" @click="
        $router.push({ name: `episode`, params: { id: idr, episode: Number(episode) + 1 } })
        ">
        <FlFilledNextFrame class="size-8" />
      </button>
    </div>
    <Hosting :item="item" :select="select" @selectPlayer="selectPlayer" />
  </div>
  <div class="flex flex-col" v-else-if="list === 'ERR_BAD_REQUEST'"></div>
  <Loader v-else />
</template>

<script setup>
import { FlFilledPreviousFrame, FlFilledNextFrame } from '@kalimahapps/vue-icons'

import Hosting from './Hosting.vue'
import Loader from '../Loader.vue'

import { onMounted, ref } from 'vue'

const { idr, episode } = defineProps({
  idr: String,
  episode: String,
})

const select = ref(0)
const typHost = ref('')
const item = {
  cda: [],
  vk: [],
  dailymotion: [],
  other: [],
  mega: [],
  google: []
}
const description = ref('')
const list = ref()

const selectPlayer = (id, typ) => {
  select.value = id
  typ ? (typHost.value = typ) : ''
}

const sortPlayer = (items) => {
  items.forEach((value) => {
    const category = value.player_hosting.toLowerCase()
    switch (category) {
      case 'cda':
      case 'vk':
      case 'dailymotion':
      case 'other':
      case 'mega':
      case 'google':
        item[category].push(value)
        break
      default:
        item.other.push(value)
        break
    }
  })
}

const player = (number) => {
  const tab = [
    ...item.cda,
    ...item.vk,
    ...item.dailymotion,
    ...item.other,
    ...item.google,
    ...item.mega
  ]

  for (const value of tab) {
    if (value.id === number) {
      const lastIndex = value.player.lastIndexOf('/')
      const lengthPlayer = value.player.length
      if (value.player_hosting.toUpperCase() === 'CDA') {
        return `https://ebd.cda.pl/620x368/${value.player.slice(lastIndex + 1, lengthPlayer)}`
      } else if (value.player_hosting.toLowerCase() === 'mp4upload') {
        return value.player.slice(0, lengthPlayer - 5)
      } else {
        return value.player
      }
    }
  }

  return null
}

window.electron.ipcRenderer.on('sendApiSix', (__, data) => {
  if (data === 'ERR_BAD_REQUEST') {
    select.value = data
  } else {
    select.value = data[0].id
    sortPlayer(data)
    selectPlayer(data[0].id, data[0].player_hosting)
  }
})

window.electron.ipcRenderer.on('sendApiSeven', (__, data) => {
  description.value = data
})

window.electron.ipcRenderer.on('sendApiFive', (__, data) => {
  if (data !== 'ERR_BAD_REQUEST') {
    const sortedData = [...data].sort((a, b) => a.anime_episode_number - b.anime_episode_number)
    const uniqueIds = new Set(sortedData.map(({ anime_episode_number }) => anime_episode_number))
    list.value = sortedData.filter(({ anime_episode_number }) =>
      uniqueIds.has(anime_episode_number)
    )
  } else {
    list.value = data
  }
})

onMounted(async () => {
  window.electron.ipcRenderer.send(
    'getApiSeven',
    `https://api.docchi.pl/v1/series/find/${idr}`
  )
  window.electron.ipcRenderer.send(
    'getApiSix',
    `https://api.docchi.pl/v1/episodes/find/${idr}/${episode}`
  )
  window.electron.ipcRenderer.send(
    'getApiFive',
    `https://api.docchi.pl/v1/episodes/count/${idr}`
  )
})
</script>
