<template>
    <div class>
        <div v-for="(item) in this.$store.state.fullList" :key="item.mal_id">
            {{ item.title }}
        </div>
    </div>
</template>

<script>

</script>

