<template>
    <div class="flex flex-wrap">
        <div v-for="(item) in this.$store.getters.genres" :key="item.mal_id" class="p-2 border-2 m-1">
            {{ item }}
        </div>
    </div>
</template>

<script setup>


</script>
