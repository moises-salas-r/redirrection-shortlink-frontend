// Configuración desde config.js
const API_URL = CONFIG.API_SHORTEN_URL;

// Elementos del DOM
const form = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrl');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const resultContainer = document.getElementById('resultContainer');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

// Manejar el envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const longUrl = longUrlInput.value.trim();
    
    if (!longUrl) {
        showError('Por favor ingresa una URL');
        return;
    }
    
    // Validar formato de URL
    try {
        new URL(longUrl);
    } catch {
        showError('Por favor ingresa una URL válida (ej: https://ejemplo.com)');
        return;
    }
    
    // Mostrar estado de carga
    setLoading(true);
    hideError();
    hideResult();
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al acortar la URL');
        }
        
        // Mostrar resultado exitoso
        showResult(data.shortUrl);
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Error al conectar con el servidor');
    } finally {
        setLoading(false);
    }
});

// Copiar al portapapeles
copyBtn.addEventListener('click', async () => {
    const shortUrl = shortUrlInput.value;
    
    try {
        await navigator.clipboard.writeText(shortUrl);
        
        // Cambiar texto del botón temporalmente
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copiado
        `;
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
        
    } catch (error) {
        console.error('Error al copiar:', error);
        // Fallback para navegadores antiguos
        shortUrlInput.select();
        document.execCommand('copy');
    }
});

// Funciones auxiliares
function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.style.display = loading ? 'none' : 'inline';
    btnLoading.style.display = loading ? 'inline' : 'none';
}

function showResult(shortUrl) {
    shortUrlInput.value = shortUrl;
    resultContainer.style.display = 'block';
}

function hideResult() {
    resultContainer.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
}

function hideError() {
    errorContainer.style.display = 'none';
}
