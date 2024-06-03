<template>
    <div v-if="episodes" class="mt-10 flex flex-wrap justify-center gap-2">
        <RouterLink v-if="toogleBar" :to="{ path: `/list/${anime.slug}/${episode.anime_episode_number}` }"
            class="flex flex-col w-60  bg-gray-600 rounded-lg" v-for="(episode, index) in episodes" :key="index">
            <div class=" w-full h-32 rounded-t-lg">
                <img :src="episode.bg" v-if="episode.bg" alt="img" class=" w-full h-full rounded-t-lg">
                <div class="flex justify-center items-center bg-slate-400 w-full h-full rounded-t-lg" v-else>
                    <BsImageFill class="text-2xl  " />
                </div>
            </div>
            <div class="flex flex-col gap-1 p-2">
                <p><span class=" font-medium">Odcinek</span> {{ episode.anime_episode_number }}</p>
                <p>{{ new Date(episode.created_at).toISOString().slice(0, 10) }}</p>
            </div>
        </RouterLink>
        <RouterLink v-if="toogleMenu" :to="{ path: `/list/${anime.slug}/${episode.anime_episode_number}` }"
            class=" flex w-48  bg-gray-600 rounded-lg" v-for="(episode, index) in episodes" :key="index">
            <div class="w-16 h-10 rounded-l-lg">
                <img :src="episode.bg" v-if="episode.bg" alt="img" class=" w-full h-full rounded-l-lg">
                <div class="flex  justify-center items-center bg-slate-400 w-full h-full rounded-l-lg" v-else>
                    <BsImageFill class="text-2xl  " />
                </div>
            </div>
            <div class="flex flex-row  gap-1 p-2">
                <p><span class=" font-medium">Odcinek</span> {{ episode.anime_episode_number }}</p>
            </div>
        </RouterLink>
        <RouterLink v-if="toogleList" :to="{ path: `/list/${anime.slug}/${episode.anime_episode_number}` }"
            class=" w-3/4 p-2 bg-gray-600 rounded-lg flex justify-between" v-for="(episode, index) in episodes"
            :key="index">
            <p><span class=" font-medium">Odcinek</span> {{ episode.anime_episode_number }}</p>
            <p> <span class=" font-medium">Dodany</span> {{ new Date(episode.created_at).toISOString().slice(0, 10) }}
            </p>
        </RouterLink>
        <!-- dodać czas pojawiania się nastepnego odcinka -->
        <div v-if="episodes.length !== anime.episodes && toogleBar && nextEpisode(episodes[episodes.length - 1].created_at) >= 0"
            class="flex flex-col w-60  bg-gray-600 rounded-lg">
            <div class=" w-full h-32 rounded-t-lg">
                <div class="flex justify-center items-center bg-slate-400 w-full h-full rounded-t-lg">
                    <BsImageFill class="text-2xl  " />
                </div>
            </div>
            <div class="flex flex-col gap-1 p-2">
                <p class=" font-medium">Kolejny odcinek</p>
                <p v-if="nextEpisode(episodes[episodes.length - 1].created_at) !== 0"> za {{
                    nextEpisode(episodes[episodes.length - 1].created_at) }} dni</p>
                <p v-else> Pojawi się dziś </p>
            </div>
        </div>
        <div v-if="episodes.length !== anime.episodes && toogleMenu && nextEpisode(episodes[episodes.length - 1].created_at) >= 0"
            class=" flex w-48  bg-gray-600 rounded-lg">
            <div class="w-16 h-10 rounded-l-lg">
                <div class="flex  justify-center items-center bg-slate-400 w-full h-full rounded-l-lg">
                    <BsImageFill class="text-2xl  " />
                </div>
            </div>
            <div class="flex flex-row  gap-1 p-2">
                <p class=" font-medium">
                    <span v-if="nextEpisode(episodes[episodes.length - 1].created_at) !== 0"> za {{
                        nextEpisode(episodes[episodes.length - 1].created_at) }} dni</span>
                    <span v-else> Pojawi się dziś </span>
                </p>
            </div>
        </div>
        <div v-if="episodes.length !== anime.episodes && toogleList && nextEpisode(episodes[episodes.length - 1].created_at) >= 0"
            class=" w-3/4 p-2 bg-gray-600 rounded-lg flex justify-between">
            <p class=" font-medium">Kolejny odcinek</p>
            <p v-if="nextEpisode(episodes[episodes.length - 1].created_at) !== 0"> za {{
                nextEpisode(episodes[episodes.length - 1].created_at) }} dni</p>
            <p v-else> Pojawi się dziś </p>
        </div>
    </div>
</template>

<script setup>
import { BsImageFill } from "@kalimahapps/vue-icons";
defineProps({
    episodes: { type: Object, },
    anime: { type: Object, },
    toogleList: { type: Boolean, },
    toogleMenu: { type: Boolean, },
    toogleBar: { type: Boolean, },
})

const nextEpisode = (date) => {
    let result = new Date(date)
    result.setDate(result.getDate() + 7);
    return Math.floor((result.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
}
</script>