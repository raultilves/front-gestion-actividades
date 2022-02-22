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
    path: '/actividades-alumno/:modulo',
    name: 'ActividadesAlumno',
    component: () => import('../views/ActividadesAlumno.vue')
  },
  {
    path: '/actividades-profesor',
    name: 'ActividadesProfesor',
    component: () => import('../views/ActividadesProfesor.vue')
  },
  {
    path: '/actividad/:id',
    name: 'Actividad',
    component: () => import('../views/Actividad.vue')
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
