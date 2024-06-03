// eslint-disable-next-line no-unused-vars

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../pages/List.vue'),
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../components/list/Option.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'new',
    component: () => import('../pages/New.vue')
  },
  {
    path: '/list/:id',
    name: 'anime',
    component: () => import('../pages/Description.vue'),
    props: true,
    children: [
      {
        path: ':episode',
        name: 'episode',
        component: () => import('../pages/Episode.vue'),
        props: true
      },
      {
        path: ':yt',
        name: 'aaaa',
        component: () => import('../pages/Yt.vue'),
        props: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/PageNotFound.vue')
  }
]
