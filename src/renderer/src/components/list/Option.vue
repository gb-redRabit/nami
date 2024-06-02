<template>
    <div class=" fixed bg-gray-300 w-[250px] h-full " :class="{ '!w-0': !toogleBar }">
        <div class="w-5 h-full bg-gradient-to-r from-gray-600 absolute top-1/2 -right-5 -translate-y-1/2 hover:contrast-200"
            @click="$emit('toogle')"></div>
        <div v-if="toogleBar" class="flex flex-col items-center text-center py-3 gap-2">
            <section class="p-1">
                <h2 class=" text-lg font-medium py-2">Gatunki</h2>
                <div class="flex flex-wrap gap-1">
                    <Genres v-for="item in genres" :item="item" />
                </div>
            </section>
            <section>
                <h2 class=" text-lg font-medium py-2 ">Typy</h2>
                <select class="bg-gray-500 p-2 w-[180px] rounded-lg" @change="selectType" :value="select">
                    <option value=''>Wybierz opcje</option>
                    <option v-for="(item, index) in type" :key="index" :value="item.title">{{ item.title }}
                    </option>
                </select>
            </section>
        </div>
    </div>
</template>

<script setup>

import Genres from '../Genres.vue';
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
const store = useStore();
const select = ref('');

defineEmits(["toogle"])
const props = defineProps({
    toogleBar: {
        type: Boolean,
    },
    genres: {
        type: Object
    },
    type: {
        type: Object
    }
})


const selectType = (e) => {
    store.dispatch("addType", e.target.value)
}
onMounted(() => {
    select.value = store.state.typeSelect[store.state.typeSelect.length - 1]
})

</script>
