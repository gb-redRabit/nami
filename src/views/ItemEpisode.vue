<template>
    <div v-if="item">
        <RouterLink :disabled="episode == 1"
            :to="{ name: `ItemEpisode`, params: { id: id, episode: Number(episode) - 1 }, query: { episodes: $route.query.episodes } }">
            poprzedni
        </RouterLink>
        <RouterLink
            :to="{ name: `ItemEpisode`, params: { id: id, episode: Number(episode) + 1 }, query: { episodes: $route.query.episodes } }"
            :disabled="episode == $route.query.episodes">
            nastepny
        </RouterLink>
        <iframe :src="player(select)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
            allow="clipboard-write" title="player" className="z-10 w-80 h-80 " />
        <div class=" flex gap-4">
            <button v-for="(value, index) in item" :key="index" @click="select = index;">{{ value.player_hosting }}</button>
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
    console.log(src)
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

