<template>
    <Carousel class=" w-11/12" ref="myCarousel" :itemsToShow="itemsShow" snapAlign="start" :autoplay="autoplay"
        :wrapAround="true" @slide-start="console.log(myCarousel.data.currentSlide._value)" :transition="1000">
        <Slide v-for="(item, index) in data" :key="index">
            <RouterLink
                :to="item.episodes > 1 || item.episodes == null ? { path: `/list/${item.slug}` } : { path: `/list/${item.slug}/1` }"
                class=" group h-[370px] w-[250px] relative rounded-lg bg-red-400" :key="item.mal_id"
                :class="{ 'h-[200px] w-[150px]': itemsShow >= 9, 'h-[310px] w-[200px]': itemsShow > 7 && itemsShow < 9 }">
                <img :src="item.images ? item.images.jpg.large_image_url : item.cover"
                    class="h-full w-full absolute  group-hover:blur-[1px] rounded-lg" alt="cover">
                <div
                    class=" rounded-lg absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 group-hover:opacity-40">
                </div>
                <div v-if="numbering"
                    class="absolute z-10 top-1 right-1 bg-neutral-200 size-8 flex justify-center items-center rounded-full text-md">
                    <McCupcakeFill class=" text-yellow-400" v-if="index === 0" />
                    <span v-else>#</span>{{ index + 1 }}
                </div>
                <div class="absolute bottom-0 w-full p-2">
                    <h1 class="text-gray-100 group-hover:text-white">{{ item.title.length <= 20 ? item.title :
                        `${item.title.slice(0, 19)}...` }}</h1>
                </div>
            </RouterLink>
        </Slide>
        <template #addons>
            <Pagination v-if="p" />
            <Navigation v-if="n" />
        </template>
    </Carousel>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import { McCupcakeFill } from "@kalimahapps/vue-icons";

import { ref } from 'vue';

const myCarousel = ref(null)

defineProps({
    data: { type: Array, },
    p: { type: Boolean, },
    n: { type: Boolean, },
    numbering: { type: Boolean, },
    itemsShow: { type: Number },
    autoplay: { type: Number },
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
    @apply -ml-10
}

.carousel__next {
    @apply -mr-10
}
</style>