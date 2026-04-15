import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthLayoutPages from '@/layouts/AuthLayoutPages/index.js'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardLayoutPages from '@/layouts/DashboardLayoutPages/index.js'

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: AuthLayout,
    name: 'Authentication',
    children: [
      {
        path: '/login',
        name: 'Login',
        component: AuthLayoutPages.Login
      },
      {
        path: '/logout',
        name: 'Logout',
        component: AuthLayoutPages.Logout
      },
      // {
      //   path: '/lock',
      //   name: 'Lock',
      //   component: AuthLayoutPages.Lock
      // }
    ]
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'visao-geral',
        name: 'Visão geral',
        components: { default: DashboardLayoutPages.Overview },
        meta: { requiresAuth: true }
      },
      {
        path: 'pessoas',
        name: 'Pesssoas',
        components: { default: DashboardLayoutPages.People },
        meta: { requiresAuth: true }
      },
      {
        path: 'companhias',
        name: 'Companhias',
        components: { default: DashboardLayoutPages.Companies },
        meta: { requiresAuth: true }
      },
      {
        path: 'teatros',
        name: 'Teatros',
        components: { default: DashboardLayoutPages.Theaters },
        meta: { requiresAuth: true }
      },
      {
        path: 'pecas',
        name: 'Peças',
        components: { default: DashboardLayoutPages.Plays },
        meta: { requiresAuth: true }
      },
      {
        path: 'listas',
        name: 'Listas',
        components: { default: DashboardLayoutPages.Lists },
        meta: { requiresAuth: true }
      },
      {
        path: 'administradores',
        name: 'Administradores',
        components: { default: DashboardLayoutPages.Admins },
        meta: { requiresAuth: true }
      },
      {
        path: "paginas",
        namn: "Páginas",
        components: { default: DashboardLayoutPages.Pages },
        meta: { requiresAuth: true }
      },
      {
        path: "/pagina/:pageId",
        namn: "Página",
        components: { default: DashboardLayoutPages.PageEdit },
        meta: { requiresAuth: true }
      },
      {
        path: "/patrocinadores",
        name: "Patrocinadores",
        components: { default: DashboardLayoutPages.Sponsors },
        meta: { requiresAuth: true }
      },
      {
        path: '/pessoa/:pessoaId',
        name: 'Pessoa',
        components: { default: DashboardLayoutPages.Person },
        meta: { requiresAuth: true }
      },
      {
        path: '/teatro/:teatroId',
        name: 'Teatro',
        components: { default: DashboardLayoutPages.Theater },
        meta: { requiresAuth: true }
      },
      {
        path: '/companhia/:companhiaId',
        name: 'Companhia',
        components: { default: DashboardLayoutPages.Company },
        meta: { requiresAuth: true }
      },
      {
        path: '/peca/:pecaId',
        name: 'Peça',
        components: { default: DashboardLayoutPages.Play },
        meta: { requiresAuth: true }
      },
      {
        path: '/montagem/:montagemId',
        name: 'Montagem',
        components: { default: DashboardLayoutPages.Setting },
        meta: { requiresAuth: true }
      },
      {
        path: '/lista/:listaNome',
        name: 'Lista',
        components: { default: DashboardLayoutPages.List },
        meta: { requiresAuth: true }
      },
      {
        path: '/novo/teatro',
        name: 'Novo Teatro',
        components: { default: DashboardLayoutPages.NewTheater },
        meta: { requiresAuth: true }
      },
      {
        path: '/novo/pessoa',
        name: 'Nova Pessoa',
        components: { default: DashboardLayoutPages.NewPerson },
        meta: { requiresAuth: true }
      },
      {
        path: '/novo/companhia',
        name: 'Nova Companhia',
        components: { default: DashboardLayoutPages.NewCompany },
        meta: { requiresAuth: true }
      },
      {
        path: '/novo/peca',
        name: 'Nova Peça',
        components: { default: DashboardLayoutPages.NewPlay },
        meta: { requiresAuth: true }
      }
    ]
  }
];

export default routes
