#!/bin/bash

# Configuración de colores para los mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Cargar el entorno de Node.js
log "Cargando entorno de Node.js..."
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Verificar que Node.js esté disponible
if ! command -v node &> /dev/null; then
    error "Node.js no está disponible en el sistema"
fi

# Cargar variables de entorno
log "Cargando variables de entorno..."
if [ ! -f .env.production ]; then
    error "No se encontró el archivo .env.production"
fi

set -a
source .env.production
set +a

# Verificar variables de entorno requeridas
required_vars=("APP_NAME" "APP_PATH" "APP_PORT" "APP_HOST")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        error "La variable $var no está definida en .env"
    fi
done

# Navegar al directorio de la aplicación
log "Navegando al directorio de la aplicación: $APP_PATH"
cd "$APP_PATH" || error "No se pudo acceder al directorio $APP_PATH"

# Verificar que el archivo de configuración de PM2 existe
if [ ! -f "$PM2_CONFIG_FILE" ]; then
    error "No se encontró el archivo de configuración de PM2: $PM2_CONFIG_FILE"
fi

# Verificar si la aplicación ya está corriendo
if command -v pm2 &> /dev/null && pm2 list | grep -q "$APP_NAME"; then
    log "Deteniendo instancia anterior de $APP_NAME..."
    pm2 delete "$APP_NAME" || error "No se pudo detener la instancia anterior"
fi

# Iniciar la aplicación con PM2
log "Iniciando la aplicación $APP_NAME..."
pm2 start "$PM2_CONFIG_FILE" --env production || error "No se pudo iniciar la aplicación"

# Configurar el watch solo para archivos de build
log "Configurando watch para archivos de build..."
pm2 restart "$APP_NAME" --update-env --watch dist --ignore-watch="node_modules .git .next"

# Verificar el estado de la aplicación
log "Verificando el estado de la aplicación..."
pm2 status

# Verificar que la aplicación esté respondiendo
log "Verificando que la aplicación esté respondiendo..."
sleep 5
if curl -s "http://$APP_HOST:$APP_PORT" > /dev/null; then
    log "La aplicación está disponible en http://$APP_HOST:$APP_PORT"
else
    error "La aplicación no está respondiendo en http://$APP_HOST:$APP_PORT"
fi

log "Aplicación iniciada correctamente con watch para archivos de build" 