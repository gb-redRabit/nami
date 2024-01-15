<template>
    <div class="flex flex-col  items-center justify-start z-10 relative min-h-full w-full" v-if="item">
        <div
            class="absolute top-0 right-0 left-0 h-4/5 z-[-1]  blur-[3px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(17,24,39,1)]">
            <img :src="item.bg ? item.bg : item.cover" alt="cover" class='h-full w-full object-cover '>
        </div>
        <div class="flex flex-row gap-10 mt-48 w-11/12 ">
            <img :src="item.cover" alt="cover" class='w-52 rounded-md' />
            <div class=" flex flex-col w-2/4 gap-2 -mt-10">
                <div class="flex gap-3">
                    <GenreItem v-for="(item, index) in  item.genres" :key="index" :item="item" :typ="false" />
                </div>
                <h1 class="font-bold text-2xl">{{ item.title }}</h1>
                <h2 class="font-medium text-md">{{ item.title_en }}</h2>
                <p class="mt-10">{{
                    item.description }}</p>
            </div>
            <div class=" flex flex-col  gap-2 -mt-10">
                <h3 class="font-bold text-2xl">{{ item.series_type }}</h3>
                <h3 class="font-bold text-2xl">{{ item.episodes }}</h3>
                <h3 class="font-bold text-2xl">{{ item.aired_from }}</h3>
                <h3 class="font-bold text-2xl">{{ item.season_year }}</h3>
                <h3 class="font-bold text-2xl">{{ item.season }}</h3>
                <h3 class="font-bold text-2xl">{{ item.broadcast_day }}</h3>
            </div>
        </div>
        <div class="flex flex-row flex-wrap gap-4 justify-center w-11/12 mt-10">
            <div v-for="(item, index) in  list" :key="index"
                class="group relative w-48 h-32 overflow-hidden cursor-pointer ">
                <img :src="item.bg" alt="" class="w-full h-full" v-if="item.bg">
                <div v-else class=" w-full h-full bg-gray-600 flex justify-center items-center">
                    <PhotoIcon class="w-6 h-6" />
                </div>
                <div
                    class=" absolute -top-32 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center transition-all duration-300 ease-in-out group-hover:top-0">
                    <h3 class="font-bold text-4xl">{{ item.anime_episode_number }}</h3>

                </div>
            </div>
        </div>

    </div>
    <div v-else>
        ładowanie
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GenreItem from '@/components/GenreItem.vue';
import https from 'https'

import { PhotoIcon } from '@heroicons/vue/24/solid'
const item = ref(null)
const list = ref(null)

const props = defineProps({
    id: {
        type: String,
    },
})


onMounted(async () => {
    https.get(`https://api.docchi.pl/v1/series/find/${props.id}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            item.value = JSON.parse(data)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    https.get(`https://api.docchi.pl/v1/episodes/count/${props.id}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {

            list.value = JSON.parse(data).sort((a, b) => a.anime_episode_number - b.anime_episode_number)
            console.log(list.value)
            const ids = list.value.map(({ anime_episode_number }) => anime_episode_number);
            list.value = list.value.filter(({ anime_episode_number }, index) =>
                !ids.includes(anime_episode_number, index + 1));

        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})

</script>
