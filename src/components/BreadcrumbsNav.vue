<template>
    <div class="absolute top-10 left-1/2 -translate-x-2/4 -translate-y-2/4 z-20 w-11/12 text-gray-500 mx-auto flex gap-2">
        <RouterLink :to="{ name: 'home' }" active-class=" text-white" class="first-letter:uppercase">
            home
        </RouterLink>
        <RouterLink :to="{ name: breadcrumbs($route.fullPath)[1] }" active-class=" text-white"
            class="first-letter:uppercase">
            {{ breadcrumbs($route.fullPath)[1] }}
        </RouterLink>
        <RouterLink v-if="breadcrumbs($route.fullPath).length >= 2"
            :to="{ name: $route.name, params: { id: breadcrumbs($route.fullPath)[2] } }" active-class="text-white"
            class="first-letter:uppercase">
            {{ breadcrumbs($route.fullPath)[2] }}
        </RouterLink>
        <RouterLink v-if="breadcrumbs($route.fullPath).length >= 3"
            :to="{ name: $route.name, params: { id: breadcrumbs($route.fullPath)[2], episode: breadcrumbs($route.fullPath)[3] } }"
            active-class="text-white" class="first-letter:uppercase">
            {{ breadcrumbs($route.fullPath)[3] }}
        </RouterLink>

    </div>
</template>

<script setup>

const breadcrumbs = (value) => {
    const lastIndex = value.lastIndexOf("?");
    if (lastIndex > 0)
        return value.slice(0, lastIndex).split('/')
    else
        return value.split('/')
}
</script>
