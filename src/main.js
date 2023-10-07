// import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
import piniaPluginPersistestate from "pinia-plugin-persistedstate"

import App from './App.vue'
import router from './router'
import "./axios"


const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
pinia.use(piniaPluginPersistestate)

app.use(pinia)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable)

app.mount('#app')
