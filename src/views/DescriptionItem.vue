<template>
    <div class="flex flex-col  items-center justify-start z-10 relative h-screen w-full" v-if="item">
        <div
            class="absolute top-0 right-0 left-0 h-3/5 z-[-1]  blur-[3px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(17,24,39,1)]">
            <img :src="item.cover" alt="cover" class='h-full w-full object-cover '>
        </div>
        <div class="flex flex-row gap-10 mt-52 w-11/12 ">
            <img :src="item.cover" alt="cover" class='w-52 rounded-md' />
            <div class=" flex flex-col w-2/4 gap-2 -mt-10">
                <div class="flex gap-3">
                    <GenreItem v-for="(item, index) in  item.genres" :key="index" :item="item" :typ="false" />
                </div>
                <h1 class="font-bold text-2xl">{{ item.title }}</h1>
                <h2 class="font-medium text-md">{{ item.title_en }}</h2>
                <p class="mt-10">{{
                    item.description }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        ładowanie
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GenreItem from '@/components/GenreItem.vue';
import https from 'https'

const item = ref(null)

const props = defineProps({
    id: {
        type: String,
    },
})


onMounted(async () => {
    https.get(`https://api.docchi.pl/v1/series/find/${props.id}`, (resp) => {
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
