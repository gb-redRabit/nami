<template>
    <div class="absolute top-10 left-1/2 -translate-x-2/4 -translate-y-2/4 z-20 w-11/12 bg-gray-500 mx-auto">
        {{ abc($route.fullPath) }}
    </div>
</template>

<script setup>
const abc = (value) => {
    const tab = value.split('/')
    tab[0] = 'home'
    tab.length >= 3 ? tab[2] = tab[2].replace("-", " ") : '';
    tab.length >= 4 ? tab[3] = tab[3].replace("-", " ") : '';

    return value
}
</script>
