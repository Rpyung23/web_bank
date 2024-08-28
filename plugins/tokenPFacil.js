// plugins/cookies.js
export default ({ app }, inject) => {
    // Inyecta el token JWT en la aplicación
    inject('jwtBancaWebPagoFacil', () => app.$cookies.get('jwtBancaWebPagoFacil'));
  }
  