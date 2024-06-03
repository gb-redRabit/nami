<template>
  <div class=" relative min-h-screen min-w-11/12 ">
    <RouterView :toogleBar="toogleBar" @toogle="toogle" :genres="genres" :type="type" />
    <div class="p-2 flex flex-col items-center justify-center  w-[calc(100%-10px)] "
      :class="{ 'ml-60 !w-[calc(100%-240px)]': toogleBar }">
      <div class="flex justify-between items-center w-11/12 py-3    my-6l">
        <div class="flex justify-center gap-2 px-5 py-1 bg-slate-700  rounded-full">
          <AnOutlinedSortAscending
            class="text-3xl cursor-pointer bg-slate-400 border-gray-400 rounded-lg hover:text-gray-600" @click="store.getters.listEdit.sort(
              (a, b) => a.title.localeCompare(b.title)
            )" />
          <AnOutlinedSortDescending
            class="text-3xl cursor-pointer bg-slate-400 border-gray-400 rounded-lg hover:text-gray-600" @click="store.getters.listEdit.sort(
              (a, b) => b.title.localeCompare(a.title)
            )" />
          <CgSortAz class="text-3xl cursor-pointer bg-slate-400 border-gray-400 rounded-lg hover:text-gray-600" @click="store.getters.listEdit.sort(
            (a, b) => new Date(b.aired_from) - new Date(a.aired_from)
          )" />
          <CgSortZa class="text-3xl cursor-pointer bg-slate-400 border-gray-400 rounded-lg hover:text-gray-600" @click="store.getters.listEdit.sort(
            (a, b) => new Date(a.aired_from) - new Date(b.aired_from)
          )" />
        </div>
        <div class=" text-white  outline-none focus:outline-none">
          <input type="text" name="search" placeholder="Wyszukaj" :value="search" @input="searchAnime"
            class="bg-slate-700 h-10 flex px-8 w-full rounded-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 "
            autocomplete="off" spellcheck="false" required step="any" autocapitalize="none" autofocus />
          <button type="submit" class="absolute inset-y-0 right-0 mr-2 flex items-center px-2">
            <svg class="h-4 w-4 text-white fill-current " xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
              viewBox="0 0 56.966 56.966" xml:space="preserve" width="512px" height="512px">
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-3 mx-4" @scroll="handleScroll"
        v-if="store.getters.listEdit.length !== 0">
        <Card v-for="(item, index) in store.getters.listEdit" :key="index" :item="item" :set="set" :index="index" />
      </div>
      <div class="flex flex-col justify-center items-center mt-20  " v-else>
        <img src="../assets//cat.png" alt="cat" class="grayscale w-96" />
        <h1 class="flex justify-center items-center gap-2 py-4 px-16 -mt-16 rounded-lg text-white bg-slate-700">Brak
          wyników
          wyszukiwania
          <button @click="cleanSearch"
            class="flex justify-center items-center gap-2 font-medium py-1 px-2 border text-slate-700 bg-white rounded-xl animate-pulse">
            Wyczyść
            <AkCircleXFill class=" text-xl" />
          </button>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AnOutlinedSortAscending, AnOutlinedSortDescending, CgSortAz, CgSortZa, AkCircleXFill } from "@kalimahapps/vue-icons";

import Card from '../components/list/Card.vue'

import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'

const toogleBar = ref(true)
const store = useStore();
const search = ref('');
const genres = ref(store.getters.genres);
const type = ref(store.getters.type);
const set = ref(40);
const index = ref('');

const toogle = () => {
  toogleBar.value = !toogleBar.value
}

const cleanSearch = () => {
  store.dispatch(`celean`);
  search.value = ""
  genres.value = store.getters.genres;
  genres.type = store.getters.type;
  searchList(store.state.genresTab, store.state.typeSelect);
  watch([store.state.genresTab, store.state.typeSelect], async (currentValue, newValue) => {
    searchList(store.state.genresTab, store.state.typeSelect);
  })
}
const searchAnime = (e) => {
  search.value = e.target.value
  searchList(store.state.genresTab, store.state.typeSelect);
}

const handleScroll = () => {
  if (window.scrollY > document.body.offsetHeight - 1300) {
    set.value += 40
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  searchList(store.state.genresTab, store.state.typeSelect);
})


watch([store.state.genresTab, store.state.typeSelect], async (currentValue, newValue) => {
  console.log('asd');
  searchList(store.state.genresTab, store.state.typeSelect);
})


const searchList = (tagi, typ) => {
  typ = typ[store.state.typeSelect.length - 1] || "";
  let tab = store.getters.list.filter(value => value.title.toLowerCase().includes(search.value.toLowerCase()));

  if (tagi[0] !== undefined && typ !== "") {
    tab = tab.filter(value => value.series_type === typ);
    tab = tab.filter(value => tagi.every(r => value.genres.includes(r.title)));
  } else if (tagi[0] === undefined && typ !== "") {
    tab = tab.filter(value => value.series_type === typ);
  } else if (tagi[0] !== undefined && typ === "") {
    tab = tab.filter(value => tagi.every(r => value.genres.includes(r.title)));
  }

  store.dispatch("listEdit", tab);
};
</script>
