```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Sitio con Widget de Protección de Datos</title>
</head>
<body>
  <!-- Contenido de la página -->

  <!-- Configuración del widget -->
  <script>
    window.infoWidgetConfig = {
      buttonPosition: 'bottom-left',    // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
      menuSide: 'left',                 // 'left' o 'right'
      buttonColor: '#28a745',           // Color de fondo del botón
      buttonIconColor: '#ffffff',       // Color del icono del botón
      widgetBackgroundColor: '#ffffff', // Color de fondo del widget
      widgetTitleColor: '#333333',      // Color de los títulos
      widgetTextColor: '#000000',       // Color del texto general
      widgetLinkColor: '#007bff',       // Color de los enlaces
      customDomain: 'https://tudominio.com',  // Dominio personalizado para los enlaces
      hideTimeout: 5000,                // Tiempo (ms) para ocultar el widget automáticamente
      brandName: 'Mi Empresa',          // Nombre de la marca
      // Opcional: URL del archivo Markdown (.md o .mdx) con el contenido del widget
      // contentURL: 'https://raw.githubusercontent.com/usuario/repositorio/main/contenido.md'
    };
  </script>

  <!-- Carga del widget desde el CDN -->
  <script src="https://jcenlo.github.io/cdn/widget-proteccion-datos.js"></script>
</body>
</html>
```
