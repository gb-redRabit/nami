<template>
    <div class="flex flex-col gap-1 mt-10 " v-if="related.length > 0">
        <h2>Powiązane serie</h2>
        <div class="flex flex-wrap gap-3">
            <button @click="$router.push({
                name: `anime`, params: {
                    id: item[0].slug
                }
            });" v-for="(item, index) in related" :key="index">
                <div class="bg-gray-900 bg-opacity-60 rounded-md overflow-hidden flex  w-80 h-24">
                    <img :src="item[0].cover" alt="cover" class=" max-w-20 min-w-20 h-full">
                    <div class="flex flex-col items-start justify-start w-full">
                        <div class="flex items-center justify-between w-full bg-opacity-10 bg-gray-900 p-1">
                            <h2 class=" text-md font-medium">{{ item[1] }}</h2>
                            <div class="flex gap-2 text-sm">
                                <h2>{{ item[0].series_type }}</h2>
                                <h3>{{ item[0].season_year }}</h3>
                            </div>
                        </div>
                        <p class=" text-left text-sm font-extralight p-1">{{ item[0].title.length <= 70 ? item[0].title
                            : `${item[0].title.slice(0, 19)}...` }}</p>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const related = ref([]);

const { mal } = defineProps({
    mal: { type: Object, },
})

onMounted(() => {
    if (Array.isArray(mal)) {
        mal.forEach((value) => {
            if (value.relation !== "Adaptation" && value.relation !== "Other") {
                if (Array.isArray(value.entry)) {
                    value.entry.forEach((link) => {
                        window.electron.ipcRenderer.send('getApiFour', [`https://api.docchi.pl/v1/series/related/${link.mal_id}`, value.relation]);
                    });
                }
            }
        });
    }
});

window.electron.ipcRenderer.on('sendApiFour', (__, data) => {
    if (data[0] !== undefined) {
        related.value.push(data)
    }
})

</script>