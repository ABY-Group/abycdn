# Widget de Protección de Datos

Este widget permite mostrar información (en formato Markdown) sobre Protección de Datos de forma dinámica, con un botón flotante que el usuario puede abrir y cerrar. Además, admite la sustitución de enlaces dinámicos para distintas rutas (p. ej., `routePrivacy`, `routeTerms`) definidas en la configuración.

## Características Principales

* **Carga de contenido en Markdown**: a partir de una URL (`contentURL`).
* **Sustitución dinámica de enlaces**: si en el Markdown aparecen enlaces como `(routePrivacy)`, se reemplazan por la URL real definida en la configuración.
* **Estilos personalizables**: colores del botón, del texto, de los enlaces, etc., se definen en `window.infoWidgetConfig`.
* **Auto-cierre**: el widget se cierra automáticamente después de un tiempo (configurable).
* **Hover**: cuando el ratón pasa por encima del widget, se detiene el temporizador de cierre.
* **Uso de la librería `marked`**: se carga dinámicamente si no está presente.

## Guía Rápida de Uso

1. **Descarga o incluye el script**
   Asegúrate de tener el archivo `info-widget.js` en tu proyecto o enlazarlo desde un CDN.

3. **Configura**
  `window.infoWidgetConfig`
En tu archivo HTML, antes de cargar el script, define un objeto con las opciones:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Sitio con Widget de Protección de Datos</title>
</head>
<body>
  <!-- Contenido de la página -->

  <!-- Configuración del widget al final de la pagina -->
<script>
  window.infoWidgetConfig = {
    // Posición del botón flotante
    buttonPosition: 'bottom-left',   // 'bottom-left', 'bottom-right', 'top-left', 'top-right'

    // Lado por el que se abre el widget
    menuSide: 'left',                // 'left' o 'right'

    // Colores personalizados
    buttonColor: '#28a745',
    buttonIconColor: '#ffffff',
    widgetBackgroundColor: '#ffffff',
    widgetTitleColor: '#28a745',
    widgetTextColor: '#000000',
    widgetLinkColor: '#28a745',

    // Tiempo (ms) para cerrar el widget automáticamente
    hideTimeout: 5000,

    // Nombre de la marca
    brandName: 'Mi Empresa',

    // Definición de enlaces dinámicos
    links: [
      {
        // Si en el .md pones (routePrivacy), se inyecta la URL:
        routePrivacy: 'https://mimejortarifa.com/privacidad.html'
      },
      {
        // Si en el .md pones (routeTerms), se inyecta la URL:
        routeTerms: 'https://mimejortarifa.com/terms.html'
      }
    ],

    // URL a un archivo .md
    contentURL: 'https://raw.githubusercontent.com/ABY-Group/abycdn/refs/heads/main/content/data-protection.md'
  };
</script>
  <!-- Carga del widget desde el CDN -->
  <script src="https://aby-group.github.io/abycdn/info-widget.js"></script>
</body>
</html>
```
3. **Incluye el script del widget**
  Justo antes de cerrar la etiqueta 
   `<script src="https://aby-group.github.io/abycdn/info-widget.js"></script>`

4. **Prepara tu archivo Markdown**
> los archivos md estan ubicados en 'https://github.com/ABY-Group/abycdn/content' puedes crear otro y referenciarlo en el script si necesitas cambiar los textos o el contenido por ejemplo, (`info.md`)Puedes usar enlaces dinámicos de esta forma:

```md
### Responsable
Info básica sobre protección de datos.

Más información en [Política de Privacidad](routePrivacy).

### Términos y Condiciones
Revisa nuestros [Términos de Servicio](routeTerms).
```

Cuando se cargue, `(routePrivacy)` y `(routeTerms)` se sustituirán por la URL definida en `links`.

5. **Verifica la consola del navegador**
  Si se produce un error al cargar el `.md`, verás un mensaje en la consola. El script muestra logs como `"[Widget] Fetching MD from: ..."` y `"[Widget] Markdown cargado, longitud: X"` para que puedas depurar.


## Opciones de Configuración (Resumen)

| Opción                     | Tipo      | Descripción                                                                                                                            | Valor por Defecto                         | Opcional |
|----------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|----------|
| `buttonPosition`           | `string` | Posición del botón flotante.                                                                                                           | `bottom-left`                             | ❌        |
| `menuSide`                 | `string` | Lado desde el cual se abre el widget (`left` o `right`).                                                                               | `left`                                    | ✅        |
| `buttonColor`              | `string` | Color del botón flotante.                                                                                                              | `#007bff`                                | ✅        |
| `buttonIconColor`          | `string` | Color del ícono en el botón.                                                                                                           | `#ffffff`                                | ✅        |
| `widgetBackgroundColor`    | `string` | Color de fondo del widget.                                                                                                             | `#fefefe`                                | ✅        |
| `widgetTitleColor`         | `string` | Color de los títulos del widget.                                                                                                       | `#333333`                                | ✅        |
| `widgetTextColor`          | `string` | Color del texto general.                                                                                                               | `#000000`                                | ✅        |
| `widgetLinkColor`          | `string` | Color de los enlaces.                                                                                                                  | `#007bff`                                | ✅        |
| `hideTimeout`              | `number` | Tiempo en ms para que se cierre automáticamente el widget. Si se pone `0` o valor negativo, se desactiva el auto-cierre.               | `5000`                                   | ✅        |
| `brandName`                | `string` | Nombre de la marca o responsable que se muestra en el contenido por defecto si no se define `contentURL`.                              | `"Tu Marca"`                              | ✅        |
| `links`                    | `Array`  | Array de objetos con pares `{ palabraClave: "URL" }` para sustituir los enlaces dinámicos en el Markdown.                             | `[]` (vacío)                              | ❌        |
| `contentURL`               | `string` | Ruta a un archivo Markdown (`.md` o `.mdx`). Puede ser una URL remota o local (requiere un servidor).                                  | `""` (vacío)                              | ✅        |

🔹 **Notas**:
- ❌ `buttonPosition` es **obligatorio** ya que determina la ubicación del botón flotante.
- ❌ `links` deberia configurarse dependiendo la pagina donde este
- ✅ Todos los demás parámetros son **opcionales** y tienen valores por defecto si no se definen.


## Posibles Problemas y Soluciones

1. **El contenido se queda en "Cargando información..."**
   * Comprueba la consola del navegador (`F12 > Console`).
   * Si hay un error de tipo `CORS` o `404`, revisa la ruta del archivo `.md`.
   * Asegúrate de servir el `.md` mediante un servidor (no solo abriendo el archivo con `file://`).

2. **`Uncaught TypeError: window.marked is not a function`**
   * En las versiones recientes, `marked` puede exportar la función de forma distinta. El script actual verifica si existe `marked.parse()`.
   * Si tu CDN o versión de `marked` es muy antigua o muy reciente, ajusta la llamada (ver código en el script).

3. **Los enlaces dinámicos no se sustituyen**
   * Asegúrate de usar la sintaxis `[Texto](routePrivacy)` en tu .md y en la config haber definido `{ routePrivacy: 'URL' }`.
   * Verifica la consola para confirmar que el script hace la sustitución (`replaceDynamicLinks()`).

4. **El widget se cierra demasiado pronto o nunca se cierra**
   * Ajusta `hideTimeout` en la configuración. Un valor de `5000` significa 5 segundos.
   * Si pones `0`, el auto-cierre quedará desactivado.

5. **Formato del contenido**
   * El script incluye estilos básicos para títulos (`h1` a `h6`), párrafos y enlaces. Puedes editar la sección del CSS para personalizar tamaños, fuentes, márgenes, etc.
