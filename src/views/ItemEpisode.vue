<template>
    <div class="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex  justify-center items-center">
        <div class="absolute w-full h-full bg-black bg-opacity-30"
            @click="$router.push({ name: `listItem`, params: { id: id } })">
        </div>
        <div class=" bg-black bg-opacity-70 w-3/4 h-3/4 flex flex-col justify-center items-center z-10" v-if="item">
            <div class="mt-16 flex gap-2">
                <button :disabled="episode == 1" class="bg-slate-950 p-2 rounded-md cursor-pointer hover:text-red-600 flex"
                    :class="{ '!bg-slate-800 !cursor-auto hover:text-white': episode == 1 }"
                    @click="$router.push({ name: `episode`, params: { id: id, episode: Number(episode) - 1 } })">
                    <ChevronLeftIcon class="size-6" /><span>Poprzednie</span>
                </button>
                <button class="bg-slate-950 p-2 rounded-md cursor-pointer hover:text-red-600 flex"
                    @click="$router.push({ name: `listItem`, params: { id: id } })">
                    <Bars4Icon class="size-6" /><span>Lista</span>
                </button>
                <button :disabled="description.episodes == episode"
                    class="bg-slate-950 p-2 rounded-md cursor-pointer hover:text-red-600 flex" :class="{
                        '!bg-slate-800 !cursor-auto hover:text-white': description.episodes == episode
                    }" @click="$router.push({ name: `episode`, params: { id: id, episode: Number(episode) + 1 } })">
                    <span>Nastepne</span>
                    <ChevronRightIcon class="size-6" />
                </button>
            </div>
            <iframe :src="player(select)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                allow="clipboard-write" title="player" className="z-10 min-w-[1000px] h-[600px] m-2" />
            <div class=" flex gap-4">
                <button class="bg-slate-950 p-2 rounded-md" :class="{ 'text-red-600': select === index }"
                    v-for="( value, index ) in  item " :key="index" @click="select = index;">{{
                        value.player_hosting }} - {{
        value.translator_title }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import https from 'https'

import { ChevronLeftIcon, ChevronRightIcon, Bars4Icon } from '@heroicons/vue/24/solid'


const select = ref(0)

const props = defineProps({
    id: {
        type: String,
    },
    episode: {
        type: String,
    },

})
const item = ref(null);
const description = ref('');

const player = (number) => {
    let src;
    if (item.value[number].player_hosting.toUpperCase() === "CDA") {
        const lastIndex = item.value[number].player.lastIndexOf("/");
        const lenghtPlayer = item.value[number].player.length;
        src = `https://ebd.cda.pl/620x368/${item.value[number].player.slice(
            lastIndex + 1,
            lenghtPlayer
        )}`;
    } else {
        src = item.value[number].player;
    }


    return src
}

onMounted(async () => {

    https.get(`https://api.docchi.pl/v1/episodes/find/${props.id}/${props.episode}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            item.value = JSON.parse(data)

            https.get(`https://api.docchi.pl/v1/series/find/${item.value[0].anime_id}`, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    description.value = JSON.parse(data)
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    (function () {
        'use strict';
        let loopCount = 0,
            searchAds = setInterval(() => {
                loopCount++;
                let videoAd = document.querySelector("video.pb-ad-video-player") || document.querySelector("video.pb-block-video-player");
                if (loopCount === 30) clearInterval(searchAds);
                if (videoAd) {
                    videoAd.style.dispaly = "none";
                    videoAd.currentTime = videoAd.duration + 1;
                    console.log("ad skipped")
                    clearInterval(searchAds);
                }
            }, 100);
    })();
})



</script>

