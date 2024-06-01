<script setup>
import Versions from '../components/Versions.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const ipcHandle = () => window.getApi()


</script>

<template>
    <h1 class="flex items-center justify-center text-4xl ">
        Strona tytułowa / Profil
    </h1>
</template>
