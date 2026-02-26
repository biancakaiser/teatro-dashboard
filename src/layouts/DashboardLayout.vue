<template>
  <div class="wrapper" :class="[{'nav-open': $sidebar.showSidebar}]">
    <notifications></notifications>
    <side-bar title='Administração' :auto-close='false' logo='/img/logo.png' background-image=''>
      <mobile-menu></mobile-menu>
      <template slot-scope="props" slot="links">
        <sidebar-item :link="{name: 'Visão geral', icon: 'timeline', path: '/visao-geral'}"></sidebar-item>
        <sidebar-item :link="{name: 'Teatros', icon: 'account_balance', path: '/teatros'}"></sidebar-item>
        <sidebar-item :link="{name: 'Pessoas', icon: 'person', path: '/pessoas'}"></sidebar-item>
        <sidebar-item :link="{name: 'Companhias', icon: 'group', path: '/companhias'}"></sidebar-item>
        <sidebar-item :link="{name: 'Peças', icon: 'movie', path: '/pecas'}"></sidebar-item>
        <sidebar-item :link="{name: 'Listas', icon: 'format_list_bulleted', path: '/listas'}"></sidebar-item>
        <sidebar-item :link="{name: 'Administradores', icon: 'build', path: '/administradores'}"></sidebar-item>
        <sidebar-item :link="{name: 'Páginas', icon: 'newspaper', path: '/paginas'}"></sidebar-item>
        <sidebar-item :link="{name: 'Patrocinadores', icon: 'volunteer_activism', path: '/patrocinadores'}"></sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <div :class="{content: !$route.meta.hideContent}" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
	import session from '@/api/session.vue'
  import PerfectScrollbar from 'perfect-scrollbar'
  import 'perfect-scrollbar/css/perfect-scrollbar.css'

  function hasElement (className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar (className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import TopNavbar from './DashboardLayoutComponents/TopNavbar.vue'
  import ContentFooter from './DashboardLayoutComponents/ContentFooter.vue'
  import DashboardContent from './DashboardLayoutComponents/Content.vue'
  import MobileMenu from './DashboardLayoutComponents/MobileMenu.vue'
  import UserMenu from './DashboardLayoutComponents/UserMenu.vue'
  import {SlideYDownTransition, ZoomCenterTransition} from 'vue2-transitions'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      UserMenu,
      SlideYDownTransition,
      ZoomCenterTransition
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    },
    mounted () {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar');
        initScrollbar('sidebar-wrapper');

        docClasses.add('perfect-scrollbar-on')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    },
    created() {
      // if(!session.isActive()) {
      //   this.$router.push('/login');
      // }
    }
  }

</script>

<style lang="scss">
  $scaleSize: .95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }
  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }
  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }
  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }

  .logo-img img {
    width: 80% !important;
    padding-bottom: 4px;
  }

  .sidebar .nav p {
    font-size: 1rem;
    color: white;
  }

  .sidebar .nav span {
    color: white;
  }

  .sidebar .md-icon.md-theme-default.md-icon-font {
    color: white!important;
  }

  // a.router-link-active > p, a.router-link-active > span {
  //   color: #335d7e!important;
  // }

</style>


