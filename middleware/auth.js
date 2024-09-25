// middleware/auth.js
var jwt = require("jsonwebtoken");

export default function ({ route, redirect, $cookies }) 
{

    // Rutas públicas que no requieren autenticación
    const publicPaths = ["/login", "/register", "/"];
  
    // Si estamos en una ruta pública, no hacemos nada
    if (publicPaths.includes(route.path)) {
      return;
    }
  
    // Si estamos en el lado del servidor
    if (process.server) {
      const tokenData = $cookies.get("jwtBancaWeb");
  
      // Verifica si hay un token
      if (!tokenData || !tokenData.token) {
        console.error("Token no encontrado o inválido");
        return redirect("/");  // Redirigir a la página de inicio de sesión
      }
  
      try {
        // Verifica el token en el servidor
        jwt.verify(tokenData.token, process.env.CLAVE_TOKEN);
        console.log("Token válido en el servidor");
      } catch (err) {
        console.error("Token inválido o expirado en el servidor", err.message);
        return redirect("/");  // Redirigir a la página de inicio de sesión
      }
    } else {
      // Lado del cliente
      const tokenData = $cookies.get("jwtBancaWeb");
  
      if (!tokenData || !tokenData.token) {
        console.error("Token no encontrado o inválido en el cliente");
        return redirect("/");  // Redirigir a la página de inicio de sesión
      }
  
      try {
        // Decodifica el JWT manualmente para verificar expiración en el cliente
        const base64Url = tokenData.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(atob(base64)); // Esta línea solo funcionará en el cliente
  
        // Verifica la expiración del token
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          console.error("Token expirado en el cliente");
          return redirect("/");  // Redirigir a la página de inicio de sesión
        }
  
        console.log("Token válido en el cliente");
      } catch (error) {
        console.error("Error al procesar el token en el cliente:", error.message);
        return redirect("/");  // Redirigir a la página de inicio de sesión
      }
    }


  /*try {
    // Obtén el token de las cookies
    const tokenData = $cookies.get("jwtBancaWeb");

    if (!tokenData || !tokenData.token) {
      console.error("Token no encontrado en las cookies");
      return redirect("/");
    }

    console.log(route.path);

    if (
      route.path === "/login" ||
      route.path === "/create" ||
      route.path === "/register" ||
      route.path === "/"
    ) {
      $cookies.remove("jwtBancaWeb");
    } else {
      try {
        // Verifica la validez del token
        console.log(tokenData.token);
        console.log(process.env.CLAVE_TOKEN);
        //jwt.verify(tokenData.token, process.env.CLAVE_TOKEN);

        const base64Url = tokenData.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(atob(base64));

        // Verifica la expiración del token
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          console.error("Token expirado en el cliente");
          return redirect("/login"); // Redirigir a la página de inicio de sesión
        }

        console.log("Token válido");
      } catch (err) {
        console.error("Error al verificar el token:", err.message);
        // Si la verificación falla, redirige a /login
        return redirect("/");
      }
    }
  } catch (error) {
    console.error("Error general:", error);
    return redirect("/");
  }*/
}
