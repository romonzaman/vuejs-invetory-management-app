<script setup>
import SideBar from '../components/SideBar.vue'
import TopBar from '../components/TopBar.vue'

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

defineProps({
    activeMenu: {
        type: Number,
        default: 0
    }
})
</script>


<template>
    <div class="h-screen flex flex-col">

        <TopBar />

        <div class="flex">
            <div
                class="hidden px-1 sm:flex sm:flex-col  h-screen w-[300px] bg-gray-200 shadow-sm shadow-slate-500 border border-r-2">
                <SideBar :activeMenu="activeMenu" />
            </div>
            <div class="h-screen w-full bg-gray-50">
                <!-- contents -->
                <slot></slot>
                <!-- contents - end -->
            </div>
        </div>

    </div>
    <!-- <FooterBlock /> -->
</template>

<style scoped></style>
