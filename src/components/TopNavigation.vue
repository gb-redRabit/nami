<template>
    <div class="flex flex-row justify-between items-center bg-slate-950 z-10">
        <button class=" p-3 text-lg" @click="$emit('toogle')">
            <Transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster">
                <ArrowRightIcon class="h-8 w-8 text-gray-100 hover:text-slate-500" v-if="!toogleBar" />
                <ArrowLeftIcon class="h-8 w-8 text-gray-100 hover:text-slate-500" v-else />
            </Transition>
        </button>
        <div>
            hmmmm dodać menu nawigacyjne do podstron oraz zmienić pozycje guzika do menu głównego
        </div>
        <div class="min-w-max">
            <div class=" w-full  flex items-center space-x-2 px-4 py-3 text-gray-100 ">
                <MagnifyingGlassIcon class=" bg-slate-100 text-gray-700  rounded-l-xl w-8 h-8 p-2 cursor-pointer" />
                <input class="sidebar h-8 w-11/12 rounded-r-xl bg-slate-100 text-gray-700" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRightIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

defineEmits(["toogle"])
defineProps({
    toogleBar: {
        type: Boolean,
    },
})
</script>

