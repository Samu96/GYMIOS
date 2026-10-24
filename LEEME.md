# Mi entreno: pasarlo a iPhone

No se puede crear un .ipa sin un Mac con Xcode y una cuenta de Apple (firma).
Este proyecto deja todo preparado para que lo generes tú en unos minutos.

## Requisitos
- Un Mac con Xcode (App Store) y Node.js (nodejs.org)
- Un Apple ID. La cuenta gratuita sirve para instalar en tu propio iPhone,
  pero la app caduca a los 7 días y hay que reinstalarla.
  Con el Apple Developer Program (99 USD al año) dura un año y puedes usar TestFlight.
- Un proveedor de IA (ver más abajo). Hay opciones sin cobro por uso.

## Pasos
1. Abre Terminal en esta carpeta.
2. `npm install @capacitor/core @capacitor/cli @capacitor/ios`
3. Cambia `appId` en `capacitor.config.json` por uno tuyo (por ejemplo com.pepe.mientreno).
4. `npx cap add ios`
5. `npx cap sync`
6. Abre `ios/App/App/Info.plist` y añade:
   - `NSCameraUsageDescription`: Para fotografiar las máquinas del gimnasio
   - `NSPhotoLibraryUsageDescription`: Para elegir imágenes de ejercicios
   - Solo si quieres dictar por voz dentro de la app (puede no estar disponible en iOS):
     - `NSMicrophoneUsageDescription`: Para dictar al asistente
     - `NSSpeechRecognitionUsageDescription`: Para convertir tu voz en texto
   - Solo si usas Ollama en tu red local con http:
     - `NSLocalNetworkUsageDescription`: Para conectar con tu servidor de IA
     - `NSAppTransportSecurity` (Dictionary) > `NSAllowsLocalNetworking` (Boolean) = YES
7. `npx cap open ios` (se abre Xcode)
8. En Xcode: App > Signing & Capabilities > Team: elige tu Apple ID.
9. Conecta el iPhone, selecciónalo arriba y pulsa Run.
   En el iPhone: Ajustes > General > VPN y gestión de dispositivos > confía en tu perfil.

## Para obtener el .ipa
En Xcode: Product > Archive > Distribute App > Development (o Ad Hoc).
Para TestFlight hace falta el Developer Program.

## IA sin pagar por uso
En la app: Ajustes (engranaje) > Conexión con la IA. Elige proveedor, pega la clave y pulsa Probar conexión.
- Gemini: clave en aistudio.google.com/apikey. Tiene nivel gratuito con límites, pero en la UE puede
  exigir facturación. Compruébalo al crear la clave.
- Groq: clave gratuita en console.groq.com/keys, con límites.
- Mistral: plan gratuito en console.mistral.ai, con límites.
- OpenRouter: clave en openrouter.ai/keys; usa un modelo que termine en :free.
- Ollama: gratis y privado en tu servidor. Instálalo, ejecuta `ollama pull llama3.2`,
  arráncalo con `OLLAMA_ORIGINS=* ollama serve` y pon en la app la URL de tu servidor
  (por ejemplo http://192.168.1.10:11434/v1). Para analizar fotos usa un modelo con visión.
- Claude: se cobra por uso en la API de Anthropic.
Los nombres de modelo y los límites gratuitos cambian: revisa la web de cada proveedor.
Los modelos pequeños pueden fallar con el formato de las respuestas; en ese caso la app
usa una propuesta automática.

## Voz
El botón del micrófono del asistente usa el reconocimiento de voz del navegador. En la app del iPhone
puede no estar disponible; si no aparece, usa el micrófono del teclado de iOS para dictar.

## Datos
Ajustes > Copia de seguridad: copia tus datos de la versión web y pégalos en la app con Restaurar.
Los datos no se comparten solos entre ambas.

## Actualizar la app
Si cambias `www/index.html`, repite `npx cap sync` y vuelve a ejecutar desde Xcode.
