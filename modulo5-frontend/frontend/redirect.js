// Configuración - Reemplazar con la URL del API Gateway del Módulo 1
// Nota: Necesitas tener un endpoint GET /{code} en el Módulo 1 para obtener la URL original
const API_URL = 'https://0dbebhkr66.execute-api.us-east-1.amazonaws.com/';

// Obtener el código corto de la URL
// La URL debe ser: /redirect.html?code=ABC123 o /short/ABC123
function getShortCode() {
    const params = new URLSearchParams(window.location.search);
    const codeFromQuery = params.get('code');
    
    if (codeFromQuery) {
        return codeFromQuery;
    }
    
    // Intentar obtener de la ruta (ej: /short/ABC123)
    const pathParts = window.location.pathname.split('/');
    const shortIndex = pathParts.indexOf('short');
    
    if (shortIndex !== -1 && shortIndex + 1 < pathParts.length) {
        return pathParts[shortIndex + 1];
    }
    
    return null;
}

// Mostrar página de error
function showErrorPage() {
    document.body.innerHTML = `
        <div class="error-page">
            <div class="error-banner">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>El enlace acortado no existe o ha expirado.</p>
                <a href="/" class="btn-home">Volver al inicio</a>
            </div>
        </div>
    `;
}

// Redireccionar después de 5 segundos
async function redirect() {
    const shortCode = getShortCode();
    
    if (!shortCode) {
        showErrorPage();
        return;
    }
    
    try {
        // Esperar 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Obtener la URL original del backend
        // Nota: Este endpoint debe existir en el Módulo 1
        const response = await fetch(`${API_URL}/${shortCode}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('Código no encontrado');
        }
        
        const data = await response.json();
        
        if (data.longUrl) {
            window.location.href = data.longUrl;
        } else {
            showErrorPage();
        }
        
    } catch (error) {
        console.error('Error al redireccionar:', error);
        showErrorPage();
    }
}

// Iniciar redirección
redirect();
