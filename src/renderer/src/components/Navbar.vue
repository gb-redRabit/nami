<template>
    <nav class=" fixed flex flex-col justify-between h-full py-3 w-[40px] bg-gray-400">
        <div class="flex flex-col items-center gap-2">
            <RouterLink :to="{ name: 'home' }" exact class="p-1 hover:animate-pulse" active-class="text-gray-600">
                <AkHome class="text-2xl" />
            </RouterLink>
            <div class="w-9/12 h-[1.5px] bg-black -mt-2 "> </div>
            <RouterLink :to="{ name: 'edit' }" exact class="p-1 hover:animate-pulse" active-class="text-gray-600">
                <FaRegRectangleList class="text-2xl" />
            </RouterLink>
            <RouterLink :to="{ name: 'new' }" exact class="p-1 hover:animate-pulse" active-class="text-gray-600">
                <FaFireFlameCurved class="text-2xl" />
            </RouterLink>


            <!-- test brak strony  -->
            <RouterLink :to="{ path: '/lisasdt/asfsd' }" exact class="p-1 hover:animate-pulse"
                active-class="text-gray-600">
                <FaFireFlameCurved class="text-2xl" />
            </RouterLink>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
            <button class="flex flex-col items-center p-1 rounded-full hover:animate-pulse">
                <AnOutlinedInfoCircle class="text-2xl" />
            </button>
            <button @click="closeApp" class="flex flex-col items-center p-1 rounded-full hover:animate-pulse">
                <ClCloseCircle class="text-2xl" />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ClCloseCircle, AnOutlinedInfoCircle, FaRegRectangleList, FaFireFlameCurved, AkHome } from "@kalimahapps/vue-icons";

import routes from '../router/routes'
//https://vue-icons.kalimah-apps.com/?ref=madewithvuejs.com
const closeApp = () => {
    window.electron.ipcRenderer.send("close");
}
</script>
