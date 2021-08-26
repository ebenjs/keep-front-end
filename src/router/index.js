import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NewNote from '../views/NewNote.vue';

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
