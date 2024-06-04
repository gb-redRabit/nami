<template>
    <div class="flex gap-9  w-9/12 h-full my-24 text-white">
        <div class="flex flex-col gap-2 w-1/4  animate-pulse">
            <div class="flex  w-full h-9 bg-slate-700 rounded-lg "></div>
            <div class=" w-full h-[520px] bg-slate-700  rounded-lg "></div>
            <div class="flex  w-full h-9 bg-slate-700 rounded-lg "></div>
            <h2 class="font-medium py-2">Informacje</h2>
            <div class="flex flex-col bg-slate-700 rounded-lg gap-2 p-2 h-[440px] "></div>
        </div>
        <div class="flex flex-col  w-3/4 gap-2  animate-pulse">
            <div class="h-9 w-1/2 bg-neutral-200 opacity-25 rounded-lg"> </div>
            <div class="h-5 w-2/5 bg-neutral-200 opacity-25 rounded-lg"> </div>
            <div class="text-2xl font-bold mt-10 ">Opis</div>
            <section class="flex flex-col justify-end w-3/4 gap-2">
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
                <div class="h-2 w-3/4 bg-neutral-200 opacity-25 rounded-lg"></div>
            </section>
            <div class="flex  gap-2 my-10">
                <div class=" h-10 w-24 bg-slate-700 rounded-lg " v-for="index in 2" :key="index"></div>
            </div>
            <div class="flex flex-col gap-1 mt-10 ">
                <h2>Powiązane serie</h2>
                <div class="flex flex-wrap gap-3">
                    <div class="bg-gray-900 bg-opacity-60 rounded-md overflow-hidden flex  w-80 h-24" v-for="index in 2"
                        :key="index">
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-10    gap-2">
                <div class="flex justify-center items-center gap-2 px-2  text-gray-600 ">
                    <h2>Sortuj odcinki od </h2>
                    <div
                        class="group w-36  flex flex-row justify-center items-center rounded-lg  bg-gray-600 text-neutral-200 hover:text-gray-300">
                        najstarszych
                        <CgSortAz
                            class="text-4xl cursor-pointer  border-gray-400 rounded-lg group-hover:text-gray-400" />
                    </div>

                </div>
                <div class="bg-gray-600 flex rounded-lg gap-2 p-2">
                    <CgMenuGridR class=" size-8  cursor-pointer text-red-600 " />
                    <HeOutlineUiMenuGrid class=" size-8  cursor-pointer" />
                    <CaMenu class=" size-8  cursor-pointer" />
                </div>
            </div>
            <div class="mt-10  grid grid-cols-4   gap-2 ">
                <div class="flex flex-col w-60  bg-gray-600 rounded-lg" v-for="index in 10" :key="index">
                    <div class=" w-full h-32 rounded-t-lg">
                        <div class="flex justify-center items-center bg-slate-400 w-full h-full rounded-t-lg">
                            <BsImageFill class="text-2xl  " />
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 p-2">
                        <p><span class=" font-medium">Odcinek</span> {{ index }}</p>
                        <p>{{ new Date().toISOString().slice(0, 10) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { CaMenu, CgMenuGridR, HeOutlineUiMenuGrid, CgSortAz, BsImageFill } from "@kalimahapps/vue-icons";
</script>