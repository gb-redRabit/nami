<template>
    <div class="flex items-center justify-between  p-2 bg-slate-700 rounded-lg" v-if="mal.score">
        <div class="flex ">
            <div v-for="(index, i) in score[0]">
                <CaStarFilled />
            </div>
            <CaStarHalf v-if="score[1]" />
        </div>
        Ocena: {{ mal.score }}
    </div>
</template>

<script setup>
import { CaStarHalf, CaStarFilled } from "@kalimahapps/vue-icons";

import { onMounted, ref } from 'vue';

const score = ref([]);

const props = defineProps({
    mal: { type: Object, },
})

onMounted(() => {
    score.value.push(Math.floor(props.mal.score))
    score.value.push((props.mal.score - Math.floor(props.mal.score)) > 0.5)
})
</script>