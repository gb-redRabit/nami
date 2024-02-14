<template>
    <div class=" flex flex-col  items-center justify-start z-10 relative min-h-screen w-full" v-if="item && related">
        <div
            class="absolute top-0 right-0 left-0 h-4/5 z-[-1]  blur-[3px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(17,24,39,1)]">
            <img :src="item.bg ? item.bg : item.cover" alt="cover" class='h-full w-full object-cover '>
        </div>
        <div class="flex flex-row gap-10 mt-48 w-11/12 ">
            <div class="w-1/3 flex flex-col gap-2">
                <img :src="item.cover" alt="cover" class='w-full rounded-md' />
                <div class=" flex flex-col  gap-2  bg-gray-900 bg-opacity-60 rounded-md p-2">
                    <h3 class="">Typ: <b>{{ item.series_type }}</b></h3>
                    <h3 class="">Ilość odcinków: <b>{{ item.episodes }}</b></h3>
                    <h3 class="">Rok: <b>{{ item.season_year }}</b></h3>
                    <h3 class="">Sezon: <b>{{ item.season }}</b></h3>
                    <h3 class="">Dzień wychodzenia: <b>{{ item.broadcast_day }}</b></h3>
                </div>
            </div>

            <div class=" flex flex-col w-full gap-2 -mt-12">
                <div class="flex gap-3">
                    <GenreItem v-for="(item, index) in  item.genres" :key="index" :item="item" :typ="false" />
                </div>
                <h1 class="font-bold text-4xl">{{ item.title }}</h1>
                <h2 class="font-medium text-2xl">{{ item.title_en }}</h2>
                <p class="mt-10 bg-gray-900 p-2 bg-opacity-60 rounded-md text-justify text-xl">{{
                    item.description }}</p>
                <div class="flex flex-wrap gap-3 mt-10">
                    <button @click="$router.push({
                        name: `listItem`, params: {
                            id: item.slug
                        }
                    });" v-for="(item, index) in  related" :key="index">
                        <div v-if="item" class="bg-gray-900 bg-opacity-60 rounded-md overflow-hidden flex gap-1 w-72 h-24">
                            <img :src="item.cover" alt="cover">
                            <div class="flex flex-col ">
                                <span>{{ item.relation }}</span>
                                <span>{{ item.title }}</span>
                                <span> {{ item.title_en }}</span>
                            </div>

                        </div>
                    </button>
                </div>
                <div class="grid grid-cols-7 gap-2 justify-center  my-10 bg-gray-900 bg-opacity-60 rounded-md p-3"
                    :class="{ '!grid-cols-1': item.episodes == 1 }" v-if="list !== null">
                    <RouterLink :to="{ path: `/list/${item.slug}/${episode.anime_episode_number}` }"
                        v-for="(episode, index) in  list" :key="index"
                        class="group relative w-48 h-32 overflow-hidden cursor-pointer rounded-md">
                        <img :src="episode.bg ? episode.bg : item.cover" alt="" class="w-full h-full  object-cover">
                        <div
                            class=" absolute -top-32 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center transition-all duration-300 ease-in-out group-hover:top-0">
                            <h3 class="font-bold text-4xl">{{ episode.anime_episode_number }}</h3>
                        </div>
                    </RouterLink>
                </div>
                <div v-else> brak odcinków</div>
            </div>
        </div>
        <RouterView v-slot="{ Component }" :key="$route.path">
            <Component :is="Component" />
        </RouterView>
    </div>
    <LoaderComponet v-else />
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import GenreItem from '@/components/GenreItem.vue';
import https from 'https';

import LoaderComponet from '@/components/LoaderComponet.vue';


const store = useStore();
const item = ref(null);
const list = ref(null);
const related = ref([]);
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
            console.log(item.value)
            //linki do nastepnych seri i poprzenich
            https.get(`https://api.jikan.moe/v4/anime/${item.value.mal_id}/full`, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    if (resp.statusCode !== 404) {
                        JSON.parse(data).data.relations.forEach((value) => {
                            if (value.relation !== "Adaptation" && value.relation !== "Other") {
                                value.entry.forEach((link) => {
                                    https.get(`https://api.docchi.pl/v1/series/related/${link.mal_id} `, (resp) => {
                                        let epis = '';
                                        resp.on('data', (chunk) => {
                                            epis += chunk;
                                        });
                                        resp.on('end', () => {
                                            if (resp.statusCode !== 404) {
                                                let obj = JSON.parse(epis)[0]
                                                if (obj != undefined) {
                                                    obj.relation = value.relation
                                                    related.value.push(obj)
                                                }
                                            }
                                        });
                                    })
                                })
                            }
                        })
                    }
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
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
