(function() {
  // Recuperamos la configuración global o usamos valores por defecto
  var config = window.infoWidgetConfig || {};

  // Opciones para el botón
  var buttonPos = config.buttonPosition || 'bottom-left'; // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
  var buttonColor = config.buttonColor || '#007bff';
  var buttonIconColor = config.buttonIconColor || '#ffffff';

  // Opciones para el widget
  var widgetBackgroundColor = config.widgetBackgroundColor || '#fefefe';
  var widgetTitleColor = config.widgetTitleColor || '#333333';
  var widgetTextColor = config.widgetTextColor || '#000000';
  var widgetLinkColor = config.widgetLinkColor || '#007bff';
  var customDomain = config.customDomain || 'https://mimejortarifa.com';
  var hideTimeout = config.hideTimeout || 5000;
  var brandName = config.brandName || 'Tu Marca';
  // URL opcional para cargar contenido en Markdown
  var contentURL = config.contentURL || '';

  // Determinar el lado del widget (para posicionar y rotar la flecha)
  var menuSide = config.menuSide || 'left'; // 'left' o 'right'

  // Mapas de estilos para el botón según la posición
  var buttonPositions = {
    'bottom-left': 'bottom: 80px; left: 20px;',
    'bottom-right': 'bottom: 80px; right: 20px;',
    'top-left': 'top: 20px; left: 20px;',
    'top-right': 'top: 20px; right: 20px;'
  };

  // Inyectamos el CSS personalizado (todos con prefijo "widget-")
  var css = `
    /* Widget CSS - evita conflictos con otros estilos */
    #widget-infoDataBox {
      transition: opacity 1s ease-in-out, display 1s ease-in-out, width 1s ease-in-out;
    }
    .widget-sidebarInfo {
      max-width: 480px;
      position: fixed;
      background-color: ${widgetBackgroundColor};
      border-radius: 5px;
      border: 1px solid #ccc;
      z-index: 2000;
      overflow: visible;
      box-shadow: -8px 8px 41px -16px rgba(66, 68, 90, 1);
      display: block;
      opacity: 1;
      top: 20px;
      ${menuSide === 'right' ? 'right: 20px;' : 'left: 20px;'}
    }
    .widget-openButton {
      position: fixed;
      line-height: 0;
      padding: 7px;
      display: none;
      border: none;
      cursor: pointer;
      background-color: ${buttonColor};
      border-radius: 4px;
      ${buttonPositions[buttonPos] || buttonPositions['bottom-left']}
    }
    .widget-title {
      color: ${widgetTitleColor};
      margin: 0;
    }
    .widget-text {
      color: ${widgetTextColor};
    }
    .widget-links a {
      color: ${widgetLinkColor};
      text-decoration: none;
    }
  `;
  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // Funciones para generar los SVG con el color del icono
  function getOpenButtonSVG() {
    var rotationStyle = menuSide === 'right' ? 'transform: rotate(180deg);' : '';
    return `
      <svg style="${rotationStyle}" fill="${buttonIconColor}" width="30" height="30" version="1.1"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <g>
          <path d="M35.2,20.5c-0.9-0.9-2.3-0.9-3.2,0c-0.9,0.9-0.9,2.3,0,3.2l6,6.1H20.7c-1.2,0-2.2,1-2.2,2.2
                   c0,1.2,1,2.2,2.2,2.2H38l-6,6.1c-0.9,0.9-0.9,2.3,0,3.2c0.4,0.4,1,0.6,1.6,0.6
                   c0.6,0,1.2-0.2,1.6-0.7l9.8-9.9c0.9-0.9,0.9-2.3,0-3.2L35.2,20.5z" />
          <path d="M32,1.8C15.3,1.8,1.7,15.3,1.7,32S15.3,62.2,32,62.2S62.3,48.7,62.3,32
                   S48.7,1.8,32,1.8z M32,57.8C17.8,57.8,6.2,46.2,6.2,32
                   C6.2,17.8,17.8,6.2,32,6.2S57.8,17.8,57.8,32
                   C57.8,46.2,46.2,57.8,32,57.8z" />
        </g>
      </svg>`;
  }

  function getCloseButtonSVG() {
    return `
      <svg fill="${buttonIconColor}" width="25" height="25" version="1.1"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path d="M35.2,32L59.6,7.6c0.9-0.9,0.9-2.3,0-3.2
                 c-0.9-0.9-2.3-0.9-3.2,0L32,28.8L7.6,4.4c-0.9-0.9-2.3-0.9-3.2,0
                 c-0.9,0.9-0.9,2.3,0,3.2L28.8,32L4.4,56.4c-0.9,0.9-0.9,2.3,0,3.2
                 c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7L32,35.2l24.4,24.4
                 c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7
                 c0.9-0.9,0.9-2.3,0-3.2L35.2,32z" />
      </svg>`;
  }

  // Creamos el botón de apertura sin clases predefinidas (todo se maneja con estilos inyectados)
  var openButton = document.createElement('button');
  openButton.id = 'widget-openButton';
  openButton.className = 'widget-openButton';
  openButton.innerHTML = getOpenButtonSVG();

  // Creamos el contenedor principal del widget
  var widgetDiv = document.createElement('div');
  widgetDiv.id = 'widget-infoDataBox';
  widgetDiv.className = 'widget-sidebarInfo';

  // Cabecera del widget con título y botón de cierre
  var headerHTML = `
    <div style="padding:20px; display:flex; justify-content: space-between; align-items: center;">
      <h4 class="widget-title">Información básica sobre Protección de Datos</h4>
      <span id="widget-closeInfoData" style="cursor:pointer;">${getCloseButtonSVG()}</span>
    </div>
  `;

  // Contenido por defecto (usa el nombre de la marca y el dominio para el enlace)
  var defaultContent = `
    <div class="widget-text">
      <p><strong>Responsable:</strong> ${brandName}</p>
      <p>Puede ampliar nuestra información en la <a href="${customDomain}/privacidad.html" target="_blank" class="widget-links">Política de Privacidad</a>.</p>
    </div>
  `;

  // Creamos el contenedor del contenido (se le asigna scroll interno)
  var contentContainer = document.createElement('div');
  contentContainer.id = 'widget-content';
  contentContainer.style.cssText = "padding:20px; padding-top:0; overflow-y:auto; max-height:400px;";
  // Se carga el contenido por defecto; si se define contentURL, se reemplazará
  contentContainer.innerHTML = defaultContent;

  // Armamos la estructura del widget
  widgetDiv.innerHTML = headerHTML;
  widgetDiv.appendChild(contentContainer);

  // Funciones para abrir y cerrar el widget
  function openWidget() {
    widgetDiv.style.display = "block";
    widgetDiv.style.opacity = "1";
    openButton.style.display = "none";
  }

  function closeWidget() {
    widgetDiv.style.display = "none";
    widgetDiv.style.opacity = "0";
    openButton.style.display = "block";
  }

  // Asignamos eventos a los botones
  openButton.addEventListener('click', openWidget);
  widgetDiv.querySelector('#widget-closeInfoData').addEventListener('click', closeWidget);

  // Añadimos los elementos al DOM
  document.body.appendChild(openButton);
  document.body.appendChild(widgetDiv);

  // Opción: ocultar automáticamente el widget después del tiempo configurado
  window.addEventListener('load', function() {
    setTimeout(function() {
      closeWidget();
    }, hideTimeout);
  });

  // Si se ha definido una URL de contenido Markdown, lo cargamos y lo renderizamos
  if (contentURL) {
    fetch(contentURL)
      .then(function(response) { return response.text(); })
      .then(function(mdText) {
        // Si existe la librería "marked", la usamos para convertir Markdown a HTML
        var htmlContent = (window.marked) ? marked(mdText) : mdText;
        contentContainer.innerHTML = htmlContent;
      })
      .catch(function(error) {
        console.error("Error al cargar el contenido Markdown:", error);
      });
  }

})();
