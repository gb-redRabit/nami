<template>
    <button class="p-1 m-1 border-2 hover:text-red-600 hover:border-red-600" v-if="typ"
        :class="{ 'text-amber-500 border-amber-600': isActive }" @click="clickGenre(item)">
        {{ item }}
    </button>
    <button class="p-2  bg-slate-900 rounded-md  hover:text-red-600 hover:border-red-600" v-else
        @click="() => { store.dispatch(`celeanGenres`); store.dispatch(`addGenres`, item); $router.go(-1) }">
        {{ item }}
    </button>
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
    },
    typ: {
        type: Boolean
    }

})

onMounted(() => {
    index.value = store.state.genresTab.findIndex(item => item === props.item)
    if (index.value > 0) {
        isActive.value = false
    }
    if (index.value === 0)
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
