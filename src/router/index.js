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
        components: { default: DashboardLayoutPages.Overview }
      },
      {
        path: 'pessoas',
        name: 'Pesssoas',
        components: { default: DashboardLayoutPages.People }
      },
      {
        path: 'companhias',
        name: 'Companhias',
        components: { default: DashboardLayoutPages.Companies }
      },
      {
        path: 'teatros',
        name: 'Teatros',
        components: { default: DashboardLayoutPages.Theaters }
      },
      {
        path: 'pecas',
        name: 'Peças',
        components: { default: DashboardLayoutPages.Plays }
      },
      {
        path: 'listas',
        name: 'Listas',
        components: { default: DashboardLayoutPages.Lists }
      },
      {
        path: 'administradores',
        name: 'Administradores',
        components: { default: DashboardLayoutPages.Admins }
      },
      {
        path: "paginas",
        namn: "Páginas",
        components: { default: DashboardLayoutPages.Pages }
      },
      {
        path: "/pagina/:pageId",
        namn: "Página",
        components: { default: DashboardLayoutPages.PageEdit }
      },
      {
        path: "/patrocinadores",
        name: "Patrocinadores",
        components: { default: DashboardLayoutPages.Sponsors }
      },
      {
        path: '/pessoa/:pessoaId',
        name: 'Pessoa',
        components: { default: DashboardLayoutPages.Person },
      },
      {
        path: '/teatro/:teatroId',
        name: 'Teatro',
        components: { default: DashboardLayoutPages.Theater },
      },
      {
        path: '/companhia/:companhiaId',
        name: 'Companhia',
        components: { default: DashboardLayoutPages.Company },
      },
      {
        path: '/peca/:pecaId',
        name: 'Peça',
        components: { default: DashboardLayoutPages.Play },
      },
      {
        path: '/montagem/:montagemId',
        name: 'Montagem',
        components: { default: DashboardLayoutPages.Setting },
      },
      {
        path: '/lista/:listaNome',
        name: 'Lista',
        components: { default: DashboardLayoutPages.List },
      },
      {
        path: '/novo/teatro',
        name: 'Novo Teatro',
        components: { default: DashboardLayoutPages.NewTheater },
      },
      {
        path: '/novo/pessoa',
        name: 'Nova Pessoa',
        components: { default: DashboardLayoutPages.NewPerson },
      },
      {
        path: '/novo/companhia',
        name: 'Nova Companhia',
        components: { default: DashboardLayoutPages.NewCompany },
      },
      {
        path: '/novo/peca',
        name: 'Nova Peça',
        components: { default: DashboardLayoutPages.NewPlay },
      }
    ]
  }
];

export default routes
