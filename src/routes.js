import HomePage from './pages/HomePage.vue';
import TasksPage from './pages/TasksPage.vue';
import AboutPage from './pages/AboutPage.vue';

export default [
  { path: '/', component: HomePage },
  { path: '/tasks/', component: TasksPage },
  { path: '/about/', component: AboutPage },
];
