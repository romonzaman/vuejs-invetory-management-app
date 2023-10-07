import axios from "../axios"
import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    accessToken: null,
    refreshToken: "",
    authUser: {
      email: "",
      phonenumber: "",
      balance: 0.0,
    },
  }),
  persist: true,
  getters: {
    username(state) {
      return this.authUser.username
    },
    user(state) {
      return this.authUser
    },
    token(state) {
      return this.accessToken
    },
  },
  actions: {
    async handleLogin(form) {
      console.log(form)
      this.isLoading = true
      try {
        const response = await axios.post("/login", form)
        console.log(response.status)
        console.log(response.data)
        this.isLoading = false
        this.accessToken = response.data.token
        this.refreshToken = response.data.token

        this.authUser.username = form.email
        this.authUser.phonenumber = "+1 (786) 666-8610"
        this.authUser.balance = 99.01
        this.router.push({ name: "Dashboard" })
      } catch (error) {
        console.error(error)
        // console.log(error.response.status, error.response.statusText)
        this.isLoading = false
      }
    },
  },
})
