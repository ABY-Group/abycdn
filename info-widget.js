(function () {
    var config = window.infoWidgetConfig || {};
  
    /* Opciones del botón */
    var buttonPos = config.buttonPosition || "bottom-left";
    var buttonColor = config.buttonColor || "#007bff";
    var buttonIconColor = config.buttonIconColor || "#ffffff";
  
    /* Opciones del widget */
    var widgetBackgroundColor = config.widgetBackgroundColor || "#fefefe";
    var widgetTitleColor = config.widgetTitleColor || "#333333";
    var widgetTextColor = config.widgetTextColor || "#000000";
    var widgetLinkColor = config.widgetLinkColor || "#007bff";
    var hideTimeout = config.hideTimeout || 5000;
    var brandName = config.brandName || "Tu Marca";
    var contentURL = config.contentURL || "";
    var menuSide = config.menuSide || "left";
  
    // Links dinámicos
    var linksArray = config.links || [];
  
    // Posiciones posibles del botón
    var buttonPositions = {
      "bottom-left": "bottom: 80px; left: 20px;",
      "bottom-right": "bottom: 80px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
    };
  
    // Inyección de CSS
    var css = `
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
        box-shadow: -8px 8px 41px -16px rgba(66, 68, 90, 1);
        display: flex;
        flex-direction: column;
        opacity: 1;
        top: 20px;
        bottom: 20px;
        ${menuSide === "right" ? "right: 20px;" : "left: 20px;"}
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
        ${buttonPositions[buttonPos] || buttonPositions["bottom-left"]}
      }
      #widget-content {
        font-family: inherit,Arial, sans-serif;
        line-height: 1.6;
      }

      /* Títulos */
      #widget-content h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 12px;
        color: ${widgetTitleColor};
      }
      
      #widget-content h2 {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
        color: ${widgetTitleColor};
      }
      
      #widget-content h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
        color: ${widgetTitleColor};
      }
      
      #widget-content h4 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 6px;
        color: ${widgetTitleColor};
      }
      
      #widget-content h5 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
        color: ${widgetTitleColor};
      }
      
      #widget-content h6 {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;
        color: ${widgetTitleColor};
      }
      
      /* Párrafos */
      #widget-content p {
        font-size: 14px;
        margin-bottom: 10px;
        color: ${widgetTextColor};
      }
      
      /* Listas */
      #widget-content ul,
      #widget-content ol {
        padding-left: 20px;
        margin-bottom: 10px;
      }
      
      #widget-content li {
        font-size: 14px;
        margin-bottom: 6px;
        color: ${widgetTextColor};
      }
      
      /* Enlaces */
      #widget-content a {
        font-size: 14px;

        color: ${widgetLinkColor};
        text-decoration: underline;
        transition: color 0.3s ease-in-out;
      }
      
      #widget-content a:hover {
        color: darken(${widgetLinkColor}, 10%);
        text-decoration: none;
      }
      
      /* Separadores (HR) */
      #widget-content hr {
        border: none;
        height: 1px;
        background-color: #ccc;
        margin: 15px 0;
      }
    `;
    var styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  
    // Reemplazar links dinámicos en el Markdown (p. ej. (routePrivacy) => (URL))
    function replaceDynamicLinks(mdText) {
      linksArray.forEach(function (linkObj) {
        Object.keys(linkObj).forEach(function (key) {
          var regex = new RegExp(`\\(${key}\\)`, "g");
          mdText = mdText.replace(regex, `(${linkObj[key]})`);
        });
      });
      return mdText;
    }
  
    // Carga de la librería marked
    function loadMarked(callback) {
      if (!window.marked) {
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
        script.onload = function () {
        //   console.log("[Widget] Librería marked cargada correctamente.");
          callback();
        };
        script.onerror = function () {
        //   console.error("[Widget] Error al cargar la librería marked.");
          callback();
        };
        document.head.appendChild(script);
      } else {
        callback();
      }
    }
  
    // Botón de apertura
    var openButton = document.createElement("button");
    openButton.id = "widget-openButton";
    openButton.className = "widget-openButton";
    openButton.innerHTML = `
      <svg fill="${buttonIconColor}" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.47 2 2 6.479 2 12s4.47 10 10 10 10-4.479 10-10S17.53 2 12 2zm.75 15h-1.5V10h1.5v7zm0-8h-1.5V7h1.5v2z"/>
      </svg>
    `;
  
    // Contenedor principal del widget
    var widgetDiv = document.createElement("div");
    widgetDiv.id = "widget-infoDataBox";
    widgetDiv.className = "widget-sidebarInfo";
  
    // Cabecera del widget
    var headerHTML = `
      <div style="padding:20px; display:flex; justify-content: space-between; align-items: center;">
        <h4 style="margin:0; color:${widgetTitleColor};">Información básica sobre Protección de Datos</h4>
        <span id="widget-closeInfoData" style="cursor:pointer;">
          <svg fill="${widgetTitleColor}" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <path d="M35.2,32L59.6,7.6c0.9-0.9,0.9-2.3,0-3.2
              c-0.9-0.9-2.3-0.9-3.2,0L32,28.8L7.6,4.4c-0.9-0.9-2.3-0.9-3.2,0
              c-0.9,0.9-0.9,2.3,0,3.2L28.8,32L4.4,56.4c-0.9,0.9-0.9,2.3,0,3.2
              c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7L32,35.2l24.4,24.4
              c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7
              c0.9-0.9,0.9-2.3,0-3.2L35.2,32z"/>
          </svg>
        </span>
      </div>
    `;
  
    // Contenido (div)
    var contentContainer = document.createElement("div");
    contentContainer.id = "widget-content";
    contentContainer.style.cssText = "flex: 1; padding: 20px; overflow-y: auto;";
    contentContainer.innerHTML = `<p style="color:${widgetTextColor}">Cargando información...</p>`;
  
    widgetDiv.innerHTML = headerHTML;
    widgetDiv.appendChild(contentContainer);
  
    // Temporizador para auto-cierre
    var autoCloseTimer = null;
    function startAutoCloseTimer() {
      if (hideTimeout && hideTimeout > 0) {
        autoCloseTimer = setTimeout(closeWidget, hideTimeout);
      }
    }
  
    function openWidget() {
      widgetDiv.style.display = "flex";
      widgetDiv.style.opacity = "1";
      openButton.style.display = "none";
      startAutoCloseTimer();
    }
  
    function closeWidget() {
      widgetDiv.style.display = "none";
      widgetDiv.style.opacity = "0";
      openButton.style.display = "block";
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
    }
  
    // Eventos de apertura/cierre
    openButton.addEventListener("click", openWidget);
    widgetDiv
      .querySelector("#widget-closeInfoData")
      .addEventListener("click", closeWidget);
  
    // Hover para pausar/resumir el temporizador
    widgetDiv.addEventListener("mouseenter", function () {
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
    });
    widgetDiv.addEventListener("mouseleave", function () {
      if (widgetDiv.style.display === "flex") {
        startAutoCloseTimer();
      }
    });
  
    // Añadir elementos al DOM
    document.body.appendChild(openButton);
    document.body.appendChild(widgetDiv);
  
    // Cargar Markdown si `contentURL` está definido
    if (contentURL) {
    //   console.log("[Widget] Fetching MD from:", contentURL);
      fetch(contentURL)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
          }
          return response.text();
        })
        .then(function (mdText) {
        //   console.log("[Widget] Markdown cargado, longitud:", mdText.length);
          // 1) Reemplazar enlaces (routePrivacy, routeTerms, etc.)
          mdText = replaceDynamicLinks(mdText);
  
          // 2) Cargar la librería `marked` y procesar
          loadMarked(function () {
            if (window.marked) {
              // Versión actual de Marked: preferimos parse(), si no, se usa como función
              var htmlContent;
              if (typeof window.marked.parse === "function") {
                htmlContent = window.marked.parse(mdText);
              } else {
                // fallback a la sintaxis antigua
                htmlContent = window.marked(mdText);
              }
              contentContainer.innerHTML = htmlContent;
            //   console.log("[Widget] Contenido Markdown procesado con marked.");
            } else {
              contentContainer.innerHTML = `<p style="color:red">No se pudo procesar el contenido Markdown.</p>`;
            }
          });
        })
        .catch(function (error) {
        //   console.error("[Widget] Error al cargar Markdown:", error);
          contentContainer.innerHTML = `<p style="color:red">Error al cargar la información. Revisa la consola.</p>`;
        });
    } else {
      // Si no hay contentURL, mostramos algo por defecto
      contentContainer.innerHTML = `
        <p><strong>Responsable:</strong> ${brandName}</p>
        <p>No se ha definido ninguna URL de contenido (contentURL)</p>
      `;
    }
  })();
  
