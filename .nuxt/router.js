import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _18048310 = () => interopDefault(import('..\\pages\\alternative.vue' /* webpackChunkName: "pages/alternative" */))
const _25819103 = () => interopDefault(import('..\\pages\\calendar.vue' /* webpackChunkName: "pages/calendar" */))
const _56b1fdda = () => interopDefault(import('..\\pages\\charts.vue' /* webpackChunkName: "pages/charts" */))
const _22be72c2 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _1436baf0 = () => interopDefault(import('..\\pages\\lock.vue' /* webpackChunkName: "pages/lock" */))
const _46350a74 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4ade58de = () => interopDefault(import('..\\pages\\pricing.vue' /* webpackChunkName: "pages/pricing" */))
const _5686ec30 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _06f3d91c = () => interopDefault(import('..\\pages\\transferencia.vue' /* webpackChunkName: "pages/transferencia" */))
const _47b885fa = () => interopDefault(import('..\\pages\\widgets.vue' /* webpackChunkName: "pages/widgets" */))
const _4db05e76 = () => interopDefault(import('..\\pages\\components\\buttons.vue' /* webpackChunkName: "pages/components/buttons" */))
const _62454ed0 = () => interopDefault(import('..\\pages\\components\\cards.vue' /* webpackChunkName: "pages/components/cards" */))
const _3e12e6ea = () => interopDefault(import('..\\pages\\components\\grid-system.vue' /* webpackChunkName: "pages/components/grid-system" */))
const _eacfde62 = () => interopDefault(import('..\\pages\\components\\icons.vue' /* webpackChunkName: "pages/components/icons" */))
const _c24162c6 = () => interopDefault(import('..\\pages\\components\\notifications.vue' /* webpackChunkName: "pages/components/notifications" */))
const _40305a4a = () => interopDefault(import('..\\pages\\components\\typography.vue' /* webpackChunkName: "pages/components/typography" */))
const _673064d0 = () => interopDefault(import('..\\pages\\forms\\components.vue' /* webpackChunkName: "pages/forms/components" */))
const _1460eab1 = () => interopDefault(import('..\\pages\\forms\\elements.vue' /* webpackChunkName: "pages/forms/elements" */))
const _03cbc0b3 = () => interopDefault(import('..\\pages\\forms\\validation.vue' /* webpackChunkName: "pages/forms/validation" */))
const _44fcb0d6 = () => interopDefault(import('..\\pages\\maps\\google.vue' /* webpackChunkName: "pages/maps/google" */))
const _3a1b959f = () => interopDefault(import('..\\pages\\maps\\vector.vue' /* webpackChunkName: "pages/maps/vector" */))
const _51bc43d0 = () => interopDefault(import('..\\pages\\pages\\timeline.vue' /* webpackChunkName: "pages/pages/timeline" */))
const _45a2d9da = () => interopDefault(import('..\\pages\\pages\\user.vue' /* webpackChunkName: "pages/pages/user" */))
const _c9c5525a = () => interopDefault(import('..\\pages\\tables\\paginated.vue' /* webpackChunkName: "pages/tables/paginated" */))
const _8a7730bc = () => interopDefault(import('..\\pages\\tables\\regular.vue' /* webpackChunkName: "pages/tables/regular" */))
const _182f2ce2 = () => interopDefault(import('..\\pages\\tables\\sortable.vue' /* webpackChunkName: "pages/tables/sortable" */))
const _7c8d675d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/alternative",
    component: _18048310,
    name: "alternative"
  }, {
    path: "/calendar",
    component: _25819103,
    name: "calendar"
  }, {
    path: "/charts",
    component: _56b1fdda,
    name: "charts"
  }, {
    path: "/dashboard",
    component: _22be72c2,
    name: "dashboard"
  }, {
    path: "/lock",
    component: _1436baf0,
    name: "lock"
  }, {
    path: "/login",
    component: _46350a74,
    name: "login"
  }, {
    path: "/pricing",
    component: _4ade58de,
    name: "pricing"
  }, {
    path: "/register",
    component: _5686ec30,
    name: "register"
  }, {
    path: "/transferencia",
    component: _06f3d91c,
    name: "transferencia"
  }, {
    path: "/widgets",
    component: _47b885fa,
    name: "widgets"
  }, {
    path: "/components/buttons",
    component: _4db05e76,
    name: "components-buttons"
  }, {
    path: "/components/cards",
    component: _62454ed0,
    name: "components-cards"
  }, {
    path: "/components/grid-system",
    component: _3e12e6ea,
    name: "components-grid-system"
  }, {
    path: "/components/icons",
    component: _eacfde62,
    name: "components-icons"
  }, {
    path: "/components/notifications",
    component: _c24162c6,
    name: "components-notifications"
  }, {
    path: "/components/typography",
    component: _40305a4a,
    name: "components-typography"
  }, {
    path: "/forms/components",
    component: _673064d0,
    name: "forms-components"
  }, {
    path: "/forms/elements",
    component: _1460eab1,
    name: "forms-elements"
  }, {
    path: "/forms/validation",
    component: _03cbc0b3,
    name: "forms-validation"
  }, {
    path: "/maps/google",
    component: _44fcb0d6,
    name: "maps-google"
  }, {
    path: "/maps/vector",
    component: _3a1b959f,
    name: "maps-vector"
  }, {
    path: "/pages/timeline",
    component: _51bc43d0,
    name: "pages-timeline"
  }, {
    path: "/pages/user",
    component: _45a2d9da,
    name: "pages-user"
  }, {
    path: "/tables/paginated",
    component: _c9c5525a,
    name: "tables-paginated"
  }, {
    path: "/tables/regular",
    component: _8a7730bc,
    name: "tables-regular"
  }, {
    path: "/tables/sortable",
    component: _182f2ce2,
    name: "tables-sortable"
  }, {
    path: "/",
    component: _7c8d675d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
