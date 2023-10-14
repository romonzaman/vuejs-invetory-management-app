<script setup>
// import { useAuthStore } from '../stores/AuthStore'
import { useProfileStore } from '../stores/ProfileStore'
import { ref, computed, watch } from 'vue'

defineProps({
    activeMenu: {
        type: Number,
        default: 0
    }
})

// const authStore = useAuthStore()
const profileStore = useProfileStore()

const menu_items = [
    {
        title: 'Profile',
        url: '/profile',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>`
    },
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

const calculate_age = (bdate) => {
    const now = new Date();
    const ageInMilliseconds = now - bdate;
    const ageDate = new Date(ageInMilliseconds);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    return years
}

//Create a computed property that calculates the user's birth year based on their age. 
//Display this birth year on the profile page.
const UserAge = computed(() => {
    const birthdate = new Date(profileStore.birth_date)
    const years = calculate_age(birthdate)
    return years
})

//Create another computed property that checks if the user is of legal age (18) for election. 
//Display a message indicating whether the user can legally have the right to vote.
const isVoter = computed(() => {
    const birthdate = new Date(profileStore.birth_date)
    const years = calculate_age(birthdate)
    if (years >= 18) {
        return `Your are Voter`
    }
    return `You does not have right to Vote.`
})

</script>

<template>
    <div>
        <div class="hidden sm:flex flex-col justify-center items-center border-t-2 bg-white mt-1  pt-5 pb-5">
            <span class="font-bold text-sm">Mohammad Kamruzzaman</span>
            <span class="text-xs">You are <b> {{ UserAge }} </b> years old</span>
            <span>{{ isVoter }}</span>
        </div>
        <div class="hidden sm:flex flex-col border-t-2 bg-white mt-1  pt-5 pb-32">
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
