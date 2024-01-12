<template>
    <div class="flex flex-wrap gap-3">
        <ItemCard v-for="item in $store.getters.restList" :key="item.mal_id" :item="item" />
    </div>
</template>

<script setup>
import ItemCard from '@/components/ItemCard.vue';

</script>
