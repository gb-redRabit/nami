<template>
    <div class=" flex flex-col gap-1 mt-4 -ml-96">
        <p class=" grid  grid-cols-3 " v-if="item.cda.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">cda</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.cda " :key="index" @click="$emit('selectPlayer', value.id)">
                {{ value.translator_title }}</button>
        </div>
        </p>
        <p class=" grid grid-cols-3 " v-if="item.vk.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">vk</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.vk " :key="index" @click="$emit('selectPlayer', value.id)">
                {{ value.translator_title }}</button>
        </div>
        </p>
        <p class=" grid grid-cols-3 " v-if="item.dailymotion.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">dailymotion</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.dailymotion " :key="index" @click="$emit('selectPlayer', value.id)">
                {{ value.translator_title }}</button>
        </div>
        </p>
        <p class=" grid grid-cols-3 " v-if="item.mega.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">mega</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.mega " :key="index" @click="$emit('selectPlayer', value.id)">
                {{ value.translator_title }}</button>
        </div>
        </p>
        <p class=" grid grid-cols-3 " v-if="item.google.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">google</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.google " :key="index" @click="$emit('selectPlayer'), value.id">
                {{ value.translator_title }}</button>
        </div>
        </p>
        <p class=" grid grid-cols-3 " v-if="item.other.length > 0">
        <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">other</h2>
        <div class=" flex gap-1">
            <button class="bg-slate-300 py-1 px-2 rounded-md text-sm" :class="{ 'text-red-600': select === value.id }"
                v-for="( value, index ) in item.other " :key="index" @click="$emit('selectPlayer'), value.id">
                {{ value.translator_title }}</button>
        </div>
        </p>
    </div>
</template>

<script setup>
defineEmits(["selectPlayer"])
defineProps({
    item: {
        type: Object,
    },
    select: {
        type: Number,
    },
})
</script>
