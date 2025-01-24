import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomePage.vue'), name: 'home' },
  { path: '/registros', component: () => import('./views/RegistersPage.vue'), name: 'registers' },
  { path: '/recordatorios', component: () => import('./views/RemindersPage.vue'), name: 'reminders' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})