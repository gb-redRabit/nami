<template>
    <Carousel class="w-11/12" ref="myCarousel" :itemsToShow="itemsShow" snapAlign="start" :autoplay="autoplay"
        :wrapAround="true" @slide-start="console.log(myCarousel.data.currentSlide._value)" :transition="1000">
        <Slide v-for="(item, index) in data" :key="index">
            <Card :key="index" :item="item" :set="data.length" :index="index" :numbering="numbering" :carusel="true"
                :itemsShow="itemsShow" />
        </Slide>
        <template #addons>
            <Pagination v-if="p" />
            <Navigation v-if="n" />
        </template>
    </Carousel>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import Card from './Card.vue'
import 'vue3-carousel/dist/carousel.css'


import { ref, onMounted } from 'vue'

const myCarousel = ref(null)

const { data } = defineProps({
    data: Array,
    p: Boolean,
    n: Boolean,
    numbering: Boolean,
    itemsShow: Number,
    autoplay: Number,
})
onMounted(() => {
    data.length = 10
})
</script>

<style>
:root {
    --vc-pgn-background-color: red;
    --vc-pgn-active-color: green;
    --vc-pgn-border-radius: 50%;
    --vc-pgn-width: 10px;
    --vc-pgn-height: 10px;
    --vc-pgn-margin: 10px;
    --vc-nav-width: 30px;
    --vc-nav-height: 30px;
    --vc-nav-color: green;
    --vc-nav-color-hover: blue;
}

.carousel__prev {
    @apply -ml-10;
}

.carousel__next {
    @apply -mr-10;
}
</style>
