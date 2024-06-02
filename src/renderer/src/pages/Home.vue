<template>
    <div class="p-2 flex flex-col  w-[calc(100%-10px)]  ">
        <h1 class="flex gap-2 items-center justify-center text-4xl ">
            <IconSeason :season="date().season" />
            <span>{{ date(false, 'pl').season }}</span>
            <span> {{ date(false, 'pl').yers }}</span>
        </h1>
        <Carousel ref="myCarousel" :itemsToShow="5" snapAlign="start" :autoplay="1000" :wrapAround="true"
            @slide-start="currentSlide = myCarousel.data.currentSlide._value" :transition="1000">
            <Slide v-for="(item, index) in store.getters.listTop" :key="index">
                <RouterLink
                    :to="item.episodes > 1 || item.episodes == null ? { path: `/list/${item.slug}` } : { path: `/list/${item.slug}/1` }"
                    class=" group h-64 w-44 relative rounded-xl " :key="item.mal_id">
                    <div class=" transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0
                after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t
                after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)]
                group-hover:after:to-[rgba(0,0,0,0.5)] ">
                        <img :src="item.images.jpg.large_image_url"
                            class="absolute w-full h-full rounded-xl group-hover:blur-[1px]" alt="cover">
                        <div
                            class="absolute z-10 top-1 right-1 bg-yellow-500 size-6 flex justify-center items-center rounded-full">
                            {{ index + 1 }}</div>
                    </div>
                    <div class="absolute bottom-0 w-full p-2">
                        <h1 class="text-gray-100 group-hover:text-white">{{ item.title.length <= 20 ? item.title :
                            `${item.title.slice(0, 19)}...` }}</h1>
                    </div>
                </RouterLink>
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>


        <div class="flex flex-wrap gap-2 justify-center items-center w-full mt-10">
            <h2 class=" text-black text-xl font-medium">Najpopularniejsze emitowane w miesiąca</h2>
            <div class="flex flex-wrap gap-2 justify-center items-center">
                {{ currentSlide }}
            </div>
        </div>
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import date from '../helpers/date'
import IconSeason from '../components/IconSeason.vue'
import { useStore } from 'vuex'
import { ref } from 'vue';
const store = useStore();
const myCarousel = ref(null)
const currentSlide = ref(0)
const ipcHandle = () => window.getApi()

const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
}
const slug = (value) => {
    let text = value.title.toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', "-")
    if (!isNumeric(text[text.length - 1])) {
        return text += `-${value.mal_id}`
    }
    else { return text }
}

</script>
<style>
:root {
    --vc-pgn-background-color: red;
    --vc-pgn-active-color: green;
    --vc-pgn-border-radius: 50%;
    --vc-pgn-width: 10px;
    --vc-pgn-height: 10px;
    --vc-pgn-margin: 10px;
}
</style>