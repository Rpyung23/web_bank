// plugins/cookies.js
export default ({ app }, inject) => {
    // Inyecta el token JWT en la aplicación
    inject('jwtBancaWeb', () => app.$cookies.get('jwtBancaWeb'));
  }