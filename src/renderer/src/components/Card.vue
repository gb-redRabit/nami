<template>
    <RouterLink :to="item.episodes > 1 ? { path: `/list/${item.slug}` } : { path: `/list/${item.slug}/1` }"
        class="group h-64 w-44 relative rounded-xl" v-if="upActive">
        <div
            class="transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)] group-hover:after:to-[rgba(0,0,0,0.5)]">
            <img :src="preloadImage(item.cover)" class="absolute w-full h-full rounded-xl group-hover:blur-[1px]"
                alt="cover" />
        </div>
        <div class="absolute top-1 left-1 bg-red-800 flex justify-center items-center gap-1 py-1 px-2 rounded-xl font-bold text-neutral-200"
            v-if="item.newEpisode">
            <span class="text-[12px]">NEW</span>
            <MiComet />
        </div>

        <!-- dodawanie anime do zbioru obejrzanych -->
        <!-- <div
            class="absolute top-0 right-0 bg-blue-800  flex justify-center items-center size-7 rounded-tr-xl rounded-bl-xl font-bold text-neutral-200">
            <BsPlus class="text-2xl" />
        </div> -->
        <div class="absolute bottom-0 w-full p-2 text-gray-100 group-hover:text-white">
            {{ item.title.length <= 20 ? item.title : `${item.title.slice(0, 19)}...` }} </div>
    </RouterLink>
</template>
<script>
import { MiComet, BsPlus } from '@kalimahapps/vue-icons'

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
        }
    },

    components: {
        MiComet,
        BsPlus
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
