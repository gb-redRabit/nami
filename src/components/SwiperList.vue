<template>
    <Swiper class="!h-96 w-full" :modules="[Pagination, Autoplay]" :autoplay="{
        delay: delay,
        disableOnInteraction: false,
    }" :pagination="{ dynamicBullets: true }" :slidesPerView="view" :spaceBetween="30" v-if="version === 'top'">
        <SwiperSlide v-for="(item, index) in list" :key="index" class="group relative rounded-md !h-[93%]">
            <RouterLink :to="{ path: `/list/${item.slug}` }">
                <img :src="item.cover" alt="cover" class="h-full w-full absolute object-cover ">
                <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-50 "></div>
                <div class="absolute top-2 p-2 flex gap-2">
                    <div v-for="(item, index) in item.genres" :key="index" class="bg-gray-900 p-2 rounded-md  ">
                        {{ item }}
                    </div>
                </div>
                <div class="absolute top-14 p-2 flex">{{ item.series_type }} | {{ item.episodes }}</div>
                <h2 class="absolute bottom-2 p-2 font-bold group-hover:text-red-700">{{ item.title }}</h2>
            </RouterLink>
        </SwiperSlide>
    </Swiper>

    <Swiper class="w-full h-full" :modules="[Navigation, Autoplay]" :autoplay="{
        delay: delay,
        disableOnInteraction: false,
    }" :slidesPerView="view" :navigation="true" :spaceBetween="20" v-if="version === 'mid'">
        <SwiperSlide v-for="(item, index) in list" :key="index" class="group relative rounded-md overflow-hidden ">
            <RouterLink
                :to="{ path: item.anime_episode_number ? `/list/${item.anime_id}/${item.anime_episode_number}` : `/list/${item.slug}` }"
                class="h-full w-full flex flex-col justify-end">
                <img :src="item.cover" alt="cover" class="w-full h-full bg-cover bg-center absolute -z-10">
                <div class="absolute top-0 left-0 h-full w-full bg-slate-900 opacity-30 "></div>
                <h2 class="px-2 font-medium group-hover:text-red-700 z-10">{{ `${item.title.slice(0,
                    19)}...`
                }}</h2>
                <h2 class="pl-2 pb-2 font-medium group-hover:text-red-700 z-10" v-if="item.anime_episode_number">Odcinek {{
                    item.anime_episode_number }}</h2>
            </RouterLink>
        </SwiperSlide>
    </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const props = defineProps({
    list: {
        type: Array,
    },
    view: {
        type: Number
    },
    delay: {
        type: Number
    },
    version: {
        type: String
    }
})
console.log(props.list)
</script>

<style >
.swiper-pagination-bullet {
    background-color: rgb(255, 255, 255) !important;
    opacity: .5 !important;
}


.swiper-pagination-bullet-active {
    background-color: rgb(234, 179, 8) !important;
    opacity: 1 !important;
}

.swiper-button-prev,
.swiper-button-next {
    height: 30px !important;
    width: 30px !important;
    border-radius: 50% !important;
    background-color: #000;
    color: #fff !important;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
    color: rgb(234, 179, 8) !important;
}

.swiper-button-prev::after,
.swiper-button-next::after {
    font-size: 15px !important;
}
</style>