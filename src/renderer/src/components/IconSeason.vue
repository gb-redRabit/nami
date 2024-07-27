<template>
  <component :is="iconComponent" :class="iconClass" v-if="season" />
</template>

<script setup>
import { computed } from 'vue';
import {
  FlFilledLeafTwo,
  FaRegSnowflake,
  AnFilledSun,
  FlFilledUmbrella
} from '@kalimahapps/vue-icons'

const props = defineProps({
  season: String,
})

const seasonIcons = {
  spring: FlFilledLeafTwo,
  winter: FaRegSnowflake,
  summer: AnFilledSun,
  fall: FlFilledUmbrella
}

const seasonClasses = {
  spring: 'text-green-700',
  summer: 'text-yellow-400',
  fall: 'text-amber-950'
}

const iconComponent = computed(() => seasonIcons[props.season])
const iconClass = computed(() => seasonClasses[props.season] || '')
</script>
