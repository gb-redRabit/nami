<template>
    <div class="flex flex-col m-16 ">
        <h1 class="my-3 text-xl font-bold">
            Obecny sezon {{ season(_, "pl").season }} {{ season().yers }}
        </h1>

        <SwiperList :list="store.getters.newList" :view="3" :delay="2500" :version="'top'"
            v-if="store.getters.newList.length !== 0" />
        <LoaderComponet v-else class="!h-96" />
        <div class="flex flex-row gap-3  mb-14">
            <div class="h-60 w-1/2">
                <h1 class="my-3 text-xl font-bold">
                    Nastepny sezon
                </h1>
                <SwiperList :list="store.getters.nextList" :view="5" :delay="2500" :version="'mid'"
                    v-if="store.getters.nextList.length !== 0" />
                <LoaderComponet v-else class="!h-full" />
            </div>
            <div class=" w-full">
                <h1 class=" text-right text-xl font-bold my-3">
                    Gatunki
                </h1>
                <div class="flex flex-row-reverse flex-wrap gap-1  " v-if="store.getters.nextList.length !== 0">
                    <GenreItem v-for="(item, index) in store.getters.genres" :key="index" :item="item" :typ="false"
                        class="!bg-slate-950" />
                </div>
                <LoaderComponet v-else class="!h-full " />
            </div>
        </div>
        <div class="h-60 mb-14 ">
            <h1 class="my-3 text-xl font-bold">
                Nowe odcinki
            </h1>
            <SwiperList :list="last" :view="9" :delay="2000" :version="'mid'" v-if="last" />
            <LoaderComponet v-else class="!h-1/2 mt-24" />
        </div>
        <div class="h-60 ">
            <h1 class="my-3 text-xl font-bold">
                Nieemitowane odcinki
            </h1>
            <SwiperList :list="lastNot" :view="9" :delay="2000" :version="'mid'" v-if="lastNot" />
            <LoaderComponet v-else class="!h-1/2 mt-24" />
        </div>
    </div>
</template>


<script setup>
import LoaderComponet from '@/components/LoaderComponet.vue';
import SwiperList from '@/components/SwiperList.vue';
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


<style>
.swiper-pagination-bullet {
    background-color: rgb(255, 255, 255) !important;
    opacity: .5 !important;
}


.swiper-pagination-bullet-active {
    background-color: rgb(234, 179, 8) !important;
    opacity: 1 !important;
}
</style>