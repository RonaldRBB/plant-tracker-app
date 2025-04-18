#!/bin/bash

# Cargar variables de entorno
set -a
source .env
set +a

# Navegar al directorio de la aplicación
cd $APP_PATH

# Verificar e instalar PM2 si es necesario
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2..."
    npm install -g pm2
    if [ $? -ne 0 ]; then
        echo "Error: No se pudo instalar PM2"
        exit 1
    fi
fi

# Detener cualquier instancia anterior de la aplicación
echo "Deteniendo instancias anteriores..."
pm2 delete $APP_NAME || true

# Iniciar la aplicación con PM2
echo "Iniciando la aplicación..."
pm2 start $PM2_CONFIG_FILE --env production

# Verificar el estado de la aplicación
echo "Verificando el estado de la aplicación..."
pm2 status

echo "Aplicación iniciada correctamente"
echo "La aplicación está disponible en http://$APP_HOST:$APP_PORT" 