// middleware/removeCookie.js
export default function ({ route }) {
    if (process.client) {
      window.addEventListener('beforeunload', function () {
        eliminarCookie('jwtBancaWeb');
        eliminarCookie('jwtBancaWebPagoFacil');
      });
    }
  }
  
  function eliminarCookie(nombre) {
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  }