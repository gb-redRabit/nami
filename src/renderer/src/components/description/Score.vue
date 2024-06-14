<template>
    <div class="flex items-center justify-between p-2 bg-slate-700 rounded-lg" v-if="score[0] > 0">
        <div class="flex">
            <div v-for="i in score[0]">
                <CaStarFilled />
            </div>
            <CaStarHalf v-if="score[1]" />
        </div>
        Ocena: {{ mal.score }}
    </div>
</template>

<script setup>
import { CaStarHalf, CaStarFilled } from '@kalimahapps/vue-icons'

import { onMounted, ref } from 'vue'


const { mal } = defineProps({
    mal: Object,
})

const score = ref([Math.floor(mal.score), mal.score - Math.floor(mal.score) > 0.5])

onMounted(() => {
    // if (mal) {
    //     score.value.push(Math.floor(mal.score))
    //     score.value.push(mal.score - Math.floor(mal.score) > 0.5)
    // }
})
</script>
