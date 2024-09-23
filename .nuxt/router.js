import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ffbcca2a = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _3cd3cf01 = () => interopDefault(import('..\\pages\\create.vue' /* webpackChunkName: "pages/create" */))
const _22be72c2 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _6372f09e = () => interopDefault(import('..\\pages\\inversion.vue' /* webpackChunkName: "pages/inversion" */))
const _8151e778 = () => interopDefault(import('..\\pages\\prestamo.vue' /* webpackChunkName: "pages/prestamo" */))
const _ef6dd818 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _57a31a9b = () => interopDefault(import('..\\pages\\servicio.vue' /* webpackChunkName: "pages/servicio" */))
const _b4766532 = () => interopDefault(import('..\\pages\\tcredito.vue' /* webpackChunkName: "pages/tcredito" */))
const _3a0be40e = () => interopDefault(import('..\\pages\\tercond.vue' /* webpackChunkName: "pages/tercond" */))
const _06f3d91c = () => interopDefault(import('..\\pages\\transferencia.vue' /* webpackChunkName: "pages/transferencia" */))
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
    path: "/contact",
    component: _ffbcca2a,
    name: "contact"
  }, {
    path: "/create",
    component: _3cd3cf01,
    name: "create"
  }, {
    path: "/dashboard",
    component: _22be72c2,
    name: "dashboard"
  }, {
    path: "/inversion",
    component: _6372f09e,
    name: "inversion"
  }, {
    path: "/prestamo",
    component: _8151e778,
    name: "prestamo"
  }, {
    path: "/profile",
    component: _ef6dd818,
    name: "profile"
  }, {
    path: "/servicio",
    component: _57a31a9b,
    name: "servicio"
  }, {
    path: "/tcredito",
    component: _b4766532,
    name: "tcredito"
  }, {
    path: "/tercond",
    component: _3a0be40e,
    name: "tercond"
  }, {
    path: "/transferencia",
    component: _06f3d91c,
    name: "transferencia"
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
