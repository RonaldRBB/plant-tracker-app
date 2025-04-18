#!/bin/bash

# Navegar al directorio de la aplicación
cd /media/r/data/prog/personal/plant-tracker-app

# Detener cualquier instancia anterior de la aplicación
pm2 stop plant-tracker-app || true

# Iniciar la aplicación con PM2
pm2 start ecosystem.config.js

echo "Aplicación iniciada correctamente"
echo "La aplicación está disponible en http://localhost" 