<template>
    <div class="flex flex-col gap-2 w-1/4">
        <Score :mal="mal" v-if="mal" />
        <img class="w-full h-[520px] rounded-lg" :src="anime.cover ? anime.cover : mal.images.jpg.large_image_url"
            alt="cover" />
        <div class="flex w-full" v-if="mal">
            <button v-if="mal.trailer.embed_url"
                @click="$router.push({ name: `yt`, params: { id: anime.slug, yt: mal.trailer.embed_url } })"
                class="flex justify-center items-center gap-2 w-full bg-slate-700 dark:bg-neutral-900 rounded-lg">
                <BsBoxArrowUpRight />
                <span class="text-lg py-1">Zwiastun</span>
            </button>
        </div>
        <h2 class="font-medium py-2">Informacje</h2>
        <div class="flex flex-col bg-slate-700 dark:bg-neutral-900 rounded-lg gap-2 p-2">
            <p v-if="mal" class="flex flex-col">
                <span class="font-medium">Status</span>
                <span v-if="mal.airing" class="font-extralight">{{ mal.airing ? 'Wychodzi' : 'Zakończony' }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="anime" class="flex flex-col">
                <span class="font-medium">Sezon</span>
                <span v-if="anime.season" class="flex items-center gap-2 font-extralight">
                    <IconSeason :season="anime.season" />
                    {{ traslate(anime.season) }} {{ anime.season_year }}
                </span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="mal" class="flex flex-col">
                <span class="font-medium">Ilość Ocen</span>
                <span v-if="mal.scored_by" class="font-extralight">{{ mal.scored_by }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="anime" class="flex flex-col">
                <span class="font-medium">Rodzaj</span>
                <span v-if="anime.series_type" class="font-extralight">{{ anime.series_type }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="anime" class="flex flex-col">
                <span class="font-medium">Odcinki</span>
                <span v-if="anime.episodes" class="font-extralight">{{ anime.episodes }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="mal" class="flex flex-col">
                <span class="font-medium">MPAA</span>
                <span v-if="mal.rating" class="font-extralight">{{ mal.rating }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>

            <p v-if="mal" class="flex flex-col">
                <span class="font-medium">Studio</span>
                <span v-if="mal.studios.length > 0" class="font-extralight">{{ mal.studios[0].name }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="anime" class="flex flex-col">
                <span class="font-medium">Początek Emisji</span>
                <span v-if="anime.aired_from" class="font-extralight">{{
                    new Date(anime.aired_from).toISOString().slice(0, 10)
                }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
            <p v-if="mal" class="flex flex-col">
                <span class="font-medium">Długość odcinków</span>
                <span v-if="mal.duration" class="font-extralight">{{ mal.duration }}</span>
                <span v-else class="font-extralight"> Brak Informacji </span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { BsBoxArrowUpRight } from '@kalimahapps/vue-icons'

import traslate from '../../helpers/traslate'
import Score from './Score.vue'
import IconSeason from '../IconSeason.vue'

defineProps({
    mal: Object,
    anime: Object,
})
</script>
