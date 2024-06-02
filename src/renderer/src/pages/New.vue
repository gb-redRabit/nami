<template>
    <div class="p-10 flex flex-col justify-center items-center w-full   ">
        <h1 class="flex gap-2 items-center justify-center text-4xl ">
            <IconSeason :season="date().season" />
            <span>{{ date(false, 'pl').season }}</span>
            <span> {{ date(false, 'pl').yers }}</span>
        </h1>
        <div class="flex flex-wrap gap-2 justify-center items-center w-full mt-10">
            <!-- <div v-for="item in store.getters.newList" :key="item.mal_id">{{ item }}</div> -->
            <!-- <Card v-for="(item, index) in store.getters.newList" :key="index" :item="item" /> -->
            <RouterLink v-for="(item, index) in store.getters.newList" :key="index"
                :to="item.episodes > 1 ? { path: `/list/${item.slug}` } : { path: `/list/${item.slug}/1` }">
                <div class="group h-64 w-44 relative rounded-xl ">
                    <div
                        class="transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)] group-hover:after:to-[rgba(0,0,0,0.5)] ">
                        <img :src="item.cover" class="absolute w-full h-full rounded-xl group-hover:blur-[1px]"
                            alt="cover">
                    </div>
                    <div class="absolute bottom-0 w-full p-2">
                        <h1 class="text-gray-100 group-hover:text-white">{{ item.title.length <= 20 ? item.title :
                            `${item.title.slice(0, 19)}...` }}</h1>
                    </div>
                </div>
            </RouterLink>
        </div>
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
