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
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .widget-sidebarInfo {
        max-width: 400px;
        position: fixed;
        background-color: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        z-index: 2000;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        opacity: 1;
        top: 20px;
        bottom: 20px;
        overflow: hidden;
        ${menuSide === "right" ? "right: 20px;" : "left: 20px;"}
      }
      
      @media (max-width: 768px) {
        .widget-sidebarInfo {
          max-width: calc(100vw - 48px);
          top: 16px;
          bottom: 16px;
          left: 16px !important;
          right: 16px !important;
        }
      }
      .widget-openButton {
        position: fixed;
        line-height: 0;
        padding: 12px;
        display: none;
        border: none;
        cursor: pointer;
        background-color: ${buttonColor};
        border-radius: 50%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        ${buttonPositions[buttonPos] || buttonPositions["bottom-left"]}
      }
      .widget-openButton:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      .widget-openButton:active {
        transform: scale(0.95);
      }
      .widget-box-info-widget {
        border-bottom: 1px solid #e5e7eb;
        background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
      }
      #widget-closeInfoData {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        background-color: transparent;
      }
      #widget-closeInfoData:hover {
        background-color: #eff6ff;
      }
      #widget-closeInfoData:hover svg {
        fill: #1d4ed8;
        stroke: #1d4ed8;
      }
      #widget-closeInfoData:active {
        background-color: #dbeafe;
      }
      #widget-content {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        line-height: 1.6;
        scrollbar-width: thin;
        scrollbar-color: #d1d5db #f9fafb;
      }
      #widget-content::-webkit-scrollbar {
        width: 8px;
      }
      #widget-content::-webkit-scrollbar-track {
        background: #f9fafb;
      }
      #widget-content::-webkit-scrollbar-thumb {
        background-color: #d1d5db;
        border-radius: 4px;
      }
      #widget-content::-webkit-scrollbar-thumb:hover {
        background-color: #9ca3af;
      }

      /* Títulos */
      #widget-content h1 {
        font-size: 24px;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 6px;
        color: #111827;
        letter-spacing: -0.025em;
      }
      
      #widget-content h2 {
        font-size: 20px;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 4px;
        color: #111827;
        letter-spacing: -0.025em;
      }
      
      #widget-content h3 {
        font-size: 18px;
        font-weight: 600;
        margin-top: 9px;
        margin-bottom: 3px;
        color: #111827;
        letter-spacing: -0.015em;
      }
      
      #widget-content h4{
        font-size: 16px;
        font-weight: 600;
        margin-top: 8px;
        margin-bottom: 3px;
        color: #111827;
        letter-spacing: -0.015em;
      }
      
      #widget-content h3:first-of-type {
        margin-top: 0;
      }
      
      #widget-content h5 {
        font-size: 14px;
        font-weight: 600;
        margin-top: 7px;
        margin-bottom: 2px;
        color: #374151;
        letter-spacing: 0;
      }
      
      #widget-content h6 {
        font-size: 13px;
        font-weight: 600;
        margin-top: 6px;
        margin-bottom: 2px;
        color: #4b5563;
        letter-spacing: 0;
      }
      
      /* Párrafos */
      #widget-content p {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 6px;
        margin-top: 0;
        color: #374151;
      }
      
      /* Listas */
      #widget-content ul,
      #widget-content ol {
        padding-left: 20px;
        margin-bottom: 6px;
        margin-top: 2px;
      }
      
      #widget-content li {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 2px;
        color: #374151;
      }
      
      #widget-content ul li {
        list-style-type: disc;
      }
      
      #widget-content ol li {
        list-style-type: decimal;
      }
      
      /* Enlaces */
      #widget-content a {
        font-size: 14px;
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      #widget-content a:hover {
        color: #1d4ed8;
        border-bottom-color: #2563eb;
      }
      
      /* Separadores (HR) */
      #widget-content hr {
        border: none;
        height: 1px;
        background: linear-gradient(to right, transparent, #e5e7eb, transparent);
        margin: 8px 0;
      }
      
      /* Mejoras adicionales */
      #widget-content strong {
        font-weight: 600;
        color: #111827;
      }
      
      #widget-content code {
        background-color: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 13px;
        font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
        color: #1f2937;
      }
      
      /* Botón de cerrar inferior */
      #widget-closeBottom {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
      }
      
      #widget-closeBottom button {
        background: none;
        border: none;
        color: #2563eb;
        font-size: 14px;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        border-bottom: 1px solid transparent;
      }
      
      #widget-closeBottom button:hover {
        color: #1d4ed8;
        background-color: #f3f4f6;
        border-bottom-color: #2563eb;
      }
      
      #widget-closeBottom button:active {
        background-color: #e5e7eb;
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
        console.error("[Widget] Error al cargar la librería marked.");
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
      <div class="widget-box-info-widget" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: flex-start;">
        <h4 style="margin: 0; color: #111827; font-size: 20px; font-weight: 600; letter-spacing: -0.025em;">Información básica sobre</br> Protección de Datos</h4>
        <span id="widget-closeInfoData" style="cursor: pointer; flex-shrink: 0; margin-top: 0;">
          <svg fill="#2563eb" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#2563eb" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </span>
      </div>
    `;
  
    // Contenido (div)
    var contentContainer = document.createElement("div");
    contentContainer.id = "widget-content";
    contentContainer.style.cssText = "flex: 1; padding: 16px; overflow-y: auto; background-color: #ffffff;";
    contentContainer.innerHTML = `<p style="color: #6b7280; font-size: 14px;">Cargando información...</p>`;
  
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
              contentContainer.innerHTML = htmlContent + `
                <div id="widget-closeBottom">
                  <button type="button" id="widget-closeBottomBtn">Cerrar</button>
                </div>
              `;
              // Añadir event listener al botón de cerrar inferior
              var closeBottomBtn = contentContainer.querySelector("#widget-closeBottomBtn");
              if (closeBottomBtn) {
                closeBottomBtn.addEventListener("click", closeWidget);
              }
            //   console.log("[Widget] Contenido Markdown procesado con marked.");
            } else {
              contentContainer.innerHTML = `<p style="color:red">No se pudo procesar el contenido Markdown.</p>
                <div id="widget-closeBottom">
                  <button type="button" id="widget-closeBottomBtn">Cerrar</button>
                </div>
              `;
              var closeBottomBtn = contentContainer.querySelector("#widget-closeBottomBtn");
              if (closeBottomBtn) {
                closeBottomBtn.addEventListener("click", closeWidget);
              }
            }
          });
        })
        .catch(function (error) {
        console.error("[Widget] Error al cargar Markdown:", error);
          contentContainer.innerHTML = `<p style="color:red">Error al cargar la información. Revisa la consola.</p>
            <div id="widget-closeBottom">
              <button type="button" id="widget-closeBottomBtn">Cerrar</button>
            </div>
          `;
          var closeBottomBtn = contentContainer.querySelector("#widget-closeBottomBtn");
          if (closeBottomBtn) {
            closeBottomBtn.addEventListener("click", closeWidget);
          }
        });
    } else {
      // Si no hay contentURL, mostramos algo por defecto
      contentContainer.innerHTML = `
        <p><strong>Responsable:</strong> ${brandName}</p>
        <p>No se ha definido ninguna URL de contenido (contentURL)</p>
        <div id="widget-closeBottom">
          <button type="button" id="widget-closeBottomBtn">Cerrar</button>
        </div>
      `;
      var closeBottomBtn = contentContainer.querySelector("#widget-closeBottomBtn");
      if (closeBottomBtn) {
        closeBottomBtn.addEventListener("click", closeWidget);
      }
    }
  })();
  
