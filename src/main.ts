import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

const app = createApp(App)

type Event = {
  message: string
}

const emitter: Emitter<Event> = mitt()

const http = axios.create({
  baseURL: 'http://localhost:8055',
  timeout: 10000,
})

http.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer swfrJC2iTqlIXuTOy12AlwRJZTa6SDuo`
    return config
  },
  (error) => Promise.reject(error),
)

app.provide('emitter', emitter)
app.provide('http', http)

app.use(router)

app.mount('#app')
