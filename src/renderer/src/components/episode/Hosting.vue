<template>
    <div class=" flex flex-col gap-1 mt-4 -ml-96">
        <div class=" grid  grid-cols-3 " v-for="[key, values] of Object.entries(item)" :key="key">
            <template v-if="values.length > 0">
                <h2 class="col-span-1 text-right mr-5 text-gray-400 first-letter:uppercase font-medium">{{ key }}</h2>
                <div class=" flex gap-1">
                    <button class="bg-slate-300 py-1 px-2 rounded-md text-sm"
                        :class="{ 'text-red-600': select === value.id }" v-for="( value, index ) in values "
                        :key="index" @click="$emit('selectPlayer', value.id, value.player_hosting)">
                        {{ value.translator_title }}</button>
                </div>
            </template>
        </div>
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
