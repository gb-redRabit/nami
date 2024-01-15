<template>
    <li class="min-w-max">
        <RouterLink :to="{ name: routes[0].name }" exact aria-label="dashboard"
            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
            <component :is="routes[0].alies" class="w-6 h-6"> </component>
            <span class="group-hover:text-slate-400 font-medium">{{ routes[0].name }}</span>
        </RouterLink>
        <RouterLink :to="{ name: routes[1].name }" exact aria-label="dashboard"
            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
            <component :is="routes[1].alies" class="w-6 h-6"> </component>
            <span class="group-hover:text-slate-400 font-medium">{{ routes[1].name }}</span>
        </RouterLink>
        <RouterLink :to="{ name: routes[3].name }" exact aria-label="dashboard"
            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
            <component :is="routes[3].alies" class="w-6 h-6"> </component>
            <span class="group-hover:text-slate-400 font-medium">{{ routes[3].name }}</span>
        </RouterLink>
        <RouterLink :to="{ name: routes[4].name }" exact aria-label="dashboard"
            class="group flex items-center space-x-4 px-4 py-3 text-gray-100 hover:bg-slate-600"
            active-class="bg-gradient-to-r  from-red-600 to-orange-400 text-white">
            <component :is="routes[4].alies" class="w-6 h-6"> </component>
            <span class="group-hover:text-slate-400 font-medium">{{ routes[4].name }}</span>
        </RouterLink>

    </li>
</template>

<script setup>

defineProps({
    routes: {
        type: Object,
    },
})


</script>
