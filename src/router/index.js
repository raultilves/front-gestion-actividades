import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/actividades',
    name: 'Actividades',
    component: () => import('../views/Actividades.vue')
  },
  {
    path: '/modulos',
    name: 'Modulos',
    component: () => import('../views/Modulos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
