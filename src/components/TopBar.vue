<script setup>
// import { ref, reactive } from 'vue';

import { useProfileStore } from '../stores/ProfileStore'
const profileStore = useProfileStore()

</script>


<template>
    <div
        class="flex h-32 w-full bg-white justify-between items-center border-b-2 border-purple-950 shadow-md shadow-purple-500">
        <div>
            <div class="flex justify-start items-center bg-white px-6 w-full">
                <img class="w-6 sm:w-10 h-auto m-2 rounded-full" src="/img/logo_lwmk.png" alt="Logo">
                <!-- <span class="text-sm sm:text-lg">IMS</span> -->
            </div>
        </div>
        <div class="hidden sm:flex flex-row justify-center items-center border-0 border-black p-2">
            <div class="relative">
                <img class="w-10 h-10 rounded-full" :src="profileStore.avatar_url" alt="">
                <span
                    class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full">
                </span>
            </div>
            <div class="flex w-3/4">
                <!-- <h1>{{ authStore.username }}</h1> -->
                <h1 class="pl-4">{{ profileStore.GetProfileName }}</h1>
                <RouterLink class=" text-red-800 text-lg" :to="{ name: 'Logout' }">Logout
                </RouterLink>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
