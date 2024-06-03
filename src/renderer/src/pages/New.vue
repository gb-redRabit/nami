<template>
    <div class="p-10 flex flex-col justify-center items-center w-full   ">
        <h1 class="flex gap-2 items-center justify-center text-4xl ">
            <IconSeason :season="date().season" />
            <span>{{ date(false, 'pl').season }}</span>
            <span> {{ date(false, 'pl').yers }}</span>
        </h1>
        <div class="flex flex-wrap gap-2 justify-center items-center w-full mt-10">
            <Card v-for="(item, index) in store.getters.newList" :key="index" :item="item" :set="60" :index="index" />

        </div>
    </div>
</template>

<script setup>
import Card from '../components/list/Card.vue'

import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'
import Versions from '../components/Versions.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const ipcHandle = () => window.getApi()


</script>
