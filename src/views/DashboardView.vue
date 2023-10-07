<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import UserLayout from '../components/UserLayout.vue'

document.title = "Dashboard"

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

if (authStore.accessToken == null) {
    authStore.router.push("/login")
}


</script>


<template>
    <!-- <NavBlock :activeMenu="10" /> -->
    <UserLayout :activeMenu="0">

        <div class="m-1 bg-white p-5">

            <span class="text-3xl">Dashboard</span>
            <div class="flex">
            </div>
        </div>

        <div class="min-h-[600px] m-1 px-10 bg-white rounded-md">

            <div
                class="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-2 px-10 py-10">
                <div class="w-32 h-32  border-4 shadow-md border-purple-200 rounded-lg"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
                <div class="w-32 h-32 border-4 shadow-md border-purple-200"></div>
            </div>


        </div>

    </UserLayout>
</template>

<style scoped></style>
