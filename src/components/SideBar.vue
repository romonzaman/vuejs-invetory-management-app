<script setup>
// import { useAuthStore } from '../stores/AuthStore'

defineProps({
    activeMenu: {
        type: Number,
        default: 0
    }
})

// const authStore = useAuthStore()

const menu_items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-purple-700">
  <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
</svg>
`
    },
    {
        title: 'Products',
        url: '/products',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-purple-700">
  <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
</svg>
`
    },

]

const active_class = 'cursor-default pt-2 pb-2  px-10 text-md bg-blue-300 text-white border-0'
const other_class = 'cursor-pointer py-1 px-10 text-md border-b-2  hover:text-gray-900 hover:border-blue-300 text-black'

</script>

<template>
    <div>
        <div class="hidden sm:flex flex-col border-t-2 bg-white mt-1  pt-10 pb-32">
            <RouterLink v-for="item, index of menu_items" :key="index" class="" :to="item.url"
                :class="activeMenu == index ? active_class : other_class">
                <div class="flex space-x-2">
                    <div v-html="item.icon"></div>
                    <div>{{ item.title }}</div>
                </div>
            </RouterLink>
        </div>

        <div class="hidden  p-2 text-sm bg-gray-300 text-white sm:flex justify-center items-center">
            <span>V 1.0</span>
        </div>
    </div>
</template>

<style scoped></style>
