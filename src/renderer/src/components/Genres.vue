<template>
    <button @click="clickGenre(item)" :class="{ '!bg-slate-500 ': isActive }" class=" py-1 px-2 border bg-slate-700 text-white rounded-xl text-sm
        hover:bg-slate-900">
        {{ item }}</button>
</template>


<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
const store = useStore();
const index = ref('');
const isActive = ref(false)

const props = defineProps({
    item: {
        type: String,

    }
})

onMounted(() => {
    index.value = store.state.genresTab.findIndex(item => item === props.item)
    if (index.value < 0) {
        isActive.value = false
    }
    if (index.value >= 0)
        isActive.value = true
})

const clickGenre = (value) => {
    index.value = store.state.genresTab.findIndex(item => item === value)
    if (index.value < 0) {
        store.dispatch("addGenres", value)
        isActive.value = !isActive.value
    }
    else {
        store.dispatch("removeGenres", value)
        isActive.value = !isActive.value
    }
}
</script>