import './assets/main.css'
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import Vue3Toastify from 'vue3-toastify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig())
app.use(Vue3Toastify)

app.mount('#app')
