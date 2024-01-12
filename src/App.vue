<template>
  <div class=" flex  flex-col relative  bg-gray-900 text-gray-100 min-h-screen ">
    <SiteNavigation :toogleBar="toogleBar" @toogle="toogle" />
    <TopNavigation :toogleBar="toogleBar" @toogle="toogle" />



    <div class="sidebar flex ml-[3.35rem] " :class="{ '!ml-52': toogleBar }">
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in" enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster">
          <Suspense v-if="store.state.fullList[0]">
            <Component :is="Component" />
          </Suspense>
          <div v-else>
            dupa
          </div>
        </Transition>
      </RouterView>

    </div>
  </div>
</template>
<script>




</script>
<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'


import SiteNavigation from "./components/SiteNavigation"
import TopNavigation from "./components/TopNavigation"
import https from 'https'

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