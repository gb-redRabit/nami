<template>
    <RouterLink :to="{ path: `/list/${item.slug}` }" @click="console.log(`/list/${item.slug}`);">
        <div class="group h-64 w-40 relative rounded-xl " v-if="upActive" ref="infoBox">
            <div
                class="transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] group-hover:after:from-[rgba(0,0,0,0.5)] group-hover:after:to-[rgba(0,0,0,0.5)] ">
                <img :src="item.cover" class="absolute w-full h-full rounded-xl group-hover:blur-[1px]" alt="cover">
            </div>
            <div class="absolute bottom-0 w-full p-2">
                <h1 class="text-gray-100 group-hover:text-green-400">{{ item.title.length <= 20 ? item.title :
                    `${item.title.slice(0, 19)}...` }}</h1>
            </div>
        </div>
    </RouterLink>
</template>
<script>

export default {
    data() {
        return {
            el: null
        }
    },
    props: {
        item: {
            type: Object,
        },
        set: {
            type: Number,
        },
    },
    mounted() {
        this.el = this.$refs.infoBox.getBoundingClientRect().top;
    },
    computed: {
        upActive() {
            return this.el < this.set + 1600 ? true : false
        }
    }

}

</script>

