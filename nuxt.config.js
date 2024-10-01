const pkg = require("./package");
console.log("ENV", process.env.NODE_ENV);

module.exports = {
  server: {
    port: 3000, // Cambia este número al puerto que desees (por ejemplo, 3010)
    host: '0.0.0.0' // Esto permite que la aplicación sea accesible en la red local
  },

  router: {
    base: "/",
    linkExactActiveClass: "active",
    middleware: ['auth','remove'],
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "NIZAG LTDA",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Cooperativa De Ahorro Y Credito Nizag Ltda",
      },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity:
          "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous",
      },
    ],
    script: [
      {
        src: "https://unpkg.com/boxicons@2.1.2/dist/boxicons.js",
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#144c24" },

  /*
   ** Global CSS
   */
  css: ["assets/css/nucleo/css/nucleo.css", "assets/sass/argon.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    "~/plugins/token.js",
    "~/plugins/tokenPFacil.js",
    { src: "~/plugins/dashboard/full-calendar", ssr: false },
    { src: "~/plugins/dashboard/world-map", ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    ["@nuxtjs/firebase",
    {
      config: {
        apiKey: "AIzaSyAvx0VDCG8mgkS7PBUKM6GT_JUlLMz8GqE",
        authDomain: "bank-da882.firebaseapp.com",
        databaseURL: "https://bank-da882-default-rtdb.firebaseio.com",
        projectId: "bank-da882",
        storageBucket: "bank-da882.appspot.com",
        messagingSenderId: "545632853297",
        appId: "1:545632853297:web:09823f02b050ac0a9ae410",
        measurementId: "G-2CW2MVXZPT",
      },
      services: {
        storage: true, // Just as example. Can be any other service.
      },
    },]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    extractCSS: process.env.NODE_ENV === "production",
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },

  env: {
    baseUrl: "https://8f08ub5vwb.execute-api.us-east-2.amazonaws.com/prod",
    nameCoop: "Cooperativa De Ahorro Y Crédito Nizag Ltda",
    nameCoopCorto: "COOPERATIVA NIZAG LTDA",
    CLAVE_TOKEN: "B@NKserverECU@DoR2o24*_/",
  },
};
