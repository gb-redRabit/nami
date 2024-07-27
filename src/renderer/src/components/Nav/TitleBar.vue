<template>
    <div class="dragApp fixed top-0 left-[40px] right-0 z-50 flex justify-end">
        <div class="flex">
            <ControlButton @click="minimizeApp" :iconComponent="MdMinimize" />
            <ControlButton @click="maximizeApp" :iconComponent="LaWindowMinimize" />
            <ControlButton @click="closeApp" :iconComponent="IoClose" />
        </div>
    </div>
</template>

<script setup>
import { IoClose, MdMinimize, LaWindowMinimize } from '@kalimahapps/vue-icons';
import ControlButton from './ControlButton.vue';

const minimizeApp = () => {
    window.electron.ipcRenderer.send('minimize');
};

const maximizeApp = () => {
    window.electron.ipcRenderer.send('maximize');
};

const closeApp = () => {
    window.electron.ipcRenderer.send('close');
};


</script>
