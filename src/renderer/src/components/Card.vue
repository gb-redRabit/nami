<template>
    <RouterLink
        :to="item.type === 'Movie' || item.series_type === `Movie` ? { path: `/list/${item.slug}/1` } : { path: `/list/${item.slug}` }"
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

        <div class="absolute bottom-0 w-full p-2 text-gray-100 group-hover:text-white">
            {{ item.title.length <= 20 ? item.title : `${item.title.slice(0, 19)}...` }} </div>
    </RouterLink>

</template>
<script setup>
import { ref, computed } from 'vue';
import { MiComet, BsPlus, McCupcakeFill } from '@kalimahapps/vue-icons';

// Props
const props = defineProps({
    item: Object,
    set: Number,
    index: Number,
    carusel: {
        type: Boolean,
        default: false
    },
    itemsShow: {
        type: Number,
        default: 0,
    }
});



// Computed properties
const upActive = computed(() => props.index <= props.set);

// Methods
function preloadImage(url) {
    let img = new Image();
    img.src = url;
    return img.src;
}
</script>
