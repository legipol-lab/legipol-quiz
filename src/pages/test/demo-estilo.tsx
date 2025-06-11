// src/pages/test/demo-estilo.tsx

"use client";
import React, { useState } from "react";

export default function DemoEstilo() {
  const [seleccionado, setSeleccionado] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#F4D00C] mb-6">
          🎨 Demo de Estilo LEGIPOL
        </h1>

        <div
          className={`p-6 rounded-xl shadow-xl border transition-all duration-300 cursor-pointer mb-8 ${
            seleccionado
              ? "bg-[#F4D00C] text-black border-yellow-300"
              : "bg-[#082956] border-[#F4D00C] hover:scale-[1.02]"
          }`}
          onClick={() => setSeleccionado(!seleccionado)}
        >
          <h2 className="text-xl font-bold mb-2">Tarjeta Interactiva</h2>
          <p className="text-sm">
            {seleccionado
              ? "✅ Seleccionado (haz clic para desmarcar)"
              : "Haz clic para seleccionarla"}
          </p>
        </div>

        <div className="bg-[#082956] border border-[#F4D00C] rounded-xl p-6 space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-[#F4D00C]">
            Controles de ejemplo
          </h3>
          <label className="block text-sm font-semibold">
            Campo de texto:
            <input
              type="text"
              placeholder="Escribe algo..."
              className="w-full mt-1 p-2 rounded bg-black text-[#F4D00C] border border-[#F4D00C]"
            />
          </label>

          <label className="block text-sm font-semibold mt-4">
            Selección:
            <select className="w-full mt-1 p-2 rounded bg-black text-[#F4D00C] border border-[#F4D00C]">
              <option>Opción A</option>
              <option>Opción B</option>
              <option>Opción C</option>
            </select>
          </label>

          <button className="mt-6 bg-[#F4D00C] text-black px-6 py-2 rounded font-bold hover:bg-yellow-300 transition">
            💾 Guardar prueba
          </button>
        </div>
      </div>
    </main>
  );
}
