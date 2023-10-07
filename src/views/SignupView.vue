<script setup>

import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import axios from '../axios';
import userVuelidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import BaseInput from '../components/BaseInput.vue'

document.title = "Signup | Dialer"

const router = useRouter()

const api_url = '/signup'

const isLoading = ref(false)
let form_data = reactive({
  email: '',
  password: '',
  confirm_password: '',
})

const rules = {
  email: { required, email },
  password: { required },
  confirm_password: {
    required,
    sameAsPassword: sameAs('password')
  }
}
const v$ = userVuelidate(rules, form_data)


const formSubmit = async () => {

  const validateResult = await v$.value.$validate()
  if (!validateResult) {
    console.log('Invalid')
    return false
  }

  console.log("formSubmit")
  console.log(api_url, form_data)
  isLoading.value = true
  try {

    const response = await axios.post(api_url, form_data)
    console.log(response.status)
    isLoading.value = true
    router.push({ name: "dashboard" })

  } catch (error) {

    console.log(error.response.status, error.response.statusText)
    // console.error(error)
    isLoading.value = true
  }
}


</script>

<template>
  <div class="w-full  h-screen flex">
    <div class="hidden md:flex md:w-1/2 md:justify-center md:bg-white">
      <img src="/login_sideimg.jpeg" alt="">
    </div>
    <div class="w-full md:w-1/2 bg-white flex flex-col justify-center items-center relative">
      <!-- {{ form_data }} -->
      <div
        class="absolute top-1/2 left-2/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob">
      </div>
      <div
        class="absolute top-1/2 right-2/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob">
      </div>
      <div
        class="absolute bottom-1/2 left-2/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob">
      </div>

      <div class="flex justify-center items-center">
        <img class="w-10 h-auto m-5" src="/img/logo_lwmk.png" alt="Logo">
        <span>MyDialer</span>
      </div>
      <div
        class="relative mt-7 bg-gray-50 border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="p-4 sm:p-7 opacityx-0">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <RouterLink class="text-blue-600 decoration-2 hover:underline font-medium" to="/login">Sign in here
              </RouterLink>
            </p>
          </div>

          <div class="mt-5 opacityx-0">

            <!-- Form -->
            <form @submit.prevent="formSubmit()">
              <div class="grid gap-y-4">

                <BaseInput id="email" type="email" v-model="form_data.email" :errors="v$.email.$errors"
                  label="Email address" class="mt-2" />

                <BaseInput id="password" type="password" v-model="form_data.password" :errors="v$.password.$errors"
                  label="Password" class="mt-2" />

                <BaseInput id="confirm_password" type="password" v-model="form_data.confirm_password"
                  :errors="v$.confirm_password.$errors" label="Confirm Password" class="mt-2" />

                <!-- Checkbox -->
                <div class="flex items-center mt-4">
                  <div class="flex">
                    <input id="accept_terms" name="accept_terms" type="checkbox" required
                      class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600  focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                  </div>
                  <div class="ml-3">
                    <label for="accept_terms" class="text-sm dark:text-white">I accept the <a
                        class="text-blue-600 decoration-2 hover:underline font-medium" href="#">Terms and
                        Conditions</a></label>
                  </div>
                </div>
                <!-- End Checkbox -->

                <button type="submit"
                  class="
                      mt-5 py-3 px-4 
                      inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign
                  up</button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style></style>