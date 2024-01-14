<template>
    <div class="max-h-screen bg-slate-950 fixed">
        <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden hover:shadow-lg" :class="{ '!w-52  ': toogleBar, }">
            <div class="flex h-screen flex-col justify-between pt-14 ">
                <ul class=" space-y-2 tracking-wide">
                    <ListNav v-for="(item, index) in routes" :key="index" :item="item" />

                </ul>
                <div class="min-w-max ">
                    <button class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600">
                        <AdjustmentsHorizontalIcon class="w-6 h-6" />
                        <span class="group-hover:text-slate-400">Opcje</span>
                    </button>
                </div>

                <div class="min-w-max ">
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
import { ipcRenderer } from 'electron';
import { XCircleIcon, AdjustmentsHorizontalIcon, } from '@heroicons/vue/24/solid'

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
