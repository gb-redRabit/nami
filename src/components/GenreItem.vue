<template>
    <button class="p-1 m-1 border-2 hover:text-red-600 hover:border-red-600"
        :class="{ 'text-amber-500 border-amber-600': isActive }" @click="clickGenre(item)">
        {{ item }}
    </button>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, } from 'vue'
const store = useStore();
const index = ref(null);
const isActive = ref(false)
defineProps({
    item: {
        type: String,
    },

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
