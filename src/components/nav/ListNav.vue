<template>
    <li class="min-w-max">
        <RouterLink :to="{ name: item.name }" exact aria-label="dashboard"
            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
            <component :is="item.alies" class="w-6 h-6"> </component>
            <span class="group-hover:text-slate-400 font-medium">{{ item.name }}</span>
        </RouterLink>
    </li>
</template>

<script setup>

defineProps({
    item: {
        type: Object,
    },
})


</script>
