<template>
    <nav class=" fixed flex flex-col justify-between h-full py-3 w-[40px] bg-gray-400">
        <div class="flex flex-col items-center ">
            <RouterLink :to="{ name: 'home' }" exact class="p-1 hover:animate-pulse" active-class="text-gray-600">
                <AkHome class="text-2xl" />
            </RouterLink>
            <div class="w-9/12 h-[1.5px] bg-black m-1 "> </div>
            <RouterLink :to="{ name: 'edit' }" exact class="p-1 hover:animate-pulse" active-class="text-gray-600">
                <FaRegRectangleList class="text-2xl" />
            </RouterLink>
        </div>
        <button @click="closeApp" class="flex flex-col items-center p-1 hover:animate-pulse">
            <ClCloseCircle class="text-2xl" />
        </button>
    </nav>
</template>

<script setup>
import { AkHome } from "@kalimahapps/vue-icons";
import { ClCloseCircle } from "@kalimahapps/vue-icons";
import { FaRegRectangleList } from "@kalimahapps/vue-icons";

import routes from '../router/routes'
//https://vue-icons.kalimah-apps.com/?ref=madewithvuejs.com
const closeApp = () => {
    window.electron.ipcRenderer.send("close");
}
</script>
