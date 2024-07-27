<template>
  <nav class="dragApp fixed flex flex-col justify-between h-full py-3 w-[40px] bg-gray-400 dark:bg-neutral-900 z-10">
    <div class="flex flex-col items-center gap-2">
      <NavIconLink v-for="item in navItems" :key="item.label" :icon="item.icon" :label="item.label" :to="item.to" />
    </div>
    <div class="flex flex-col justify-center items-center gap-2">
      <button class="flex flex-col items-center p-1 rounded-full hover:animate-pulse">
        <AnOutlinedInfoCircle class="text-2xl text-black dark:text-white" />
      </button>
    </div>
  </nav>
</template>


<script setup>
import NavIconLink from './NavIconLink.vue';
import {
  AnOutlinedInfoCircle,
  FaRegRectangleList,
  FaFireFlameCurved,
  AkHome
} from '@kalimahapps/vue-icons'

const navItems = [
  { icon: AkHome, label: 'Nami', to: 'home' },
  { icon: FaRegRectangleList, label: 'Lista Anime', to: 'edit' },
  { icon: FaFireFlameCurved, label: 'Sezon', to: 'new' },
];
</script>

<!-- //https://vue-icons.kalimah-apps.com/?ref=madewithvuejs.com -->