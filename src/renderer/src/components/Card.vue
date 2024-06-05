<template>
    <RouterLink
        :to="item.type !== 'Movie' || item.series_type !== `Movie` ? { path: `/list/${item.slug}` } : { path: `/list/${item.slug}/1` }"
        class="group h-64 w-44 relative rounded-xl"
        :class="{ ' h-96 w-64': carusel, ' h-48 w-32 ': carusel && itemsShow > 7 }" v-if="upActive">
        <div
            class="transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)] group-hover:after:to-[rgba(0,0,0,0.5)]">
            <img :src="preloadImage(item.cover ? item.cover : item.images.jpg.large_image_url
            )" class="absolute w-full h-full rounded-xl group-hover:blur-[1px]" alt="cover" />

        </div>
        <div class="absolute top-1 left-1 bg-red-800 flex justify-center items-center gap-1 py-1 px-2 rounded-xl font-bold text-neutral-200"
            v-if="item.newEpisode">
            <span class="text-[12px]">NEW</span>
            <MiComet />
        </div>
        <div v-if="numbering"
            class="absolute z-10 top-1 right-1 bg-neutral-200 size-8 flex justify-center items-center rounded-full text-md">
            <McCupcakeFill class="text-yellow-400" v-if="index === 0" />
            <span v-else>#</span>{{ index + 1 }}
        </div>
        <!-- dodawanie anime do zbioru obejrzanych -->
        <!-- <div
            class="absolute top-0 right-0 bg-blue-800  flex justify-center items-center size-7 rounded-tr-xl rounded-bl-xl font-bold text-neutral-200">
            <BsPlus class="text-2xl" />
        </div> -->
        <div class="absolute bottom-0 w-full p-2 text-gray-100 group-hover:text-white">
            {{ item.title.length <= 20 ? item.title : `${item.title.slice(0, 19)}...` }} </div>
    </RouterLink>
    <!-- <div v-else class="group h-96 w-[550px] relative rounded-xl">
        <div
            class="transition-all w-full h-full duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)] group-hover:after:to-[rgba(0,0,0,0.5)]">
            <img :src="preloadImage(item.cover ? item.cover : item.images.jpg.large_image_url
            )" class="w-full absolute object-cover rounded-lg group-hover:blur-[1px]" alt="cover" />

        </div>
        <div class="absolute top-1 left-1 bg-red-800 flex justify-center items-center gap-1 py-1 px-2 rounded-xl font-bold text-neutral-200"
            v-if="item.newEpisode">
            <span class="text-[12px]">NEW</span>
            <MiComet />
        </div>
        <div v-if="numbering"
            class="absolute z-10 top-1 right-1 bg-neutral-200 size-8 flex justify-center items-center rounded-full text-md">
            <McCupcakeFill class="text-yellow-400" v-if="index === 0" />
            <span v-else>#</span>{{ index + 1 }}
        </div>
        <div class="absolute top-0  text-left w-full p-4 text-gray-100  group-hover:text-white">
            {{ item.title }}
        </div>
        <div class="absolute w-full  bottom-1 left-1 flex gap-2">
            <Genres v-for="value in item.genres" :item="value" :top="true" />
        </div>
        <button
            @click="$router.push(item.type == 'Movie' || item.series_type == `Movie` ? { path: `/list/${item.slug}/1` } : { path: `/list/${item.slug}` })"
            class=" absolute bottom-1 right-1 py-1 px-2 rounded-lg text-gray-100  group-hover:text-white bg-slate-700 hover:bg-slate-900">
            Wiecej
        </button>
    </div> -->
</template>
<script>
import { MiComet, BsPlus, McCupcakeFill } from '@kalimahapps/vue-icons'

export default {
    props: {
        item: {
            type: Object
        },
        set: {
            type: Number
        },
        index: {
            type: Number
        },
        carusel: {
            type: Boolean,
            default: false
        },
        itemsShow: {
            type: Number,
            default: 0,
        },
        numbering: {
            type: Boolean
        }
    },

    components: {
        MiComet,
        BsPlus,
        McCupcakeFill
    },

    computed: {
        upActive() {
            return this.index <= this.set ? true : false
        },

    },
    methods: {
        preloadImage(url) {
            let img = new Image();
            img.src = url;
            return img.src
        }
    },
}
</script>
