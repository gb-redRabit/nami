<template>
  <template v-if="season">
    <FlFilledLeafTwo class="text-green-700" v-if="season == `spring`" />
    <FaRegSnowflake v-if="season == `winter`" />
    <AnFilledSun class="text-yellow-400" v-if="season == `summer`" />
    <FlFilledUmbrella class="text-amber-950" v-if="season == `fall`" />
  </template>
</template>

<script setup>
import {
  FlFilledLeafTwo,
  FaRegSnowflake,
  AnFilledSun,
  FlFilledUmbrella
} from '@kalimahapps/vue-icons'

const props = defineProps({
  season: String,
})
</script>
