# Mi entreno para iPhone (Xcode)

App nativa (no es una web): se compila en Xcode e usa avisos, voz, vibración, pantalla encendida
y compartir archivos del iPhone. Está hecha con Capacitor 7.

## Qué necesitas
- Un Mac con Xcode 16 o superior (App Store)
- Node.js 20 o superior (nodejs.org)
- CocoaPods: `sudo gem install cocoapods` (o `brew install cocoapods`)
- Un Apple ID. La cuenta gratuita sirve para instalar en tu propio iPhone, pero la app caduca a los 7 días
  y hay que reinstalarla desde Xcode. Con el Apple Developer Program (99 USD al año) dura un año
  y puedes usar TestFlight.
- El iPhone con iOS 14 o superior, conectado por cable (o por Wi-Fi tras emparejarlo en Xcode).

## Preparar el iPhone
1. Ajustes > Privacidad y seguridad > Modo de desarrollador: actívalo y reinicia (iOS 16 o superior).
2. Conecta el cable y acepta "Confiar en este ordenador".

## Instalar (una sola vez)
En Terminal, dentro de esta carpeta:

    npm install
    npm run setup
    npm run open

- `npm run setup` crea el proyecto iOS, añade los permisos a Info.plist y copia la app.
- `npm run open` abre Xcode.

Antes puedes cambiar `appId` en `capacitor.config.json` por uno tuyo (por ejemplo com.pepe.mientreno).

## En Xcode
1. Panel izquierdo: App > pestaña Signing & Capabilities > Team: elige tu Apple ID.
   Si pide un Bundle Identifier único, cambia el que tienes por otro (por ejemplo com.pepe.mientreno2).
2. Arriba, elige tu iPhone como destino.
3. Pulsa Run (triángulo). La primera vez, en el iPhone:
   Ajustes > General > VPN y gestión de dispositivos > tu perfil > Confiar.

## Para obtener el .ipa o subir a TestFlight
Destino "Any iOS Device (arm64)" > Product > Archive > Distribute App.
- "Development" o "Ad Hoc" generan un .ipa instalable en dispositivos registrados.
- TestFlight y App Store requieren el Apple Developer Program.

## Permisos y avisos
- Al marcar tu primera serie, iOS pide permiso de notificaciones: acepta.
- Ajustes (engranaje de la app) > Avisos del móvil > "Probar aviso (5 s)": bloquea la pantalla y debe sonar a los 5 segundos.
- El aviso de fin de descanso se programa en el sistema: llega con la app en segundo plano o con la pantalla bloqueada.
- Con la app abierta suena un pitido y vibra. El banner del sistema puede no mostrarse en primer plano.
- Un Modo de concentración activo puede silenciar el aviso: permite Mi entreno en sus excepciones.
- Con el modo de ahorro de batería, iOS puede retrasar tareas en segundo plano, pero los avisos locales programados se mantienen.

## Voz
El micrófono del asistente usa el reconocimiento de voz de iOS. La primera vez pide permiso de micrófono
y de reconocimiento de voz. Si no te deja dictar, revisa Ajustes del iPhone > Mi entreno.
Alternativa: el micrófono del teclado de iOS funciona en cualquier campo de texto.

## IA (sin la suscripción de Claude)
Fuera de claude.ai no existe el Claude integrado, así que hay que configurar un proveedor:
Ajustes > Conexión con la IA. Elige proveedor, pega la clave y pulsa "Probar conexión".
Las llamadas se hacen con el módulo HTTP nativo (sin problemas de CORS).
- Claude: cobra por uso en la API.
- Gemini: clave gratuita con límites, pero en la UE puede exigir facturación.
- Groq, Mistral, OpenRouter: planes gratuitos con límites.
- Ollama en tu servidor: gratis y privado. Pon la URL, por ejemplo http://192.168.1.10:11434/v1.
  El script de permisos ya activa la red local con http. La primera vez iOS pregunta si permites
  conectar con dispositivos de la red local: acepta. Arranca Ollama con OLLAMA_ORIGINS=* y escuchando
  en la red (OLLAMA_HOST=0.0.0.0).

## Copias de seguridad
Ajustes > Copia de seguridad: "Guardar archivo de copia" abre el menú de compartir de iOS (AirDrop, Archivos, iCloud Drive, Mensajes…).
Para importar en otro dispositivo: "Importar archivo" o pega el texto.
Los datos viven dentro de la app: si la desinstalas, se pierden. Haz copia antes. Con la cuenta gratuita de Apple,
la app caduca a los 7 días: reinstalarla desde Xcode con el mismo Bundle Identifier conserva los datos.

## Actualizar la app
Cambia `www/index.html`, ejecuta `npm run sync` y pulsa Run en Xcode.

## Problemas típicos
- "pod: command not found": instala CocoaPods (ver arriba) y repite `npm run setup`.
- "Signing for App requires a development team": elige tu Team en Signing & Capabilities.
- "Untrusted Developer" en el iPhone: Ajustes > General > VPN y gestión de dispositivos > Confiar.
- "Failed to register bundle identifier": cambia el Bundle Identifier por otro único.
