<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">

      <sidebar-item
          :link="{
            name: 'Mis Cuentas',
            icon: 'ni ni-shop text-success',
            path: '/dashboard'
          }">
      </sidebar-item>

      <sidebar-item
          :link="{
            name: 'Tranferencias',
            icon: 'ni ni-money-coins text-success',
            path: '/transferencia'
          }">
      </sidebar-item>

      <sidebar-item
          :link="{
            name: 'Tarjetas de Crédito',
            icon: 'ni ni-credit-card text-success',
            path: '/tcredito'
          }">
      </sidebar-item>

      <sidebar-item
          :link="{
            name: 'Mis Préstamos',
            icon: 'ni ni-active-40 text-success',
            path: '/prestamo'
          }">
      </sidebar-item>

      <sidebar-item
          :link="{
            name: 'Mis Inversiones',
            icon: 'ni ni-sound-wave text-success',
            path: '/inversion'
          }">
      </sidebar-item>

      <sidebar-item
          :link="{
            name: 'Servicios',
            icon: 'bx bx-coin text-success',
            path: '/servicio'
          }">
      </sidebar-item>


      <sidebar-item
          :link="{
            name: 'Contactos',
            icon: 'ni ni-single-02 text-success',
            path: '/contact'
          }">
      </sidebar-item>

      

      <sidebar-item
          :link="{
            name: 'Términos y condiciones',
            icon: 'ni ni-paper-diploma text-success',
            path: '/tercond'
          }">
      </sidebar-item>

        <!-- ITEM POR DEFECTO


        <sidebar-item
          :link="{
            name: 'Dashboards D',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item
            :link="{ name: 'Dashboard', path: '/dashboard'}"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Alternative', path: '/alternative' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{
                  name: 'Examples',
                  icon: 'ni ni-ungroup text-orange'
                  }">
          <sidebar-item :link="{ name: 'Pricing', path: '/pricing' }"/>
          <sidebar-item :link="{ name: 'Login', path: '/login' }"/>
          <sidebar-item :link="{ name: 'Register', path: '/register' }"/>
          <sidebar-item :link="{ name: 'Lock', path: '/lock' }"/>
          <sidebar-item :link="{ name: 'Timeline', path: '/pages/timeline' }"/>
          <sidebar-item :link="{ name: 'Profile', path: '/pages/user' }"/>


        </sidebar-item>

        <sidebar-item :link="{
                  name: 'Components',
                  icon: 'ni ni-ui-04 text-info'
                }">
          <sidebar-item :link="{ name: 'Buttons', path: '/components/buttons' }"/>
          <sidebar-item :link="{ name: 'Cards', path: '/components/cards' }"/>
          <sidebar-item :link="{ name: 'Grid', path: '/components/grid-system' }"/>
          <sidebar-item :link="{ name: 'Notifications', path: '/components/notifications' }"/>
          <sidebar-item :link="{ name: 'Icons', path: '/components/icons' }"/>
          <sidebar-item :link="{ name: 'Typography', path: '/components/typography' }"/>

          <sidebar-item :link="{ name: 'Multi Level' }">
            <sidebar-item :link="{ name: 'Third level menu', path:'#' }"/>
            <sidebar-item :link="{ name: 'Just another link', path:'#' }"/>
            <sidebar-item :link="{ name: 'One last link', path:'#' }"/>
          </sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{
                        name: 'Forms',
                        icon: 'ni ni-single-copy-04 text-pink'
                      }">
          <sidebar-item :link="{ name: 'Elements', path: '/forms/elements' }"/>
          <sidebar-item :link="{ name: 'Components', path: '/forms/components' }"/>
          <sidebar-item :link="{ name: 'Validation', path: '/forms/validation' }"/>
        </sidebar-item>

        <sidebar-item :link="{
                        name: 'Tables',
                        icon: 'ni ni-align-left-2 text-default'
                      }">
          <sidebar-item :link="{ name: 'Tables', path: '/tables/regular' }"/>
          <sidebar-item :link="{ name: 'Sortable', path: '/tables/sortable' }"/>
          <sidebar-item :link="{ name: 'Paginated Tables', path: '/tables/paginated' }"/>
        </sidebar-item>

        <sidebar-item :link="{
                        name: 'Maps',
                        icon: 'ni ni-map-big text-primary'
                      }">
          <sidebar-item :link="{ name: 'Google', path: '/maps/google' }"/>
          <sidebar-item :link="{ name: 'Vector', path: '/maps/vector' }"/>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'ni ni-archive-2 text-green',
            path: '/widgets'
          }">
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Charts',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/charts'
          }">
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/calendar'
          }">
        </sidebar-item> -->
      </template>

    

    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name === 'alternative' ? 'light': 'default'"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
  
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue';
  import ContentFooter from '~/components/layouts/argon/ContentFooter.vue';
  import DashboardContent from '~/components/layouts/argon/Content.vue';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('navbar-inner');
          initScrollbar('main-content');
          initScrollbar('sidenav');
        }
      }
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
</style>
