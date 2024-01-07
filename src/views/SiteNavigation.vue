<template>
    <div class="max-h-screen bg-slate-950 fixed">
        <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden hover:shadow-lg" :class="{ '!w-52  ': toogleBar, }">
            <div class="flex h-screen flex-col justify-between  pb-6">
                <div class="min-w-max -mb-3">
                    <div class=" w-full group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600">
                        <MagnifyingGlassIcon @click="$emit('toogle')" class=" sidebar w-6 h-6 cursor-pointer"
                            :class="{ 'bg-slate-100 text-gray-700  rounded-l-xl w-8 h-8': toogleBar }" />
                        <input class="sidebar h-8 w-7/12 rounded-r-xl bg-slate-950 text-gray-700"
                            :class="{ ' !bg-slate-100': toogleBar }" />
                    </div>
                </div>
                <ul class="mt-10 space-y-2 tracking-wide">
                    <li class="min-w-max">
                        <RouterLink :to="{ name: 'home' }" exact aria-label="dashboard"
                            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
                            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                            <HomeIcon class="w-6 h-6" />
                            <span class="group-hover:text-slate-400 font-medium">Strona główna</span>
                        </RouterLink>
                    </li>
                    <li class="min-w-max">
                        <RouterLink :to="{ name: 'anime' }"
                            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
                            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                            <FireIcon class="w-6 h-6" />
                            <span class="group-hover:text-slate-400">Anime</span>
                        </RouterLink>
                    </li>
                    <li class="min-w-max">
                        <RouterLink :to="{ name: 'filmy' }"
                            class="group flex items-center space-x-4  px-4 py-3 text-gray-100 hover:bg-slate-600"
                            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                            <FilmIcon class="w-6 h-6" />
                            <span class="group-hover:text-slate-400">Film</span>
                        </RouterLink>
                    </li>
                    <li class="min-w-max">
                        <RouterLink :to="{ name: 'galeria' }"
                            class="group flex items-center space-x-4  px-4 py-3 text-gray-100 hover:bg-slate-600"
                            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                            <PhotoIcon class="w-6 h-6" />
                            <span class="group-hover:text-slate-400">Galeria</span>
                        </RouterLink>
                    </li>
                    <li class="min-w-max">
                        <RouterLink :to="{ name: 'inne' }"
                            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
                            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                            <HomeIcon class="w-6 h-6" />
                            <span class="group-hover:text-slate-400">Inne</span>
                        </RouterLink>
                    </li>
                </ul>

                <div class="min-w-max -mb-3">
                    <RouterLink :to="{ name: 'ustawienia' }"
                        class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
                        active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
                        <AdjustmentsHorizontalIcon class="w-6 h-6" />
                        <span class="group-hover:text-slate-400">Opcje</span>
                    </RouterLink>
                </div>
                <div class="min-w-max -mb-3">
                    <button @click="closeApp"
                        class="w-full group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600">
                        <XCircleIcon class="w-6 h-6" />
                        <span cclass="group-hover:text-slate-400">Wyjście</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { ipcRenderer } = window.require("electron");
import { defineProps, defineEmits } from "vue"
import { HomeIcon, FilmIcon, PhotoIcon, FireIcon, XCircleIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

defineEmits(["toogle"])
defineProps({
    toogleBar: {
        type: Boolean,
    },
})

const closeApp = () => {
    ipcRenderer.send("close");
}
</script>

<style scoped></style>
