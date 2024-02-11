<template>
    <div class="flex flex-col mt-16  items-center justify-center">
        <div class="bg-slate-950 p-4  m-4 rounded-md w-11/12">
            <div class=" flex flex-row justify-between">
                <h2 class=" font-bold text-2xl">Serie</h2>
                <button @click="isActive = !isActive" class="bg-gray-900 p-2 m-2 rounded-md">
                    <Bars3Icon class="size-6 text-gray-100 hover:text-slate-500" />
                </button>
            </div>
            <div class="flex flex-row gap-2">
                <button class="group flex gap-1 bg-gray-900 p-2  rounded-md" @click="store.getters.listEdit.sort(
                    (a, b) => a.title.localeCompare(b.title)
                )">
                    <BoltIcon class="size-6 text-gray-100 group-hover:text-slate-500" />
                    <span class="group-hover:text-slate-500"> Tytuł A-Z</span>
                </button>
                <button class=" group flex gap-1 bg-gray-900 p-2  rounded-md  " @click="store.getters.listEdit.sort(
                    (a, b) => new Date(b.aired_from) - new Date(a.aired_from)
                )">
                    <BarsArrowDownIcon class="size-6 text-gray-100  group-hover:text-slate-500" />
                    <span class="group-hover:text-slate-500"> Od najnowszych</span>
                </button>
                <button class="group flex gap-1 bg-gray-900 p-2  rounded-md" @click="store.getters.listEdit.sort(
                    (a, b) => new Date(a.aired_from) - new Date(b.aired_from)
                )">
                    <BarsArrowUpIcon class="size-6 text-gray-100 group-hover:text-slate-500" />
                    <span class="group-hover:text-slate-500"> Od najstarszych</span>
                </button>
            </div>
        </div>
        <div class=" flex  flex-row gap-4  m-4  bg-slate-950 w-11/12  rounded-md transition-all duration-500 ease-linear h-0 overflow-hidden"
            :class="{ 'h-52': isActive }">
            <div class="my-4 ml-4 w-3/4">
                <h2 class="my-2 font-bold text-2xl">Tagi</h2>
                <GenreItem v-for="(item, index) in $store.getters.genres" :key="index" :item="item" :typ="true" />
            </div>
            <div class=" my-4 mr-4 w-1/4">
                <h2 class="my-2 font-bold text-2xl">Rodzaj</h2>
                <p>Musisz wybrać kategorię</p>
                <select class="bg-gray-900 p-2 w-5/6 my-6" @change="selectType">
                    <option value=''>Wybierz opcje</option>
                    <option v-for="(item, index) in $store.getters.type" :key="index" :value="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-8 gap-4" @scroll="handleScroll" v-if="store.getters.listEdit.length !== 0">
            <ItemCard v-for="(item, index) in store.getters.listEdit" :key="index" :item="item" :set="set" :index="index" />
        </div>
        <LoaderComponet v-else class="!h-[200px] mt-24" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'
import { Bars3Icon, BarsArrowDownIcon, BarsArrowUpIcon, BoltIcon } from '@heroicons/vue/24/solid'

import { isProxy, toRaw } from 'vue';

import LoaderComponet from '@/components/LoaderComponet.vue';
import GenreItem from '@/components/GenreItem.vue';
import ItemCard from '@/components/ItemCard.vue';


const store = useStore();
const set = ref(30);
const select = ref('');
const tagi = ref([]);
const isActive = ref(false);
let tab;

defineProps({
    toogleBar: {
        type: Boolean,
    },
})

const handleScroll = () => {
    if (window.scrollY > document.body.offsetHeight - 1300) {
        set.value += 30
    }
}

onMounted(() => {
    console.log(toRaw(store.getters.listEdit) == [])
    console.log(isProxy(store.getters.listEdit) ? 'y' : 'n')
    window.addEventListener('scroll', handleScroll);
    searchList(store.state.genresTab, select.value);
})

const selectType = (e) => {
    select.value = e.target.value
    searchList(tagi.value, select.value)
}

watch(store.state.genresTab, (newValue) => {
    tagi.value = newValue
    searchList(tagi.value, select.value)
})

const searchList = (tagi, typ) => {
    if (tagi[0] !== undefined && typ !== '') {

        tab = store.getters.list.filter(value => value.series_type === typ)
        tab = tab.filter(value => tagi.every(r => value.genres.includes(r)))
    }
    if (tagi[0] === undefined && typ !== '') {
        tab = store.getters.list.filter(value => value.series_type === typ)
    }
    if (tagi[0] !== undefined && typ === '') {
        tab = store.getters.list.filter(value => tagi.every(r => value.genres.includes(r)))
    }
    if (tagi[0] === undefined && typ === '') {
        tab = store.getters.list
    }
    store.dispatch("listEdit", tab)
}
</script>

