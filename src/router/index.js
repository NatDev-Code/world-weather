import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '../views/HomeApp.vue'
import DetalleApp from '../views/DetalleApp.vue'

const routes = [
    { path : '/', name: 'Home', component: HomeApp },
    { path : '/detalle/:id', name: 'Detalle', component: DetalleApp },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router