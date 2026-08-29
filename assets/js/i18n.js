/* ============================================================
   i18n.js - English and Spanish for the code generator.

   HOW IT WORKS
   Static page text carries data-i18n="key". Attributes carry
   data-i18n-attr="placeholder:key, aria-label:key". Strings built
   in JavaScript call t("key").

   Text that comes from the spreadsheet (sensor names, measurement
   names, tooltips, parameter labels, survey questions) is keyed on
   the stable identifier rather than on the English wording, so
   rewording a cell in Excel does not silently drop a translation.

   WHERE THE SPANISH SHOULD EVENTUALLY LIVE
   In the spreadsheet, as `_es` columns next to the English ones, so
   the people who know the agronomy own the wording. Until those
   columns exist it lives here. The keys are the same either way, so
   moving it later is a change to build.py and not to this file's
   shape.

   REVIEW STATUS
   The Spanish below is a careful first pass, not a reviewed
   translation. The agronomic terms are the ones to check: frente de
   humedecimiento, tension hidrica, capacidad de campo, punto de
   marchitez. A native-speaking agronomist should read it before this
   is put in front of growers.
   ============================================================ */

(function (root) {
  "use strict";

  var LANG_KEY = "nodeflow_lang_v1";

  var STRINGS = {
    en: {
      /* ---------- page chrome ---------- */
      "page.title": "NodeFlow (On-site) Sensing System Code Generator",
      "page.skip": "Skip to the form",
      "lang.switch": "Español",
      "lang.switchLabel": "Cambiar el idioma a español",
      "logo.alt":
        "NodeFlow logo: a water drop over a fan of soil layers with three sensor nodes",

      /* ---------- summary box ---------- */
      "info.title": "Summary & Instructions",
      "info.p1":
        "This website allows you to generate the code the NodeFlow (On-site) Sensing System uses to read the sensors that you will plug into it, and generate the information you are interested in.",
      "info.p2":
        "Please read the full instructions in the NodeFlow (On-site) guidelines and videos on how to use the device.",
      "info.p3": "To generate the code for your NodeFlow (On-site) device, you will need to know:",
      "info.li1": "What sensors you want to connect",
      "info.li2":
        "How you will connect these sensors to the Arduino ports, i.e. to which port each sensor will be connected to.",
      "info.li2em": "N.B. you can only connect one type of sensor to each port.",
      "info.li3": "For each sensor, what variable should appear on your LCD screen",
      "info.li4": "The visualization format for each of these variables",
      "info.offlineTitle": "Working offline?",
      "info.offline":
        "This tool works without an internet connection, but you must open it online at least once first so it can load. After that, you can fill out the form and download your code with no connection. Any tracking information will be sent automatically the next time you're online.",
      "info.offline2":
        "Clearing your browser's cache or site data for this page removes the offline copy, along with your saved details and any information still waiting to be sent. If that happens, just open this page again while online to restore it.",

      /* ---------- form ---------- */
      "form.requiredNote": "Fields marked * are required",
      "form.noscript":
        "This generator builds your Arduino file inside the browser, so it needs JavaScript switched on. Everything still happens on your own machine: turning JavaScript on does not send your work anywhere.",
      "form.blockTitle": "Sensor-Arduino port connection specifications",
      "form.remove": "Remove",
      "form.blockIntro":
        "For each sensor, select the items you want from the lists below. Leaving the default values will generate a default code that may not meet your requirements.",
      "form.pairCaption":
        "The sensor specified below will be plugged into the Arduino board port specified below.",
      "form.sensorType": "Sensor type",
      "form.port": "Port",
      "form.required": "Required.",
      "form.outputLabel":
        "For this sensor and this port, I want to see the variable specified below on my screen:",
      "form.vizLabel":
        "For this sensor and this port, I want this variable to appear as:",
      "form.partnerLabel": "Deep (partner) sensor port",
      "form.partnerHelp1": "Wetting front needs two sensors at different depths. This block is the",
      "form.partnerHelpShallow": "shallow",
      "form.partnerHelp2": "sensor. Add a second sensor block for the",
      "form.partnerHelpDeep": "deep",
      "form.partnerHelp3": "sensor, then choose its port here.",
      "form.paramsLabel":
        "The information listed below is necessary to configure your NodeFlow (On-site). Please fill in each case to the best of your knowledge.",
      "form.calHintTitle": "Calibration values.",
      "form.calHint":
        "If you don't know these numbers yet: generate a code with the output \"Raw Sensor Value (bits)\" for this sensor first, read the value shown with the probe held in open air, then with the probe submerged in water, and enter those two numbers here.",
      "form.parameter": "Parameter",
      "form.value": "Value",
      "form.units": "Units",
      "form.addBlock": "+ Add another \"Sensor-Arduino port connection specifications\"",
      "form.generate": "Generate the code for my NodeFlow (On-site) Sensing System",
      "form.generating": "Generating your code...",
      "form.costQuestion": "Do you want to estimate the cost of your system?",
      "form.costSoon": "Cost estimator, coming soon",
      "form.selectPort": "Select the port",
      "form.tempProbe": "soil temperature probe",
      "form.addSecondBlock": "Add a second sensor block first",
      "form.ready": "Ready when you are",

      /* ---------- tooltips on the form itself ---------- */
      "tip.sensorType":
        "The sensors that can be used with the NodeFlow On-site Sensing System are listed in our written guidelines.",
      "tip.port":
        "The letter and number of the port are written on the left side of each port. The ports associated to the Arduino board are shown on the LCD screen.",
      "tip.output":
        "The sensor will send out a raw value that can be transformed into other variables that may be easier to understand and read on a regular basis. Please choose how you want to read your data.",
      "tip.viz":
        "You can display your variable in different ways. For example, you may want it to appear as a number, or a percentage, or a progress bar. Please select.",
      "tip.params":
        "In the configuration you specified in the boxes above, we need to know the value of the parameters listed below. Default values are specified but they may not be suitable for your specific situation. Please refer to the guidelines to learn how to measure these values.",
      "tip.prefix": "Explanation:",

      /* ---------- saved information ---------- */
      "saved.welcome": "Welcome back,",
      "saved.infoSaved": ". Your info is saved.",
      "saved.edit": "Edit my info",
      "saved.clear": "Clear",
      "saved.loadTitle": "Load a previous configuration",
      "saved.loadHelp":
        "Reloads the sensors, ports and values you used for that file so you can adjust them.",
      "saved.load": "Load",
      "saved.sensor": "sensor",
      "saved.sensors": "sensors",
      "saved.forgetConfig": "Forget this configuration",
      "saved.forgetName": "Forget this filename",
      "saved.confirmLoad":
        "Load the configuration saved as \"{name}\"? This replaces what is currently in the form.",
      "saved.confirmDelete":
        "Delete saved configuration \"{name}\"? This only removes it from your browser.",

      /* ---------- download dialog ---------- */
      "dialog.title": "Before you download",
      "dialog.close": "Cancel and close this dialog",
      "dialog.cancel": "Cancel",
      "dialog.confirm": "Confirm + download",
      "dialog.generating": "Generating...",
      "dialog.consent1": "I have read the",
      "dialog.consentLink": "consent form (PDF, opens in a new tab)",
      "dialog.consent2":
        "and agree to my information being collected by NodeFlow for research purposes.",
      "dialog.option1": "Option 1: reuse a previous name",
      "dialog.option1Help":
        "Click to fill in the name below. Your browser will not overwrite the earlier download. It saves alongside it as name-2.ino, so delete the old one if you don't want both.",
      "dialog.lastUsed": "Last used:",
      "dialog.clickToUse": "Click to use",
      "dialog.or": "OR",
      "dialog.option2": "Option 2: make a new file",
      "dialog.option2Help": "Type a new name to create a separate file.",
      "dialog.filename": "Name of file to generate",
      "dialog.filenameOrPrevious": "Name of file to generate (new or selected from above)",
      "dialog.filenameHelp":
        "Letters, numbers, dashes and underscores. Anything else is removed.",
      "dialog.filenamePlaceholder": "e.g. apples_field2 (no spaces, no .ino)",
      "dialog.stamp":
        "Add a date and time to the filename so it never overwrites an earlier download",
      "dialog.comment": "Comment to include in the code (optional)",
      "dialog.commentPlaceholder": "e.g. Orchard block 2, installed June 2026",
      "dialog.submittingAs": "Submitting as",
      "dialog.notYou": "Not you?",
      "dialog.badEmail": "That does not look like an email address.",
      "dialog.badFilename":
        "Use letters or numbers in the name. Symbols on their own will not do.",

      /* ---------- results ---------- */
      "result.downloaded": "The code has successfully downloaded as",
      "result.viewBelow": "You can visualize it below, or read",
      "result.whatNext": "what to do next",
      "result.preview": "Code preview",
      "result.copy": "Copy",
      "result.copied": "Copied!",

      /* ---------- messages ---------- */
      "msg.duplicatePort":
        "Two sensor blocks are using port {port}. Each port can hold only one sensor, so give one of them a different port.",
      "msg.emptyRequired":
        "Some required values are still empty. The fields that need filling in are outlined in red.",
      "msg.samePort":
        "The soil temperature sensor and the Watermark cannot share the same port ({port}). Pick a different port for the temperature sensor.",
      "msg.needTempPort":
        "This sensor uses two probes. Choose the port your soil temperature sensor is plugged into.",
      "msg.needDeepSensor":
        "A wetting front reading needs a second, deeper sensor. Add another sensor block and choose its port as the deep partner.",
      "msg.blockLimit":
        "You have reached the limit of {n} sensor blocks. Remove one before adding another.",
      "msg.tooFast": "That was quick. Wait a few seconds before generating another file.",
      "msg.hourlyLimit":
        "You have generated {n} files in the last hour, which is the limit. Try again a little later, or get in touch if you genuinely need more.",
      "msg.generateFailed":
        "Something went wrong while generating your code. Please check your entries and try again.",
      "msg.tooLarge":
        "Your configuration is too large to record, so it was not sent. Your file downloaded normally.",
      "msg.portsDuplicate": "Port{s} {ports} used in more than one block. Each port must be unique.",
      "msg.portsFull":
        "All 5 analog ports (A1-A5) are in use. To add more sensors, use a digital port (D1-D14).",
      "msg.offline":
        "You are offline. The form still works and your file will download. Research information is sent when you reconnect.",
      "msg.update": "A new version of this page is available.",
      "msg.refresh": "Refresh",

      /* ---------- consent banner ---------- */
      "consent.title": "Anonymous usage counting",
      "consent.body":
        "This site sets no advertising cookies and embeds no third-party trackers. We would like to count page visits so we know the tool is reaching people. It records no personal information and no cookie is stored for it. Your answer is kept in this browser only.",
      "consent.yes": "Yes, count my visit",
      "consent.no": "No thanks",
      "consent.privacy": "Privacy policy",

      /* ---------- footer ---------- */
      "foot.privacy": "Privacy policy",
      "foot.terms": "Terms of use",
      "foot.consentForm": "Research consent form (PDF)",
      "foot.afterDownload": "After you download",
      "foot.generator": "Code generator",
      "foot.legal":
        "A research and outreach project of UC Agriculture and Natural Resources and UC Santa Cruz. The generated code is provided as is, without warranty. Before you irrigate on the strength of a reading, check that it matches what the soil is actually doing: dig, or compare it against an instrument you already trust.",
      "foot.contactSoon": "Contact details coming soon.",
      "foot.copyright": "The NodeFlow project.",
    },

    es: {
      /* ---------- page chrome ---------- */
      "page.title": "Generador de código del sistema de sensores NodeFlow (in situ)",
      "page.skip": "Ir al formulario",
      "lang.switch": "English",
      "lang.switchLabel": "Switch the language to English",
      "logo.alt":
        "Logotipo de NodeFlow: una gota de agua sobre un abanico de capas de suelo con tres nodos de sensores",

      /* ---------- summary box ---------- */
      "info.title": "Resumen e instrucciones",
      "info.p1":
        "Este sitio web le permite generar el código que el sistema de sensores NodeFlow (in situ) utiliza para leer los sensores que usted conecte y obtener la información que le interesa.",
      "info.p2":
        "Lea las instrucciones completas en las guías y los videos de NodeFlow (in situ) sobre cómo usar el dispositivo.",
      "info.p3": "Para generar el código de su dispositivo NodeFlow (in situ), necesita saber:",
      "info.li1": "Qué sensores desea conectar",
      "info.li2":
        "Cómo va a conectar esos sensores a los puertos del Arduino, es decir, a qué puerto se conectará cada sensor.",
      "info.li2em": "Nota: solo se puede conectar un tipo de sensor a cada puerto.",
      "info.li3": "Para cada sensor, qué variable debe aparecer en la pantalla LCD",
      "info.li4": "El formato de visualización de cada una de esas variables",
      "info.offlineTitle": "¿Trabaja sin conexión?",
      "info.offline":
        "Esta herramienta funciona sin conexión a internet, pero primero debe abrirla en línea al menos una vez para que se cargue. Después puede llenar el formulario y descargar su código sin conexión. Cualquier información de seguimiento se enviará automáticamente la próxima vez que tenga conexión.",
      "info.offline2":
        "Si borra la caché o los datos del sitio en su navegador, se elimina la copia sin conexión, junto con sus datos guardados y cualquier información pendiente de envío. Si eso ocurre, vuelva a abrir esta página con conexión para restaurarla.",

      /* ---------- form ---------- */
      "form.requiredNote": "Los campos marcados con * son obligatorios",
      "form.noscript":
        "Este generador crea su archivo de Arduino dentro del navegador, así que necesita que JavaScript esté activado. Todo sigue ocurriendo en su propia computadora: activar JavaScript no envía su trabajo a ningún lado.",
      "form.blockTitle": "Especificaciones de conexión entre el sensor y el puerto del Arduino",
      "form.remove": "Quitar",
      "form.blockIntro":
        "Para cada sensor, seleccione lo que desee en las listas de abajo. Si deja los valores predeterminados se generará un código genérico que puede no ajustarse a sus necesidades.",
      "form.pairCaption":
        "El sensor indicado abajo se conectará al puerto de la placa Arduino indicado abajo.",
      "form.sensorType": "Tipo de sensor",
      "form.port": "Puerto",
      "form.required": "Obligatorio.",
      "form.outputLabel":
        "Para este sensor y este puerto, quiero ver en mi pantalla la variable indicada abajo:",
      "form.vizLabel":
        "Para este sensor y este puerto, quiero que esta variable aparezca como:",
      "form.partnerLabel": "Puerto del sensor profundo (asociado)",
      "form.partnerHelp1":
        "El frente de humedecimiento necesita dos sensores a distintas profundidades. Este bloque es el sensor",
      "form.partnerHelpShallow": "superficial",
      "form.partnerHelp2": ". Agregue un segundo bloque de sensor para el sensor",
      "form.partnerHelpDeep": "profundo",
      "form.partnerHelp3": "y luego elija aquí su puerto.",
      "form.paramsLabel":
        "La información indicada abajo es necesaria para configurar su NodeFlow (in situ). Complete cada campo con los mejores datos que tenga.",
      "form.calHintTitle": "Valores de calibración.",
      "form.calHint":
        "Si todavía no conoce estos números: primero genere un código con la salida \"Valor bruto del sensor (bits)\" para este sensor, anote el valor que aparece con la sonda al aire libre y después con la sonda sumergida en agua, e ingrese esos dos números aquí.",
      "form.parameter": "Parámetro",
      "form.value": "Valor",
      "form.units": "Unidades",
      "form.addBlock": "+ Agregar otra \"Especificación de conexión sensor-puerto\"",
      "form.generate": "Generar el código para mi sistema de sensores NodeFlow (in situ)",
      "form.generating": "Generando su código...",
      "form.costQuestion": "¿Desea estimar el costo de su sistema?",
      "form.costSoon": "Estimador de costos, próximamente",
      "form.selectPort": "Seleccione el puerto",
      "form.tempProbe": "sonda de temperatura del suelo",
      "form.addSecondBlock": "Agregue primero un segundo bloque de sensor",
      "form.ready": "Cuando quiera",

      /* ---------- tooltips on the form itself ---------- */
      "tip.sensorType":
        "Los sensores que se pueden usar con el sistema de sensores NodeFlow (in situ) están enumerados en nuestras guías escritas.",
      "tip.port":
        "La letra y el número del puerto están escritos al lado izquierdo de cada puerto. Los puertos asociados a la placa Arduino se muestran en la pantalla LCD.",
      "tip.output":
        "El sensor entrega un valor bruto que se puede transformar en otras variables más fáciles de entender y de leer a diario. Elija cómo desea leer sus datos.",
      "tip.viz":
        "Puede mostrar su variable de distintas formas. Por ejemplo, como un número, como un porcentaje o como una barra de progreso. Seleccione una opción.",
      "tip.params":
        "Para la configuración que indicó en los campos de arriba, necesitamos conocer el valor de los parámetros que se enumeran abajo. Se indican valores predeterminados, pero pueden no ser adecuados para su situación. Consulte las guías para aprender a medir estos valores.",
      "tip.prefix": "Explicación:",

      /* ---------- saved information ---------- */
      "saved.welcome": "Bienvenido de nuevo,",
      "saved.infoSaved": ". Sus datos están guardados.",
      "saved.edit": "Editar mis datos",
      "saved.clear": "Borrar",
      "saved.loadTitle": "Cargar una configuración anterior",
      "saved.loadHelp":
        "Vuelve a cargar los sensores, los puertos y los valores que usó para ese archivo para que pueda ajustarlos.",
      "saved.load": "Cargar",
      "saved.sensor": "sensor",
      "saved.sensors": "sensores",
      "saved.forgetConfig": "Olvidar esta configuración",
      "saved.forgetName": "Olvidar este nombre de archivo",
      "saved.confirmLoad":
        "¿Cargar la configuración guardada como \"{name}\"? Esto reemplaza lo que hay ahora en el formulario.",
      "saved.confirmDelete":
        "¿Eliminar la configuración guardada \"{name}\"? Esto solo la quita de su navegador.",

      /* ---------- download dialog ---------- */
      "dialog.title": "Antes de descargar",
      "dialog.close": "Cancelar y cerrar este cuadro de diálogo",
      "dialog.cancel": "Cancelar",
      "dialog.confirm": "Confirmar y descargar",
      "dialog.generating": "Generando...",
      "dialog.consent1": "He leído el",
      "dialog.consentLink": "formulario de consentimiento (PDF, se abre en una pestaña nueva)",
      "dialog.consent2":
        "y acepto que NodeFlow recopile mi información con fines de investigación.",
      "dialog.option1": "Opción 1: reutilizar un nombre anterior",
      "dialog.option1Help":
        "Haga clic para completar el nombre de abajo. Su navegador no sobrescribirá la descarga anterior. La guarda junto a ella como nombre-2.ino, así que borre la antigua si no quiere las dos.",
      "dialog.lastUsed": "Usado por última vez:",
      "dialog.clickToUse": "Haga clic para usar",
      "dialog.or": "O BIEN",
      "dialog.option2": "Opción 2: crear un archivo nuevo",
      "dialog.option2Help": "Escriba un nombre nuevo para crear un archivo aparte.",
      "dialog.filename": "Nombre del archivo que se generará",
      "dialog.filenameOrPrevious":
        "Nombre del archivo que se generará (nuevo o elegido arriba)",
      "dialog.filenameHelp":
        "Letras, números, guiones y guiones bajos. Cualquier otro carácter se elimina.",
      "dialog.filenamePlaceholder": "por ejemplo, manzanos_lote2 (sin espacios, sin .ino)",
      "dialog.stamp":
        "Agregar la fecha y la hora al nombre del archivo para que nunca sobrescriba una descarga anterior",
      "dialog.comment": "Comentario para incluir en el código (opcional)",
      "dialog.commentPlaceholder": "por ejemplo, Huerto lote 2, instalado en junio de 2026",
      "dialog.submittingAs": "Enviando como",
      "dialog.notYou": "¿No es usted?",
      "dialog.badEmail": "Eso no parece una dirección de correo electrónico.",
      "dialog.badFilename":
        "Use letras o números en el nombre. Los símbolos por sí solos no sirven.",

      /* ---------- results ---------- */
      "result.downloaded": "El código se descargó correctamente como",
      "result.viewBelow": "Puede verlo abajo o leer",
      "result.whatNext": "qué hacer a continuación",
      "result.preview": "Vista previa del código",
      "result.copy": "Copiar",
      "result.copied": "¡Copiado!",

      /* ---------- messages ---------- */
      "msg.duplicatePort":
        "Dos bloques de sensor están usando el puerto {port}. Cada puerto admite un solo sensor, así que asigne otro puerto a uno de ellos.",
      "msg.emptyRequired":
        "Todavía faltan valores obligatorios. Los campos que hay que completar están marcados en rojo.",
      "msg.samePort":
        "El sensor de temperatura del suelo y el Watermark no pueden compartir el mismo puerto ({port}). Elija otro puerto para el sensor de temperatura.",
      "msg.needTempPort":
        "Este sensor usa dos sondas. Elija el puerto donde está conectado su sensor de temperatura del suelo.",
      "msg.needDeepSensor":
        "Una lectura del frente de humedecimiento necesita un segundo sensor más profundo. Agregue otro bloque de sensor y elija su puerto como el sensor profundo asociado.",
      "msg.blockLimit":
        "Ha llegado al límite de {n} bloques de sensor. Quite uno antes de agregar otro.",
      "msg.tooFast":
        "Eso fue muy rápido. Espere unos segundos antes de generar otro archivo.",
      "msg.hourlyLimit":
        "Ha generado {n} archivos en la última hora, que es el límite. Vuelva a intentarlo un poco más tarde o escríbanos si realmente necesita más.",
      "msg.generateFailed":
        "Algo salió mal al generar su código. Revise sus datos e inténtelo de nuevo.",
      "msg.tooLarge":
        "Su configuración es demasiado grande para registrarla, así que no se envió. Su archivo se descargó con normalidad.",
      "msg.portsDuplicate":
        "El puerto {ports} se usa en más de un bloque. Cada puerto debe ser único.",
      "msg.portsFull":
        "Los 5 puertos analógicos (A1-A5) están en uso. Para agregar más sensores, use un puerto digital (D1-D14).",
      "msg.offline":
        "Está sin conexión. El formulario sigue funcionando y su archivo se descargará. La información de investigación se envía cuando vuelva a conectarse.",
      "msg.update": "Hay una versión nueva de esta página.",
      "msg.refresh": "Actualizar",

      /* ---------- consent banner ---------- */
      "consent.title": "Conteo anónimo de visitas",
      "consent.body":
        "Este sitio no usa cookies publicitarias ni incorpora rastreadores de terceros. Nos gustaría contar las visitas para saber si la herramienta está llegando a la gente. No registra información personal y no se guarda ninguna cookie para ello. Su respuesta queda solo en este navegador.",
      "consent.yes": "Sí, cuenten mi visita",
      "consent.no": "No, gracias",
      "consent.privacy": "Política de privacidad",

      /* ---------- footer ---------- */
      "foot.privacy": "Política de privacidad",
      "foot.terms": "Términos de uso",
      "foot.consentForm": "Formulario de consentimiento (PDF)",
      "foot.afterDownload": "Después de descargar",
      "foot.generator": "Generador de código",
      "foot.legal":
        "Un proyecto de investigación y divulgación de UC Agriculture and Natural Resources y UC Santa Cruz. El código generado se entrega tal cual, sin garantía. Antes de regar basándose en una lectura, compruebe que coincide con lo que el suelo está haciendo realmente: excave, o compárela con un instrumento en el que ya confíe.",
      "foot.contactSoon": "Datos de contacto próximamente.",
      "foot.copyright": "El proyecto NodeFlow.",
    },
  };

  /* ============================================================
     Text that comes from the spreadsheet. Keyed on the identifier,
     not on the English wording, so rewording a cell does not drop
     the translation. Anything missing falls back to the English the
     spreadsheet supplies, so a new row is never blank.
     ============================================================ */
  var DATA_ES = {
    sensors: {
      DF_robot: "Sensor capacitivo de humedad del suelo (como el DFRobot SEN0308)",
      Watermark: "Irrometer Watermark (200SS)",
      Watermark_Temperature:
        "Irrometer Watermark (200SS) combinado con sensor de temperatura del suelo Irrometer (200TS)",
      Temperature: "Sensor de temperatura del suelo Irrometer (200TS)",
    },

    /* keyed on the measurement's value in the sensors sheet */
    outputs: {
      "Raw Value (ADC)": "Valor bruto del sensor (ADC)",
      "Raw Value (%)": "Valor bruto del sensor (%)",
      Thresholds: "Umbrales de manejo",
      "Wetting Front": "Llegada del frente de humedecimiento a la profundidad del sensor",
      "Volumetric Soil Moisture": "Humedad volumétrica del suelo",
      "Vertical Flow Rate": "Velocidad de flujo vertical",
      "Total Available Water ": "Agua total disponible",
      "Total Available Water": "Agua total disponible",
      "Raw value (Resistance)": "Valor bruto (resistencia, en kΩ)",
      "Tension (kPa)": "Tensión (kPa)",
      Tension: "Tensión",
      "Management Thresholds": "Umbrales de manejo",
      "Raw value (Temperature, in °F)": "Valor bruto (temperatura, en °F)",
      "Raw value (Temperature, in °C)": "Valor bruto (temperatura, en °C)",
    },

    outputTips: {
      "Raw Value (ADC)": "Lectura directa del sensor (salida digital o analógica).",
      "Raw Value (%)":
        "Transformamos el valor bruto y lo expresamos como porcentaje: 0 % corresponde al valor más bajo posible y 100 % al más alto.",
      Thresholds:
        "Esta variable le indica si el suelo está muy seco, seco o húmedo. Transforma el valor bruto en esos tres estados cualitativos usando dos umbrales que usted especifica.",
      "Wetting Front":
        "Esta variable indica cuándo el agua ha llegado a la profundidad a la que está colocado el sensor.",
      "Volumetric Soil Moisture":
        "El contenido volumétrico de humedad del suelo, expresado aquí como porcentaje (%), es el volumen de agua respecto del volumen de suelo. Se calcula como θv = Vw/Vs · 100, donde Vw es el volumen de agua y Vs el volumen de suelo seco.",
      "Total Available Water":
        "El agua disponible es la cantidad de agua que puede almacenarse en el perfil del suelo y quedar a disposición de los cultivos. También se conoce como capacidad de agua disponible (AWC) o agua total disponible (TAW).",
      "Raw value (Resistance)":
        "Este sensor mide la resistencia eléctrica dentro de una matriz granular para determinar la tensión hídrica del suelo. Con esta opción usted lee el valor de resistencia (kΩ).",
      "Tension (kPa)":
        "Este sensor mide la resistencia eléctrica dentro de una matriz granular para determinar la tensión hídrica del suelo. Una ecuación de calibración convierte ese valor a tensión hídrica (kPa). Use esta opción si no puede medir la temperatura del suelo.",
      Tension:
        "Este sensor mide la resistencia eléctrica dentro de una matriz granular para determinar la tensión hídrica del suelo. La temperatura afecta la resistencia medida, por lo que un sensor de temperatura mejora la exactitud. Use esta opción si puede medir la temperatura del suelo.",
      "Raw value (Temperature, in °F)":
        "Está leyendo la temperatura del suelo con su sensor de temperatura.",
      "Raw value (Temperature, in °C)":
        "Está leyendo la temperatura del suelo con su sensor de temperatura.",
    },

    /* keyed on viz_key in the viz_options sheet */
    viz: {
      none: "Sin visualización",
      bar: "Barra de progreso",
      raw_lcd: "Valor bruto",
      state_lcd: "Estado: muy seco, seco o húmedo",
      transformed_lcd: "Valor bruto transformado 0-100",
      temp_lcd: "Temperatura",
      kpa_lcd: "Tensión",
      rate_lcd: "Velocidad de flujo",
      front_lcd: "Frente detectado",
      wm_state_lcd: "Estado: seco con estrés, rango de riego o saturación",
    },

    vizTips: {
      none:
        "Muestra la información de forma visual en la pantalla LCD. Ahora mismo no hay nada seleccionado.",
      bar: "Muestra una barra que cambia según el contenido de agua.",
      raw_lcd: "Muestra el valor bruto del sensor.",
      state_lcd:
        "Muestra el estado general en que parece estar el suelo, para los sensores capacitivos.",
      transformed_lcd: "Una versión más compacta del valor bruto del sensor.",
      temp_lcd: "Muestra la temperatura.",
      kpa_lcd: "Muestra la tensión del suelo en kPa.",
      rate_lcd: "Muestra la velocidad de flujo entre dos sensores.",
      front_lcd:
        "Muestra el frente detectado cuando el frente de humedecimiento llega al sensor profundo.",
      wm_state_lcd:
        "Muestra el estado en que parece estar el suelo, para los sensores Watermark.",
    },

    /* keyed on the survey question key */
    survey: {
      filename: "Nombre del archivo que se generará",
      name: "Su nombre",
      country: "Su país",
      email: "Su correo electrónico",
      ino_comment: "Comentario para incluir en el código (opcional)",
    },
  };

  /* ---------------------------------------------------------------- */

  var current = "en";

  function detect() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "es") return stored;
    } catch (_) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  function t(key, vars) {
    var table = STRINGS[current] || STRINGS.en;
    var text = table[key];
    if (text === undefined) text = STRINGS.en[key];
    if (text === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split("{" + name + "}").join(vars[name]);
      });
    }
    return text;
  }

  /* Spreadsheet text. `fallback` is whatever the sheet supplies, which is
     what shows when there is no translation yet. */
  function tData(group, key, fallback) {
    if (current === "en") return fallback;
    var table = DATA_ES[group];
    var found = table && key in table ? table[key] : null;
    return found || fallback;
  }

  function apply(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach(function (pair) {
          var bits = pair.split(":");
          if (bits.length === 2) {
            el.setAttribute(bits[0].trim(), t(bits[1].trim()));
          }
        });
    });

    document.documentElement.lang = current;
    var title = t("page.title");
    if (title !== "page.title") document.title = title;
  }

  function setLanguage(lang, rerender) {
    current = lang === "es" ? "es" : "en";
    try {
      localStorage.setItem(LANG_KEY, current);
    } catch (_) {}
    apply();
    if (rerender && typeof root.rebuildForLanguage === "function") {
      root.rebuildForLanguage();
    }
  }

  function initToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      setLanguage(current === "es" ? "en" : "es", true);
    });
  }

  current = detect();

  root.NodeFlowI18n = {
    t: t,
    tData: tData,
    apply: apply,
    init: function () {
      apply();
      initToggle();
    },
    get lang() {
      return current;
    },
    setLanguage: setLanguage,
  };

  /* short aliases for main.js */
  root.t = t;
  root.tData = tData;
})(typeof self !== "undefined" ? self : this);
