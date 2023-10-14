// import axios from "../axios"
import { defineStore } from "pinia"

export const useProfileStore = defineStore("profile", {
  state: () => ({
    first_name: "Mohammad",
    last_name: "Kamruzzaman",
    avatar_url: "",
    birth_date: "15/09/1979",
    email: "romon.zaman@gmail.com",
    description: `For the past few years, I have been employed as a VoIP engineer and have aided numerous businesses with their customer acquisition, customer support, and overall communication through my services, including system design, setup, customisation, and maintenance. Communication is an essential element in any business, and my expertise can assist in constructing a dependable communication tool for your company.

My primary areas of expertise are:

- FreeSWITCH
- Kamailio, OpenSIPS
- Programming languages such as Python, Lua, PHP
- Database management using PostgreSQL and MySQL
- Server administration, Docker, and AWS.

Thank you,
Mohammad Kamruzzaman`
  }),
  persist: true,
  getters: {
    GetProfileName(state) {
      return `${this.first_name} ${this.last_name}`
    },
    getAge(state) {
      return 0
    },
    isVoter(state) {
      return true
    },
  },
  actions: {
  },
})
