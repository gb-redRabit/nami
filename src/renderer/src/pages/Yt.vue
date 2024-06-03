<template>
    <div class=" fixed top-0 left-[40px] w-screen h-screen bg-white bg-opacity-40 flex  justify-center items-center">
        <div class="absolute w-full h-full cursor-pointer" @click="$router.push({ name: `anime`, params: { id: id } })">
        </div>
        <div class=" bg-black bg-opacity-40 w-5/6 h-5/6 flex flex-col justify-center items-center z-10 relative">
            <button
                class="bg-black bg-opacity-40 text-white p-2 rounded-full cursor-pointer hover:text-red-600  absolute top-2 right-2"
                @click="$router.push({ name: `anime`, params: { id: id } })">
                <ClCloseCircle class="size-8" />
            </button>
            <iframe :src="yt" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                allow="clipboard-write" title="player" className=" min-w-full h-full " />
        </div>
    </div>
</template>

<script setup>
import { ClCloseCircle } from "@kalimahapps/vue-icons";

defineProps({
    id: {
        type: String,
    },
    yt: {
        type: String,
    },
})
</script>
