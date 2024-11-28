export default ({ app }) => {
    if (process.client) {
      document.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Desactiva el clic derecho
      });
    }
  };