<template>
    <div class="flex flex-col m-16 ">
        <h1 class="my-3 text-xl font-bold">
            Obecny sezon
        </h1>
        <div class="h-72">
            <Swiper class="w-full h-full" :slidesPerView="3" :loop="true" :spaceBetween="40" :freeMode="true" :pagination="{
                clickable: true,
            }">
                <SwiperSlide v-for="(item, index) in store.getters.newList" :key="index"
                    class="group relative rounded-md overflow-hidden">
                    <RouterLink :to="{ path: `/list/${item.slug}` }">
                        <img :src="item.cover" alt="cover" class="w-full bg-cover bg-center absolute ">
                        <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-50 "></div>
                        <div class="absolute top-2 p-2 flex gap-2">
                            <div v-for="(item, index) in item.genres" :key="index" class="bg-gray-900 p-2 rounded-md  ">
                                {{ item }}
                            </div>
                        </div>
                        <h2 class="absolute bottom-2 p-2 font-bold group-hover:text-red-700">{{ item.title }}</h2>
                    </RouterLink>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="flex flex-row gap-3 justify-between mb-14">
            <div class="h-60 w-1/2">
                <h1 class="my-3 text-xl font-bold">
                    Nastepny sezon
                </h1>
                <Swiper class="w-full h-full" :slidesPerView="5" :loop="true" :spaceBetween="10" :freeMode="true"
                    :pagination="{
                        clickable: true,
                    }">
                    <SwiperSlide v-for="(item, index) in store.getters.nextList" :key="index"
                        class="group relative rounded-md overflow-hidden ">
                        <RouterLink :to="{ path: `/list/${item.slug}` }">
                            <img :src="item.cover" alt="cover" class="w-full h-full bg-cover bg-center absolute ">
                            <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 "></div>
                            <h2 class="absolute bottom-2 p-2 font-medium group-hover:text-red-700">{{ `${item.title.slice(0,
                                19)}...`
                            }}</h2>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div class="">
                <h1 class=" text-right text-xl font-bold my-3">
                    Gatunki
                </h1>
                <div class="flex flex-row-reverse flex-wrap gap-1  ">
                    <GenreItem v-for="(item, index) in store.getters.genres" :key="index" :item="item" :typ="false"
                        class="!bg-slate-950" />
                </div>
            </div>
        </div>
        <div v-if="last && lastNot">
            <div class="h-60 mb-14 ">
                <h1 class="my-3 text-xl font-bold">
                    Nowe odcinki
                </h1>
                <Swiper class="w-full h-full" :slidesPerView="10" :loop="true" :spaceBetween="10" :freeMode="true"
                    :pagination="{
                        clickable: true,
                    }">
                    <SwiperSlide v-for="(item, index) in last" :key="index"
                        class="group relative rounded-md overflow-hidden ">
                        <RouterLink
                            :to="{ name: `ItemEpisode`, params: { id: item.anime_id, episode: item.anime_episode_number } }">
                            <img :src="item.cover" alt="cover" class="w-full h-full bg-cover bg-center absolute  ">
                            <div
                                class="absolute top-0 right-0 size-8 font-bold bg-slate-700 flex justify-center items-center">
                                {{
                                    item.anime_episode_number }}</div>
                            <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 "></div>
                            <h2 class="absolute bottom-2 p-2 font-medium group-hover:text-red-700">{{ `${item.title.slice(0,
                                19)}...`
                            }}</h2>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div class="h-60 ">
                <h1 class="my-3 text-xl font-bold">
                    Nieemitowane odcinki
                </h1>
                <Swiper class="w-full h-full" :slidesPerView="10" :loop="true" :spaceBetween="10" :freeMode="true"
                    :pagination="{
                        clickable: true,
                    }">
                    <SwiperSlide v-for="(item, index) in lastNot" :key="index"
                        class="group relative rounded-md overflow-hidden ">
                        <RouterLink
                            :to="{ name: `ItemEpisode`, params: { id: item.anime_id, episode: item.anime_episode_number } }">
                            <img :src="item.cover" alt="cover" class="w-full h-full bg-cover bg-center absolute  ">
                            <div
                                class="absolute top-0 right-0 size-8 font-bold bg-slate-700 flex justify-center items-center">
                                {{
                                    item.anime_episode_number }}</div>
                            <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 "></div>
                            <h2 class="absolute bottom-2 p-2 font-medium group-hover:text-red-700">{{ `${item.title.slice(0,
                                19)}...`
                            }}</h2>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <LoaderComponet v-else class="!h-1/2 mt-24" />
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },

};
</script>
<script setup>
import LoaderComponet from '@/components/LoaderComponet.vue';
import { useStore } from 'vuex'
import GenreItem from '@/components/GenreItem.vue';
import { onMounted, ref } from 'vue'
import https from 'https'
import season from "../helpers/date";
const store = useStore();

store.dispatch(`celeanGenres`)


const last = ref(null)
const lastNot = ref(null)
onMounted(async () => {
    https.get(`https://api.docchi.pl/v1/episodes/latest?season=${season().season}&season_year=${season().yers}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            last.value = JSON.parse(data)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    https.get(`https://api.docchi.pl/v1/episodes/latest?season=${season().season}&season_year=${season().yers}&type=not`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            lastNot.value = JSON.parse(data)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})
</script>

