// middleware/removeCookie.js

// middleware/removeCookie.js
export default function ({ route }) {
  if (process.client) {
    // Guardamos un flag en sessionStorage cuando la página está cargada
    window.addEventListener('beforeunload', function () {
      sessionStorage.setItem('isRefresh', 'true');
    });

    window.addEventListener('unload', function () {
      if (sessionStorage.getItem('isRefresh') === null) {
        // Si no se ha refrescado, eliminamos las cookies
        eliminarCookie('jwtBancaWeb');
        eliminarCookie('jwtBancaWebPagoFacil');
      }
      // Limpiamos el flag de sessionStorage
      sessionStorage.removeItem('isRefresh');
    });
  }
}

function eliminarCookie(nombre) {
  document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
}
/*export default function ({ route }) {
    if (process.client) {
      window.addEventListener('beforeunload', function () {
        eliminarCookie('jwtBancaWeb');
        eliminarCookie('jwtBancaWebPagoFacil');
      });
    }
  }
  
  function eliminarCookie(nombre) {
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  }*/