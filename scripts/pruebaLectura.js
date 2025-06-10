import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "Tema_02.json");

console.log(`📄 Intentando leer desde: ${filePath}`);

if (!fs.existsSync(filePath)) {
  console.error("❌ Archivo NO encontrado");
} else {
  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const preguntas = JSON.parse(rawData);
    console.log(`✅ Archivo leído correctamente`);
    console.log(`🔢 Total de preguntas: ${preguntas.length}`);
    console.log(`📌 Primera pregunta:`, preguntas[0]);
  } catch (err) {
    console.error("❌ Error al leer o parsear el archivo:", err.message);
  }
}