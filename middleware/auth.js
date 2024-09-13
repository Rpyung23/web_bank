// middleware/auth.js

export default function ({ route, redirect, $cookies }) {
  try {
    // Obtén el token de las cookies
    const tokenData = $cookies.get("jwtBancaWeb");

    // Si no hay token, redirige a /login
    if (!tokenData || typeof tokenData.token !== 'string' || tokenData.token.trim() === '') {
      return redirect("/login");
    }

    const token = tokenData.token;

    // Si la ruta es /login, /register o la raíz ("/"), elimina el token y redirige al dashboard
    if (route.path === "/login" || route.path === "/register" || route.path === "/") {
      $cookies.remove("jwtBancaWeb");
  
    } else {
      try {
        // Verifica la validez del token
        //jwt.verify(token, SECRET_KEY);
        console.log("Token válido");
      } catch (err) {
        console.error("Error al verificar el token:", err.message);
        // Si la verificación falla, redirige a /login
        return redirect("/login");
      }
    }
  } catch (error) {
    console.error("Error general:", error);
    return redirect("/login");
  }
}