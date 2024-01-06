<template>
  <div class=" flex relative min-h-screen bg-gray-900 text-gray-100">
    <SiteNavigation :key="$route.fullPath" :toogleBar="toogleBar" @toogle="toogle" />
    <div class="sidebar flex flex-col w-full ml-[3.35rem]" :class="{ '!ml-52': toogleBar }">
      <div class="flex flex-row justify-center items-center bg-slate-950">
        <div>
          hmmmm dodać menu nawigacyjne do podstron oraz zmienić pozycje guzika do menu głównego
        </div>
        <button class=" p-2 text-lg" @click="toogle">
          <Transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
            leave-active-class="animate__animated animate__fadeOut animate__faster">
            <ArrowRightIcon class="h-8 w-8 text-gray-100 hover:text-slate-500" v-if="!toogleBar" />
            <ArrowLeftIcon class="h-8 w-8 text-gray-100 hover:text-slate-500" v-else />
          </Transition>
        </button>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
<script setup>
import SiteNavigation from "./views/SiteNavigation"
import https from 'https'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'

const store = useStore()
const toogleBar = ref(false)

const toogle = () => {
  toogleBar.value = !toogleBar.value
}
onMounted(async () => {
  // aby pobrać z danego sezony trzeba wyciągnąć z pełnej listy
  /// aby pobrać z danego z nastepnego sezonu trzeba wyciągnąć z pełnej listy
  //Ostatnio dodane odcinki
  //https://api.docchi.pl/v1/episodes/latest?season=winter&season_year=2024
  // Nieemitowane odcinki
  //https://api.docchi.pl/v1/episodes/latest?season=winter&season_year=2024&type=not
  https.get('https://api.docchi.pl/v1/series/list', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data)[0])
      store.dispatch("getFull", JSON.parse(data))
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

})

</script>


<style></style>