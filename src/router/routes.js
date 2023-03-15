import { useMainStore } from 'stores/main'
import { storeToRefs } from 'pinia'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    beforeEnter: (_, from) => {
      const mainStore = useMainStore()
      const { user } = storeToRefs(mainStore)
      if (from && !user.value) return false
    },
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    beforeEnter: () => {
      const mainStore = useMainStore()
      const { user } = storeToRefs(mainStore)
      if (user.value) return false
    },
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error.vue')
  }
]

export default routes
