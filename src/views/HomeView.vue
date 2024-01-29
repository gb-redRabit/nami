<template>
    <div class="flex flex-col m-16 ">
        <h1 class="my-3 text-xl font-bold">
            Obecny sezon
        </h1>
        <div class="h-72">
            <Swiper class="w-full h-full" :slidesPerView="3" :loop="true" :spaceBetween="40" :freeMode="true" :pagination="{
                clickable: true,
            }">
                <SwiperSlide v-for="(item, index) in store.getters.newList" :key="index"
                    class="group relative rounded-md overflow-hidden">
                    <RouterLink :to="{ path: `/list/${item.slug}` }">
                        <img :src="item.cover" alt="cover" class="w-full bg-cover bg-center absolute ">
                        <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-50 "></div>
                        <div class="absolute top-2 p-2 flex gap-2">
                            <div v-for="(item, index) in item.genres" :key="index" class="bg-gray-900 p-2 rounded-md  ">
                                {{ item }}
                            </div>
                        </div>
                        <h2 class="absolute bottom-2 p-2 font-bold group-hover:text-red-700">{{ item.title }}</h2>
                    </RouterLink>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="flex flex-row gap-3 justify-between">

            <div class="h-60 w-1/2">
                <h1 class="my-3 text-xl font-bold">
                    Nastepny sezon
                </h1>
                <Swiper class="w-full h-full" :slidesPerView="4" :loop="true" :spaceBetween="10" :freeMode="true"
                    :pagination="{
                        clickable: true,
                    }">
                    <SwiperSlide v-for="(item, index) in store.getters.nextList" :key="index"
                        class="group relative rounded-md overflow-hidden ">
                        <RouterLink :to="{ path: `/list/${item.slug}` }">
                            <img :src="item.cover" alt="cover" class="w-full h-full bg-cover bg-center absolute ">
                            <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 "></div>
                            <h2 class="absolute bottom-2 p-2 font-medium group-hover:text-red-700">{{ `${item.title.slice(0,
                                19)}...`
                            }}</h2>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div class="">
                <h1 class=" text-right text-xl font-bold my-3">
                    Gatunki
                </h1>
                <div class="flex flex-row-reverse flex-wrap gap-1  ">
                    <GenreItem v-for="(item, index) in store.getters.genres" :key="index" :item="item" :typ="false"
                        class="!bg-slate-950" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';




// import required modules


export default {
    components: {
        Swiper,
        SwiperSlide,
    },

};
</script>
<script setup>

import { useStore } from 'vuex'
import GenreItem from '@/components/GenreItem.vue';

const store = useStore();

store.dispatch(`celeanGenres`)
console.log(store.getters.newList)
</script>

<style>
.swiper-pagination {
    height: 30px;
    width: 30px;
    background-color: red;
}
</style>