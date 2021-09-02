import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NewNote from '../views/NewNote.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/newNote',
    name: 'newNote',
    component: NewNote,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
