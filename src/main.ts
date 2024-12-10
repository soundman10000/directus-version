import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

const http = axios.create({
  baseURL: 'http://localhost:8055',
  timeout: 10000,
})

app.provide('http', http)

app.use(router)

app.mount('#app')
