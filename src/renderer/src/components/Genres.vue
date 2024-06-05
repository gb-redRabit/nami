<template>

    <button v-if="select" @click="() => {
        aaa(item), $router.push({ name: `edit` })
    }
        " class="py-1 px-3 bg-slate-700 text-white rounded-xl text-md hover:bg-slate-900">
        {{ item.title }}
    </button>
    <button v-else-if="top" @click="() => {
        aaa({ title: item.name, isActive: true }), $router.push({ name: `edit` })
    }
        " class="py-1 px-3 bg-slate-700 text-white rounded-xl text-md hover:bg-slate-900">
        {{ item.name }}
    </button>
    <button v-else @click="clickGenre(item)" :class="{ '!bg-slate-500 ': item.isActive }"
        class="py-1 px-2 border bg-slate-700 text-white rounded-xl text-sm hover:bg-slate-900">
        {{ item.title }}
    </button>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

const store = useStore()
const index = ref()

const { item, select } = defineProps({
    item: Object,
    select: { type: Boolean, default: false },
    top: { type: Boolean, default: false }
})

onMounted(() => {
    index.value = store.state.genresTab.findIndex((value) => value.title === item.title)
    item.isActive = index.value >= 0
})

const aaa = (value) => {
    console.log(value);
    store.dispatch(`celean`)
    store.dispatch('addGenres', value)
}

const clickGenre = (value) => {
    if (!value.isActive) {
        store.dispatch('addGenres', value)
        value.isActive = !value.isActive
    } else {
        store.dispatch('removeGenres', value)
        value.isActive = !value.isActive
    }
}
</script>
