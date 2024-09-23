// middleware/auth.js

export default function ({ route, redirect, $cookies }) {
  try {
    // Obtén el token de las cookies
    const tokenData = $cookies.get("jwtBancaWeb");

    console.log(route.path)

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
