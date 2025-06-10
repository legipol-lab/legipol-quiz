// scripts/importarPreguntas.ts

import fs from "fs";
import path from "path";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializa Firebase Admin SDK
initializeApp();
const db = getFirestore();

// Ruta al archivo JSON local
const filePath = path.resolve("public/data/preguntas.json");
const rawData = fs.readFileSync(filePath, "utf8");
const preguntas = JSON.parse(rawData);

console.log(`✅ Archivo cargado. Total de preguntas: ${preguntas.length}`);

// Colección donde guardarás las preguntas
const preguntasRef = db.collection("questions");

(async () => {
  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];

    // Limpiar nombre del tema
    const match = p.category.match(/TEMA (\d+) - (.*?) - (Primera|Segunda) Vuelta/i);
    const tema = match ? `Tema ${match[1]}. ${match[2]}` : p.category;

    // Determinar área temática
    let area = "Ciencias Jurídicas";
    if (tema && parseInt(tema.split(" ")[1]) > 26) {
      area = "Ciencias Sociales";
    }
    if (tema && parseInt(tema.split(" ")[1]) > 37) {
      area = "Materias Técnico-Científicas";
    }

    // Índice de respuesta correcta
    const opciones = p.answers.map((a: any) => a.answer);
    const respuestaCorrecta = p.answers.findIndex((a: any) => a.correct === "1");

    // Subir a Firebase
    await preguntasRef.add({
      area,
      tema,
      tipo: p.category.includes("Primera") ? "primera_vuelta" : "segunda_vuelta",
      dificultad: p.type === "radio" ? "fácil" : "media",
      enunciado: p.question,
      opciones,
      correcta: respuestaCorrecta,
      explicacion: p.explanation || "",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log(`✅ Pregunta "${p.id}" guardada`);
  }

  console.log(`🎉 ${preguntas.length} preguntas importadas correctamente.`);
})();