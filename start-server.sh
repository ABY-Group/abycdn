#!/bin/bash

echo "🚀 Iniciando servidor local en http://localhost:8000"
echo "📂 Abriendo navegador..."
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""

# Abrir navegador después de un segundo
(sleep 1 && open http://localhost:8000/index.html) &

# Iniciar servidor
python3 -m http.server 8000

