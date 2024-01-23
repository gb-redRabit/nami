<template>
    <div class="max-h-screen bg-slate-950 fixed">
        <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden hover:shadow-lg" :class="{ '!w-52  ': toogleBar, }">
            <div class="flex h-screen flex-col justify-between  ">
                <button class=" p-3 text-lg" @click="$emit('toogle')">
                    <Transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
                        leave-active-class="animate__animated animate__fadeOut animate__faster">
                        <ArrowRightIcon class="size-8 text-gray-100 hover:text-slate-500" v-if="!toogleBar" />
                        <ArrowLeftIcon class="size-8 text-gray-100 hover:text-slate-500" v-else />
                    </Transition>
                </button>
                <ul class=" space-y-2 tracking-wide">
                    <ListNav :routes="routes" />
                </ul>
                <div class="min-w-max ">
                    <button class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600">
                        <AdjustmentsHorizontalIcon class="size-6" />
                        <span class="group-hover:text-slate-400">Opcje</span>
                    </button>
                </div>

                <div class="min-w-max ">
                    <button @click="closeApp"
                        class="w-full group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600">
                        <XCircleIcon class="size-6" />
                        <span cclass="group-hover:text-slate-400">Wyjście</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ipcRenderer } from 'electron';
import { XCircleIcon, AdjustmentsHorizontalIcon, ArrowRightIcon, ArrowLeftIcon, } from '@heroicons/vue/24/solid'

import ListNav from "./nav/ListNav.vue";
import routes from "../router/routes";

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
