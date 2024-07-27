<template>
    <button v-if="select" @click="handleSelectClick"
        class="py-1 px-3 bg-slate-700 text-white rounded-xl text-md hover:bg-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-300 dark:hover:text-neutral-900">
        {{ item.title }}
    </button>
    <button v-else-if="top" @click="handleTopClick"
        class="py-1 px-3 bg-slate-700 text-white rounded-xl text-md hover:bg-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-300 dark:hover:text-neutral-900">
        {{ item.name }}
    </button>
    <button v-else @click="() => clickGenre(item)" :class="{ '!bg-slate-500': item.isActive }"
        class="py-1 px-2 border bg-slate-700 text-white rounded-xl text-sm hover:bg-slate-900 dark:bg-neutral-900 dark:hover:bg-neutral-300 dark:hover:text-neutral-900">
        {{ item.title }}
    </button>


</template>
<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const index = ref()

const { item, select, top } = defineProps({
    item: Object,
    select: { type: Boolean, default: false },
    top: { type: Boolean, default: false }
})

onMounted(() => {
    index.value = store.state.genresTab.findIndex(value => value.title === item.title)
    item.isActive = index.value >= 0
})

const handleSelectClick = () => {
    processItem(item)
    router.push({ name: 'edit' })
}

const handleTopClick = () => {
    const newItem = { title: item.name, isActive: true }
    processItem(newItem)
    router.push({ name: 'edit' })
}

const processItem = (value) => {
    console.log(value)
    store.dispatch('celean')
    store.dispatch('addGenres', value)
}

const clickGenre = (value) => {
    const action = value.isActive ? 'removeGenres' : 'addGenres'
    store.dispatch(action, value)
    value.isActive = !value.isActive
}
</script>
