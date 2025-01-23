import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import VueApexCharts from 'vue3-apexcharts';
import './style.css'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueApexCharts)
  .mount('#app')
