<template>
    <RouterLink :to="{ name: to }" exact class="group p-1 relative dark:text-gray-300"
        active-class="text-gray-600 dark:text-gray-800">
        <component :is="icon" class="text-2xl " />
        <div
            class="transition-all duration-100 ease-linear w-32 h-full items-center hidden absolute opacity-0 bg-gray-400 left-9 top-0 group-hover:opacity-100 group-hover:flex font-medium px-2 rounded-r-full dark:bg-neutral-900 dark:text-gray-300">
            {{ label }}
        </div>
    </RouterLink>
    <div v-if="to === 'home'" class="w-9/12 h-[1.5px] bg-black dark:bg-white "></div>
</template>

<script setup>
defineProps({
    icon: String,
    label: String,
    to: String
})
</script>
