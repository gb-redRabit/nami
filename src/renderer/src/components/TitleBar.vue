<template>
    <div class="dragApp fixed top-0 left-[40px] right-0 z-50 flex justify-end">
        <button @click="minimizeApp" class="flex flex-col items-center p-1 rounded-full hover:text-gray-600">
            <MdMinimize class="text-2xl" />
        </button>
        <button @click="maxmizeApp" class="flex flex-col items-center p-1 rounded-full hover:text-gray-600">
            <LaWindowMinimize class="text-2xl" />
        </button>
        <button @click="closeApp" class="flex flex-col items-center p-1 rounded-full hover:text-gray-600">
            <IoClose class="text-2xl" />
        </button>
    </div>

</template>

<script setup>
import {
    IoClose,
    MdMinimize,
    LaWindowMinimize
} from '@kalimahapps/vue-icons'
const minimizeApp = () => {
    window.electron.ipcRenderer.send('minimize')
}

const maxmizeApp = () => {
    window.electron.ipcRenderer.send('maximize')
}
const closeApp = () => {
    window.electron.ipcRenderer.send('close')
}
</script>