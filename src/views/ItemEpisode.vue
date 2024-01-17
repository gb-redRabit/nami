<template>
    <div class="flex flex-col gap-3 items-center justify-start z-10 relative min-h-full w-full" v-if="item">
        <div
            class="absolute top-0 right-0 left-0 h-4/5 z-[-1]  blur-[3px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(17,24,39,1)]">
            <img :src="item[select].bg" alt="cover" class='h-full w-full object-cover '>
        </div>
        <div class="mt-16">
            <RouterLink :disabled="episode == 1"
                :to="{ name: `ItemEpisode`, params: { id: id, episode: Number(episode) - 1 }, query: { episodes: $route.query.episodes } }">
                poprzedni
            </RouterLink>
            <RouterLink :to="{ name: `listItem`, params: { id: id } }">
                lista
            </RouterLink>
            <RouterLink
                :to="{ name: `ItemEpisode`, params: { id: id, episode: Number(episode) + 1 }, query: { episodes: $route.query.episodes } }">
                nastepny
            </RouterLink>
        </div>
        <iframe :src="player(select)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
            allow="clipboard-write" title="player" className="z-10 min-w-[1000px] h-[600px] m-2" />
        <div class=" flex gap-4">
            <button class="bg-slate-950 p-2 rounded-md" :class="{ 'text-red-600': select === index }"
                v-for="(value, index) in item" :key="index" @click="select = index;">{{
                    value.player_hosting }} - {{
        value.translator_title }}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import https from 'https'
const select = ref(0)

const props = defineProps({
    id: {
        type: String,
    },
    episode: {
        type: String,
    }
})
const item = ref(null)

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
            console.log(item.value)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

})
</script>

