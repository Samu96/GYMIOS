// Añade a Info.plist los permisos que necesita la app. Se puede ejecutar varias veces sin duplicar nada.
import fs from "node:fs";
import path from "node:path";

const plist = path.resolve("ios/App/App/Info.plist");
if (!fs.existsSync(plist)) {
  console.error("No encuentro ios/App/App/Info.plist. Ejecuta antes: npx cap add ios");
  process.exit(1);
}

let x = fs.readFileSync(plist, "utf8");
const strings = [
  ["NSCameraUsageDescription", "Para fotografiar las máquinas del gimnasio y analizarlas."],
  ["NSPhotoLibraryUsageDescription", "Para elegir imágenes de ejercicios y restaurar copias de seguridad."],
  ["NSMicrophoneUsageDescription", "Para dictar mensajes al asistente."],
  ["NSSpeechRecognitionUsageDescription", "Para convertir tu voz en texto en el asistente."],
  ["NSLocalNetworkUsageDescription", "Para conectar con tu servidor de IA en la red local."],
];
let add = "";
for (const [key, text] of strings) {
  if (!x.includes(`<key>${key}</key>`)) add += `\t<key>${key}</key>\n\t<string>${text}</string>\n`;
}
if (!x.includes("<key>NSAppTransportSecurity</key>")) {
  add += "\t<key>NSAppTransportSecurity</key>\n\t<dict>\n\t\t<key>NSAllowsLocalNetworking</key>\n\t\t<true/>\n\t</dict>\n";
}
if (!x.includes("<key>ITSAppUsesNonExemptEncryption</key>")) {
  add += "\t<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>\n";
}
if (add) {
  const next = x.replace(/<\/dict>\s*<\/plist>\s*$/, add + "</dict>\n</plist>\n");
  if (next === x) { console.error("No he podido editar Info.plist."); process.exit(1); }
  x = next;
}
fs.writeFileSync(plist, x);
console.log("Listo: permisos de cámara, fotos, micrófono, voz y red local añadidos a Info.plist.");
