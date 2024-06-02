<template>
    <div class="p-2 flex flex-col  w-[calc(100%-10px)]  ">
        <h1 class="flex gap-2 items-center justify-center text-4xl ">
            <IconSeason :season="date().season" />
            <span>{{ date(false, 'pl').season }}</span>
            <span> {{ date(false, 'pl').yers }}</span>
        </h1>
    </div>
</template>

<script setup>
import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'
import Versions from '../components/Versions.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const ipcHandle = () => window.getApi()


</script>
