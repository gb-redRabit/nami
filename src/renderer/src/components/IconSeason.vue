<template>
    <template v-if="season">
        <FlFilledLeafTwo class=" text-green-700" v-if="season == `spring`" />
        <FaRegSnowflake v-if="season == `winter`" />
        <AnFilledSun class=" text-yellow-400" v-if="season == `summer`" />
        <FlFilledUmbrella class=" text-amber-950" v-if="season == `fall`" />
    </template>
</template>

<script setup>
import { FlFilledLeafTwo } from "@kalimahapps/vue-icons";
import { FaRegSnowflake } from "@kalimahapps/vue-icons";
import { AnFilledSun } from "@kalimahapps/vue-icons";
import { FlFilledUmbrella } from "@kalimahapps/vue-icons";


const props = defineProps({
    season: { type: String, },
})
</script>