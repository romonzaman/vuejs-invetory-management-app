<script setup>
import axios from 'axios'
import { useProfileStore } from '../stores/ProfileStore'
import { ref, computed, watch } from 'vue'

import UserLayout from '../components/UserLayout.vue'
// import BaseInput from '../components/BaseInput.vue'

const profileStore = useProfileStore()


document.title = "User Settings"

const calculate_age = (bdate) => {
    const now = new Date();
    const ageInMilliseconds = now - bdate;
    const ageDate = new Date(ageInMilliseconds);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    return years
}
//compute that get full name
const UserFullName = computed(() => {
    return `${profileStore.first_name} ${profileStore.last_name}`
})
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

const voter_status = ref("Voter")
const voter_color = ref('bg-red-800')
//Implement a watcher that monitors changes to the user's age. 
//When the age changes, automatically update the birth year and a message beside profile picture: 
//message would be like “eligible for voting”/ “not eligible for voting”
watch(UserAge, async (newValue) => {
    // alert("sdfslkjsl;kdj" + newValue)
    // const birthdate = new Date(newValue)
    // const years = calculate_age(birthdate)
    if (newValue >= 18) {
        voter_status.value = `Your are Voter`
        voter_color.value = 'border-green-800 text-green-800'
    } else {
        voter_status.value = `You does not have right to Vote.`
        voter_color.value = 'border-red-800 text-red-800'
    }

}, { immediate: true, deep: true })

const file = ref(null);

const show_upload = ref(false)
const show_loading = ref(false)

const uploadFile = (event) => {
    file.value = event.target.files[0]
    show_upload.value = true
};

const submitFile = async () => {
    const formData = new FormData();
    formData.append('file', file.value);
    show_loading.value = true
    show_upload.value = false
    try {
        const endpoint = "https://dt-bd.com:8001/upload";
        const response = await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(response.data);
        if (response.data.status) {
            profileStore.avatar_url = response.data.message
        }

    } catch (error) {
        console.error(error);
    }
    show_loading.value = false
    // };
};


</script>

<template>
    <UserLayout :activeMenu="0">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="md:w-3/4 p-10 md:h-screen">
                <h2 class="text-2xl mb-5">User Setting</h2>
                <div class="flex h-screen bg-white p-10">
                    <div class="w-1/2 flex flex-col justify-start items-start">
                        <div class="bg-white space-x-5 flex flex-col my-2">
                            <label for="first_name">First Name</label>
                            <input id="first_name" type="text" v-model="profileStore.first_name" label="First Name"
                                class="mt-2" />
                        </div>
                        <div class="bg-white space-x-5 flex flex-col my-2">
                            <label for="last_name">Last Name</label>
                            <input id="last_name" type="text" v-model="profileStore.last_name" label="Last Name"
                                class="mt-2" />
                        </div>
                        <div class="bg-white space-x-5  flex flex-col my-2 w-1/2">
                            <label for="email">Email</label>
                            <input id="email" type="email" v-model="profileStore.email" label="email" class="mt-2" />
                        </div>
                        <div class="bg-white space-x-5  flex flex-col my-2 w-1/2">
                            <label for="avatar">Avatar</label>
                            <div class="flex justify-between items-center space-x-5 w-full">
                                <img class="w-24 h-24 rounded-full" :src="profileStore.avatar_url" alt="avatar">
                                <span class="text-xl border  text-center" :class="voter_color">{{ voter_status
                                }}</span>
                            </div>

                            <div class="flex flex-col md:flex-row justify-between items-center w-full space-x-5 mt-5">
                                <input type="file" @change="uploadFile" />
                                <button class="bg-blue-800 text-white p-2 rounded-md space-x-5" @click="submitFile"
                                    v-if="show_upload">Upload</button>
                                <svg aria-hidden="true" v-if="show_loading"
                                    class="w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                            </div>
                            <!-- <span class="text-sm space-x-5">
                                {{ fileName }}
                                {{ fileExtension }}
                                {{ fileMimeType }}
                            </span> -->
                        </div>

                    </div>
                    <div class="w-1/2">
                        <div class="bg-white space-x-5 w-full">
                            <label for="birth_date">Birth Date</label>
                            <input id="birth_date" type="date" v-model="profileStore.birth_date" label="brith date"
                                class="mt-2" />
                        </div>
                        <div class="bg-white space-x-5 w-full flex flex-col items-start justify-start">
                            <label for="description">Description</label>
                            <textarea id="description" type="email" v-model="profileStore.description" label="description"
                                rows="20" cols="50" class="mt-2 w-full">
                            </textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="md:w-1/4 p-10 md:h-screen">
                <h2 class="text-2xl mb-10">User Stats</h2>
                <div class="flex flex-col justify-center items-center border-t-2 bg-white mt-1  pt-5 pb-5">
                    <span class="font-bold text-sm">{{ UserFullName }}</span>
                    <span class="text-xs">You are <b> {{ UserAge }} </b> years old</span>
                    <span>{{ isVoter }}</span>
                </div>
            </div>
        </div>

    </UserLayout>
</template>

<style scoped></style>
