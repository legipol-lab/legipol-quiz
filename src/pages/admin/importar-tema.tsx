// src/pages/admin/importar-tema.tsx

"use client";

import { useState, useEffect } from "react"; // ✅ Aquí está la solución
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ImportarTemaPage() {
  const [user, setUser] = useState<any>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Solo tú puedes acceder
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u || u.email !== "rbados82@gmail.com") {
        setMensaje("❌ Acceso denegado");
        return;
      }
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // Leer archivo JSON y subir preguntas a Firebase
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!archivo) {
      setMensaje("⚠️ Selecciona un archivo válido");
      return;
    }

    setCargando(true);
    setMensaje("⏳ Leyendo archivo...");

    try {
      const texto = await archivo.text();
      const preguntas = JSON.parse(texto);

      setMensaje(`✅ Archivo cargado. ${preguntas.length} preguntas listas`);

      // Subir a Firestore
      const preguntasRef = collection(db, "questions");

      for (let i = 0; i < preguntas.length; i++) {
        const p = preguntas[i];

        // Extraer tema desde categoría
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
        const respuestaCorrecta = p.answers.findIndex(
          (a: any) => a.correct === "1"
        );

        await addDoc(preguntasRef, {
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
      }

      setMensaje(`🎉 Preguntas importadas correctamente.`);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al procesar el archivo.");
    } finally {
      setCargando(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>{mensaje || "Cargando..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black py-4 shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide text-yellow-400">LEGIPOL · Panel del Administrador</h1>
          <button
            onClick={() => {
              getAuth().signOut();
              router.push("/auth/login");
            }}
            className="text-red-500 hover:text-red-700"
          >
            🔒 Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-2xl font-bold">Importar Preguntas por Tema</h2>

        <p className="text-gray-600 mb-6">
          Aquí puedes importar preguntas de un único tema.
        </p>

        {/* Formulario de carga */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
          <label className="block mb-2 text-sm font-medium">Selecciona un archivo JSON:</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleSubmit}
            disabled={!archivo || cargando}
            className={`mt-4 w-full py-2 px-4 ${
              !archivo || cargando
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            } text-black font-semibold rounded-md`}
          >
            {cargando ? "Subiendo preguntas..." : "Importar preguntas"}
          </button>

          {/* Mensaje de estado */}
          {mensaje && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 border-l-4 border-blue-500">
              {mensaje}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}