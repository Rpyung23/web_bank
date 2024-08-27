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
