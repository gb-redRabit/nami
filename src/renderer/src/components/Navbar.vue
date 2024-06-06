<template>
  <nav class="dragApp fixed flex flex-col justify-between h-full py-3 w-[40px] bg-gray-400 z-10">
    <div class="flex flex-col items-center gap-2">
      <RouterLink :to="{ name: 'home' }" exact class="group p-1 relative  " active-class="text-gray-600">
        <AkHome class="text-2xl" />
        <div
          class="transition-all duration-100 ease-linear h-full flex items-center  absolute opacity-0  bg-gray-400 left-9 top-0 group-hover:opacity-100 font-medium  px-2 pr-7  rounded-r-full">
          Nami
        </div>
      </RouterLink>
      <div class="w-9/12 h-[1.5px] bg-black -mt-2"></div>
      <RouterLink :to="{ name: 'edit' }" exact class="group p-1 relative   " active-class="text-gray-600">
        <FaRegRectangleList class="text-2xl" />
        <div
          class="transition-all duration-100 ease-linear w-32 h-full flex items-center absolute opacity-0  bg-gray-400 left-9 top-0 group-hover:opacity-100 font-medium  px-2  rounded-r-full">
          Lista Anime
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'new' }" exact class=" group p-1 relative  " active-class="text-gray-600">
        <FaFireFlameCurved class="text-2xl " />
        <div
          class="transition-all duration-100 ease-linear w-36 h-full flex items-center absolute opacity-0  bg-gray-400 left-9 top-0 group-hover:opacity-100 font-medium  px-2  rounded-r-full">
          Nowe Odcinki
        </div>
      </RouterLink>

    </div>
    <div class="flex flex-col justify-center items-center gap-2">
      <button class="flex flex-col items-center p-1 rounded-full hover:animate-pulse">
        <AnOutlinedInfoCircle class="text-2xl" />
      </button>
    </div>
  </nav>
</template>

<script setup>

import {
  AnOutlinedInfoCircle,
  FaRegRectangleList,
  FaFireFlameCurved,
  AkHome
} from '@kalimahapps/vue-icons'

import routes from '../router/routes'

//https://vue-icons.kalimah-apps.com/?ref=madewithvuejs.com
</script>
