import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomePage.vue'), name: 'home' },
  { path: '/registros', component: () => import('./views/RegistersPage.vue'), name: 'registers' }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})