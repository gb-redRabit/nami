<template>
    <div class="flex flex-col gap-2 w-1/4 ">
        <Score :mal="mal" />
        <img class=" w-full h-[520px] rounded-lg" :src="anime.cover" alt="cover">
        <div class="flex w-full" v-if="mal.trailer.embed_url">
            <button @click="$router.push({ name: `aaaa`, params: { id: anime.slug, yt: mal.trailer.embed_url } })"
                class="flex justify-center items-center gap-2 w-full bg-slate-700 rounded-lg">
                <BsBoxArrowUpRight />
                <span class="text-lg py-1">Zwiastun</span>
            </button>
        </div>
        <h2 class="font-medium py-2">Informacje</h2>
        <div class="flex flex-col bg-slate-700 rounded-lg gap-2 p-2">
            <p class="flex flex-col"><span class="font-medium">Status</span><span class="font-extralight">{{
                mal.airing ? 'Wychodzi' : 'Zakończony' }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Sezon</span><span
                    class="flex items-center gap-2 font-extralight">
                    <IconSeason :season="anime.season" />
                    {{ traslate(anime.season) }} {{
                        anime.season_year
                    }}
                </span>
            </p>
            <p class="flex flex-col"><span class="font-medium">Ilość Ocen</span><span class="font-extralight">{{
                mal.scored_by }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Rodzaj</span><span class="font-extralight">{{
                anime.series_type }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Odcinki</span><span class="font-extralight">{{
                anime.episodes }}</span></p>
            <p class="flex flex-col"><span class="font-medium">MPAA</span><span class="font-extralight">{{
                mal.rating }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Studio</span><span class="font-extralight">{{
                mal.studios[0].name }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Początek Emisji</span><span class="font-extralight">{{
                new Date(anime.aired_from).toISOString().slice(0, 10) }}</span></p>
            <p class="flex flex-col"><span class="font-medium">Długość odcinków</span><span class="font-extralight">{{
                mal.duration }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { BsBoxArrowUpRight } from "@kalimahapps/vue-icons";

import traslate from "../../helpers/traslate"
import Score from './Score.vue';
import IconSeason from '../IconSeason.vue'

const props = defineProps({
    mal: { type: Object, },
    anime: { type: Object, },
})

</script>