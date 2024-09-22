import createApp from './app.js'

import storageService from './service.storage.js'

const appConfig = {"apiKey":"AIzaSyAvx0VDCG8mgkS7PBUKM6GT_JUlLMz8GqE","authDomain":"bank-da882.firebaseapp.com","databaseURL":"https:\u002F\u002Fbank-da882-default-rtdb.firebaseio.com","projectId":"bank-da882","storageBucket":"bank-da882.appspot.com","messagingSenderId":"545632853297","appId":"1:545632853297:web:09823f02b050ac0a9ae410","measurementId":"G-2CW2MVXZPT"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      storageService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      storageService(session, firebase, ctx, inject),

    ]
  }

  const [
    storage
  ] = await Promise.all(servicePromises)

  const fire = {
    storage: storage
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}