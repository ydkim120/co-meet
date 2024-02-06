import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app-wrap',
    component: () => import('../views/AppWrap.vue'),
    redirect: { name: 'landing' },
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('../views/AppHome.vue'),
      },
      {
        path: 'chats',
        name: 'video-chats',
        component: () => import('../views/VideoChatMain.vue'),
      },
    ]
  },
  
]

export default createRouter({
  history: createWebHistory(),
  routes,
})