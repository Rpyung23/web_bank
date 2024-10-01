// middleware/removeCookie.js
export default function ({ route }) {
  if (process.client) {
    console.log("Middleware: Running on the client side");

    // Guardamos un flag en sessionStorage cuando la página está cargada
    window.addEventListener('beforeunload', function () {
      sessionStorage.setItem('isRefresh', 'true');
    });

    // Detectar el cierre de la pestaña
    window.addEventListener('unload', function () {
      if (sessionStorage.getItem('isRefresh') === null) {
        // Si no se ha refrescado, eliminamos las cookies
        eliminarCookie('jwtBancaWeb');
        eliminarCookie('jwtBancaWebPagoFacil');
      }
      // Limpiar el flag de sessionStorage
      sessionStorage.removeItem('isRefresh');
    });
  } else {
    console.error("Middleware: This code is running on the server side");
  }
}

// Función para eliminar cookies
function eliminarCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}