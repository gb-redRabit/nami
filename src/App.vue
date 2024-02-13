<template>
  <div class=" flex  flex-col relative  bg-gray-900 text-gray-100 min-h-screen ">
    <SiteNavigation :toogleBar="toogleBar" @toogle="toogle" />


    <div class="sidebar relative flex   flex-col   ml-[3.35rem] overflow-hidden" :class="{ '!ml-52': toogleBar }">
      <BreadcrumbsNav />
      <RouterView v-slot="{ Component }" :key="$route.params.id">
        <Component :is="Component" />
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

import BreadcrumbsNav from './components/BreadcrumbsNav.vue'
import SiteNavigation from "./components/SiteNavigation"
// import TopNavigation from "./components/TopNavigation"
import https from 'https'

const store = useStore()
const toogleBar = ref(false)

const toogle = () => {
  toogleBar.value = !toogleBar.value
}
onMounted(async () => {
  https.get('https://api.docchi.pl/v1/series/list', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      store.dispatch("getFull", JSON.parse(data))
      store.dispatch("listEdit", JSON.parse(data))
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

})

</script>


<style>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-gray-900
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-slate-500
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-200
}
</style>