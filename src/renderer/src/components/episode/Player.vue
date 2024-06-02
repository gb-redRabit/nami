<template>
  <div class=" flex flex-col " v-if="item && list && description">
    <div class="flex lex-col justify-center items-center">
      <button :disabled="episode == 1"
        class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600 flex"
        :class="{ ' hidden': episode == 1 }"
        @click="$router.push({ name: `episode`, params: { id: idr, episode: Number(episode) - 1 } })">
        <FlFilledPreviousFrame class="size-8" />
      </button>
      <iframe :src="player(select)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
        allow="clipboard-write" title="player" className="z-10 min-w-[1000px] h-[600px] m-2" />
      <button class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600 flex" :class="{
        'hidden': description.episodes == episode || list[list.length - 1].anime_episode_number == episode
      }" @click="$router.push({ name: `episode`, params: { id: idr, episode: Number(episode) + 1 } })">
        <FlFilledNextFrame class="size-8" />
      </button>
    </div>
    <Hosting :item="item" :select="select" @selectPlayer="selectPlayer" />
  </div>
  <Loader v-else />
</template>

<script setup>
import { FlFilledPreviousFrame } from "@kalimahapps/vue-icons";
import { FlFilledNextFrame } from "@kalimahapps/vue-icons";

import Hosting from "./Hosting.vue";

import { onMounted, ref } from 'vue'
import Loader from "../Loader.vue";

const props = defineProps({
  idr: {
    type: String,
  },
  episode: {
    type: String,
  },
})

const select = ref(0)
const item = ref({ cda: [], vk: [], dailymotion: [], other: [], mega: [], google: [] });
const description = ref('');
const list = ref();

const selectPlayer = (id) => {
  select.value = id
}


const sortPlayer = (items) => {
  items.forEach((value) => {
    switch (value.player_hosting) {
      case 'cda': item.value.cda.push(value); break;
      case 'CDA': item.value.cda.push(value); break;
      case 'vk': item.value.vk.push(value); break;
      case 'VK': item.value.vk.push(value); break;
      case "dailymotion": item.value.dailymotion.push(value); break;
      case "DAILYMOTION": item.value.dailymotion.push(value); break;
      case "google": item.value.google.push(value); break;
      case "GOOGLE": item.value.google.push(value); break;
      case "gdrive": item.value.google.push(value); break;
      case "mega": item.value.mega.push(value); break;
      case "MEGA": item.value.mega.push(value); break;
      default: item.value.other.push(value); break;
    }
  })
}


const player = (number) => {
  let src;
  let tab = item.value.cda.concat(item.value.vk).concat(item.value.dailymotion).concat(item.value.other).concat(item.value.google).concat(item.value.mega)
  tab.forEach((value) => {
    if (value.id === number) {
      const lastIndex = value.player.lastIndexOf("/");
      const lenghtPlayer = value.player.length;
      if (value.player_hosting.toUpperCase() === "CDA") {
        src = `https://ebd.cda.pl/620x368/${value.player.slice(
          lastIndex + 1,
          lenghtPlayer
        )}`;
      } else if (value.player_hosting.toLowerCase() === "mp4upload") {
        src = value.player.slice(0, lenghtPlayer - 5);
      }
      else {
        src = value.player;
      }
    }
  })
  return src
}

window.electron.ipcRenderer.on('sendApiSix', (__, data) => {
  sortPlayer(data)
  select.value = data[0].id
  window.electron.ipcRenderer.send('getApiSeven', `https://api.docchi.pl/v1/series/find/${props.idr}`);
})


window.electron.ipcRenderer.on('sendApiSeven', (__, data) => {
  description.value = data

})

window.electron.ipcRenderer.on('sendApiFive', (__, data) => {
  list.value = data.sort((a, b) => a.anime_episode_number - b.anime_episode_number)
  const ids = list.value.map(({ anime_episode_number }) => anime_episode_number);
  list.value = list.value.filter(({ anime_episode_number }, index) =>
    !ids.includes(anime_episode_number, index + 1));
})

onMounted(async () => {
  window.electron.ipcRenderer.send('getApiSix', `https://api.docchi.pl/v1/episodes/find/${props.idr}/${props.episode}`);
  window.electron.ipcRenderer.send('getApiFive', `https://api.docchi.pl/v1/episodes/count/${props.idr}`);
})

</script>
