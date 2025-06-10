// scripts/importarTema02.ts
import fs from "fs";
import path from "path";
import { db } from "@/lib/firebase-admin";

const filePath = path.resolve("public/data/Tema_02.json");
const rawData = fs.readFileSync(filePath, "utf8");
const preguntas = JSON.parse(rawData);

async function importarPreguntas() {
  const batchPromises = [];

  preguntas.forEach((p) => {
    const newDoc = db.collection("questions").doc();
    batchPromises.push(newDoc.set(p));
  });

  await Promise.all(batchPromises);
  console.log(`✅ ${preguntas.length} preguntas del Tema 02 importadas.`);
}

importarPreguntas().catch(console.error);