<script setup>

document.title = "Login | IMS"

import { reactive } from 'vue';

import userVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import BaseInput from '../components/BaseInput.vue'

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

let login_data = reactive({
  email: 'romon.zaman@gmail.com',
  password: '123456'
})

const rules = {
  email: { required, email },
  password: { required }
}
const v$ = userVuelidate(rules, login_data)


const loginSubmit = async () => {

  const validateResult = await v$.value.$validate()
  if (!validateResult) {
    console.log('Invalid')
    return false
  }
  console.log("loginSubmit")
  await authStore.handleLogin(login_data)
}

</script>

<template>
  <!-- <NavBlock :activeMenu="3" /> -->
  <div class="w-full  h-screen flex">
    <div class="hidden md:flex md:w-1/2 md:justify-center md:bg-white">
      <img src="/login_sideimg.jpeg" alt="">
    </div>
    <div class="w-full md:w-1/2 bg-white flex flex-col justify-center items-center relative">
      <div
        class="absolute top-10 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-10">
      </div>
      <div
        class="absolute top-10 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-10">
      </div>
      <div
        class="absolute bottom-10 -left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob z-10">
      </div>
      <div class="flex justify-center items-center z-50">
        <img class="w-10 h-auto m-5" src="/img/logo_lwmk.png" alt="Logo">
        <span>IMS</span>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700  z-50">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?
              <RouterLink class="text-blue-600 decoration-2 hover:underline font-medium" to="/signup">Sign up here
              </RouterLink>
            </p>
          </div>

          <div class="mt-10">

            <!-- Form -->
            <form>
              <div class="grid gap-y-4">

                <BaseInput id="email" type="email" v-model="login_data.email" :errors="v$.email.$errors"
                  label="Email address" class="mt-2" />

                <BaseInput id="password" type="password" v-model="login_data.password" :errors="v$.password.$errors"
                  label="Password" class="mt-4" />

                <div class="flex justify-end items-center">
                  <a class="text-sm text-blue-500 decoration-2 hover:underline font-medium"
                    href="../examples/html/recover-account.html">Forgot password?</a>
                </div>

                <!-- Checkbox -->
                <div class="flex items-center">
                  <div class="flex">
                    <input id="remember-me" name="remember-me" type="checkbox"
                      class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600  focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                  </div>
                  <div class="ml-3">
                    <label for="remember-me" class="text-sm dark:text-white">Remember me</label>
                  </div>
                </div>
                <!-- End Checkbox -->

                <button @click.prevent="loginSubmit()" type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign
                  in</button>
                <div role="status" class="flex justify-center items-center" v-if="authStore.isLoading">
                  <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <FooterBlock /> -->
</template>

<style>
.myapp {
  background-image: url('https://source.unsplash.com/random');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>