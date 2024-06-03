<template>
    <button @click="clickGenre(item)" :class="{ '!bg-slate-500 ': item.isActive }" class=" py-1 px-2 border bg-slate-700 text-white rounded-xl text-sm
        hover:bg-slate-900">
        {{ item.title }}</button>
</template>


<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

const store = useStore();
const index = ref();

const { item } = defineProps({
    item: {
        type: Object,

    }
})

onMounted(() => {
    index.value = store.state.genresTab.findIndex(value => value.title === item.title)
    item.isActive = index.value >= 0;
})

const clickGenre = (value) => {
    if (!value.isActive) {
        store.dispatch("addGenres", value)
        value.isActive = !value.isActive
    }
    else {
        store.dispatch("removeGenres", value)
        value.isActive = !value.isActive
    }
}
</script>