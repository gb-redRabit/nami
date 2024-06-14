<template>
    <Carousel v-if="top" class="w-11/12" ref="myCarousel" :itemsToShow="itemsShow" snapAlign="start"
        :autoplay="autoplay" :wrapAround="true" @slide-start="console.log(myCarousel.data.currentSlide._value)"
        :transition="1000">
        <Slide v-for="(item, index) in data" :key="index">

            <div class="h-96 w-[560px] relative rounded-xl text-gray-100 overflow-hidden">
                <div
                    class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-lg after:h-full after:content-[''] after:bg-black after:opacity-60">
                    <img :src="item.images.jpg.large_image_url" class="w-full absolute object-cover rounded-lg "
                        alt="cover" />

                </div>
                <div v-if="numbering"
                    class="absolute z-10 top-1 right-1 bg-amber-300 size-9 flex justify-center items-center rounded-full font-medium">
                    <McCupcakeFill class=" text-neutral-200 text-2xl" v-if="index === 0" />
                    <span v-else>#</span>{{ index + 1 }}
                </div>
                <div class="absolute top-0  text-left w-full flex flex-col justify-start items-start gap-2 p-4  ">
                    <div class="text-2xl font-medium">{{ item.title.length <= 40 ? item.title : `${item.title.slice(0,
                        40)}...` }}</div>
                            <div class="flex justify-center items-center ">
                                <div class="text-amber-300 font-medium">{{ item.type }}</div>
                                <BsDot class=" text-xl" />
                                <div>Odcinki
                                    <span v-if="item.episodes">{{ item.episodes
                                        }}</span>
                                    <span v-else>??</span>
                                </div>
                                <BsDot class=" text-xl" />
                                <div>{{ item.duration.slice(0, 6) }}</div>
                            </div>
                            <div> {{ item.synopsis.length <= 120 ? item.synopsis : `${item.synopsis.slice(0, 120)}...`
                                    }}</div>
                            </div>
                            <div class=" flex gap-2 absolute bottom-1 left-1 py-1 px-2 ">
                                <button @click="$router.push({ path: `/list/${item.slug}/1` })"
                                    class="flex justify-center items-center py-1 px-2 rounded-lg  bg-amber-300  hover:bg-amber-600 ">
                                    <BxPlay class="text-2xl" /> Oglądaj
                                </button> <button @click="$router.push({ path: `/list/${item.slug}` })"
                                    class=" flex gap-2 justify-center items-center  py-1 px-2 rounded-lg text-amber-300   border-amber-300  border-4 border-solid hover:border-amber-600 hover:text-amber-600">
                                    <BxSolidBookBookmark /> Wiecej
                                </button>

                            </div>
                    </div>
        </Slide>
        <template #addons>
            <Pagination v-if="p" />
            <Navigation v-if="n" />
        </template>
    </Carousel>
    <Carousel v-else class="w-full" ref="myCarousel" :itemsToShow="itemsShow" snapAlign="start" :autoplay="autoplay"
        :wrapAround="true" @slide-start="console.log(myCarousel.data.currentSlide._value)" :transition="1000">
        <Slide v-for="(item, index) in data" :key="index">
            <RouterLink :to="{ path: `/list/${item.anime_id}/${item.anime_episode_number}` }"
                class=" h-56 w-40 relative rounded-xl text-gray-100">
                <div
                    class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-black after:opacity-45">
                    <img :src="item.cover" class="absolute w-full h-full rounded-xl" alt="cover" />
                </div>
                <div class="absolute top-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                    Odcinek <span class=" text-amber-300 font-medium">{{ item.anime_episode_number }}</span>
                </div>
                <div class="absolute bottom-0 w-full p-2 text-left text-gray-100 group-hover:text-white">
                    {{ `${item.title.slice(0, 19)}...` }}
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
import { MiComet, McCupcakeFill, BxPlay, BxSolidBookBookmark, BsDot } from '@kalimahapps/vue-icons'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

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
    top: Boolean
})
onMounted(() => {

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
    @apply size-10 border-neutral-200 border-8 border-solid bg-amber-300 rounded-full text-black hover:text-white hover:bg-amber-500 -ml-7;
}

.carousel__next {
    @apply size-10 border-neutral-200 border-8 border-solid bg-amber-300 rounded-full text-black hover:text-white hover:bg-amber-500 -mr-7;
}
</style>
