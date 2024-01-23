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
                <p class="mt-10 bg-gray-900 p-2 bg-opacity-60 rounded-md text-justify">{{
                    item.description }}</p>
            </div>
            <div class=" flex flex-col  gap-2 ">
                <h3 class="">Typ: <b>{{ item.series_type }}</b></h3>
                <h3 class="">Ilość odcinków: <b>{{ item.episodes }}</b></h3>
                <h3 class="">Rok: <b>{{ item.season_year }}</b></h3>
                <h3 class="">Sezon: <b>{{ item.season }}</b></h3>
                <h3 class="">Dzień wychodzenia: <b>{{ item.broadcast_day }}</b></h3>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-4 justify-center max-w-11/12 my-10" :class="{ '!grid-cols-1': item.episodes == 1 }"
            v-if="list !== null">
            <RouterLink
                :to="{ name: `ItemEpisode`, params: { id: item.slug, episode: episode.anime_episode_number }, query: { episodes: item.episodes } }"
                v-for="(episode, index) in  list" :key="index"
                class="group relative w-48 h-32 overflow-hidden cursor-pointer ">
                <img :src="episode.bg" alt="" class="w-full h-full" v-if="episode.bg">
                <div v-else class=" w-full h-full bg-gray-600 flex justify-center items-center">
                    <PhotoIcon class="size-6" />
                </div>
                <div
                    class=" absolute -top-32 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center transition-all duration-300 ease-in-out group-hover:top-0">
                    <h3 class="font-bold text-4xl">{{ episode.anime_episode_number }}</h3>

                </div>
            </RouterLink>
        </div>
        <div v-else> brak odcinków</div>

    </div>
    <LoaderComponet v-else />
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import GenreItem from '@/components/GenreItem.vue';
import https from 'https';

import LoaderComponet from '@/components/LoaderComponet.vue';
import { PhotoIcon } from '@heroicons/vue/24/solid'

const store = useStore();
const item = ref(null)
const list = ref(null)

const props = defineProps({
    id: {
        type: String,
    },
})

store.dispatch(`celeanGenres`)

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
            if (resp.statusCode !== 404) {
                list.value = JSON.parse(data).sort((a, b) => a.anime_episode_number - b.anime_episode_number)
                const ids = list.value.map(({ anime_episode_number }) => anime_episode_number);
                list.value = list.value.filter(({ anime_episode_number }, index) =>
                    !ids.includes(anime_episode_number, index + 1));
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})

</script>
