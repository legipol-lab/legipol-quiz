import fs from "fs";
import path from "path";

// Ruta donde debe estar el archivo
const filePath = path.join(process.cwd(), "config", "serviceAccountKey.json");

console.log(`🔍 Buscando archivo en: ${filePath}`);

if (fs.existsSync(filePath)) {
  console.log("✅ ¡Archivo encontrado!");

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(content);
    console.log("📄 Archivo leído correctamente");
    console.log("📌 Contenido (primeras claves):", Object.keys(json));
  } catch (err) {
    console.error("❌ Error al leer o parsear el archivo:", err.message);
  }

} else {
  console.error("❌ Archivo NO encontrado. Revisa la ruta:");
  console.error(filePath);
}