// Configuración del frontend
// Reemplaza estas URLs con las URLs reales de tu API Gateway del Módulo 1

const CONFIG = {
  // URL del API Gateway para acortar URLs (POST /shorten)
  API_SHORTEN_URL: 'https://5wygjwk4kh.execute-api.us-east-1.amazonaws.com/shorten',
  
  // URL del API Gateway para obtener URLs originales (GET /{code})
  API_GET_URL: 'https://0dbebhkr66.execute-api.us-east-1.amazonaws.com/',
  
  // Tiempo de espera para la redirección (en milisegundos)
  REDIRECT_DELAY: 5000,
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
