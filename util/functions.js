// Function to extract the date part from a datetime string
export function  extraerFechaString(fechaHora) {
    // Split the string by space to get only the date part
    let partes = fechaHora.split(' ');

    // Take the first part which contains the date in the format "YYYY-MM-DD"
    let fecha = partes[0];

    return fecha;
}

// Function to get the current date and time formatted as "dd MMM yyyy | HH:mm"
export function  ultimateConn() {
    let now = new Date();

    // Format the date as "dd MMM yyyy"
    let optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
    let formattedDate = now.toLocaleDateString('en-US', optionsDate);

    // Format the time as "HH:mm"
    let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    let formattedTime = now.toLocaleTimeString('en-US', optionsTime);

    // Combine the date and time into a single format
    let formattedDateTime = `${formattedDate} | ${formattedTime}`;

    return formattedDateTime;
}

// Function to get the last 7 characters of a string
export function  obtenerUltimosDigitos(cadena) {
    if (cadena.length >= 7) {
        return "XXX XX "+cadena.substring(cadena.length - 7);
    } else {
        return cadena;
    }
}

// Function to validate an email address
export function  isValidEmail(email) {
    // Regular expression to validate an email address
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Returns true if the email matches the regular expression
    return emailRegex.test(email);
}

// Function to format a number to two decimal places
export function  formatNumber(number) {
    try {
        if (number < 0) {
            return '0.00';
        }
        // Format the number to two decimal places
        return number.toFixed(2);
    } catch (e) {
        console.error(e.toString());
        return '0.00';
    }
}

export function eliminarcaractExpecial(cadena){
    return cadena.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s-']/g, '');
}

export function setupInactivityTimer($cookies, $router) {
    let inactivityTimer;
    const TIMEOUT = 3 * 60 * 1000; // 3 minutos en milisegundos
  
    function resetInactivityTimer() {
      console.log('Reset inactivity timer');
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        const currentPath = $router.currentRoute.path;
        console.log('Inactivity timeout reached');
        console.log('Current path:', currentPath);
  
        // Redirige solo si no estamos en la URL base, en login o en register
        if (currentPath !== '/' && currentPath !== '/error' && currentPath !== '/create') {
          console.log('Redirecting to /login due to inactivity');
          $cookies.remove('jwtBancaWeb'); // Elimina el JWT
          $cookies.remove('jwtBancaWebPagoFacil'); // Elimina el JWT
          $router.push('/'); // Redirige al login
        } else {
          console.log('No redirection needed');
        }
      }, TIMEOUT);
    }
  
    // Agregar eventos de actividad del usuario
    const events = ['click', 'mousemove', 'keydown', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    console.log('Event listeners added:', events);
  
    // Inicializar el temporizador cuando se carga la página
    resetInactivityTimer();
    console.log('Inactivity timer initialized');
  
    // Limpiar eventos cuando el componente se desmonte
    return () => {
      console.log('Cleaning up inactivity timer and event listeners');
      clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      console.log('Event listeners removed:', events);
    };
  }

export function isValidCreditCard(numeroTarjeta)
{
     // Eliminar espacios o guiones
  numeroTarjeta = numeroTarjeta.replace(/\D/g, '');

  // Comprobar que solo contenga dígitos y que tenga una longitud válida
  if (!/^\d+$/.test(numeroTarjeta) || numeroTarjeta.length < 13 || numeroTarjeta.length > 19) {
    return false;
  }

  let suma = 0;
  let alternar = false;

  // Recorrer los dígitos desde el final hacia el principio
  for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
    let digito = parseInt(numeroTarjeta[i]);

    // Duplicar cada segundo dígito
    if (alternar) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }

    // Sumar el dígito a la suma total
    suma += digito;

    // Alternar entre duplicar y no duplicar
    alternar = !alternar;
  }

  // Si la suma es divisible por 10, la tarjeta es válida
  return suma % 10 === 0;
} 
export function isUsernameValid(username) {
  var lengthValid = username.length >= 8 && username.length <= 14;
  var containsNumber = /[0-9]/.test(username);
  var containsLetter = /[A-Z]/.test(username) || /[a-z]/.test(username);

  return lengthValid && containsNumber && containsLetter;
}


export function isPasswordValid(password) {
  
  const lengthValid = password.length >= 8 && password.length <= 16;
  const containsNumber = /[0-9]/.test(password);
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsSpecialChar = /[_*?!@#\$\/(){}=.,:;]/.test(password);

  return lengthValid && containsNumber && containsUppercase && containsLowercase && containsSpecialChar;
}
