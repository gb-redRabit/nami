<template>
    <div class="flex flex-col mt-16 ">
        <span v-for="(item, index) in store.getters.newList" :key="index">{{ item.title }}</span>
        <br />
        <span v-for="(item, index) in store.getters.nextList" :key="index">{{ item.title }}</span>
        <div>
            <GenreItem v-for="(item, index) in store.getters.genres" :key="index" :item="item" :typ="false" />
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import GenreItem from '@/components/GenreItem.vue';

const store = useStore();

store.dispatch(`celeanGenres`)

</script>

