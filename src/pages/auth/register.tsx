// src/pages/auth/register.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";



export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("🟡 handleSubmit: iniciando registro…");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("🟢 Usuario creado en Auth:", userCredential.user.uid);

      const uid = userCredential.user.uid;
      const alias = "LEG" + Math.floor(1000 + Math.random() * 9000);

      await setDoc(doc(db, "users", uid), {
        alias,
        email,
        createdAt: serverTimestamp(),
        bestScore: 0,
        bestScoreDate: null,
      });
      console.log("🟢 Alias guardado en Firestore:", alias);

      console.log("🟡 Redirigiendo a /dashboard...");
      await router.push("/dashboard");
      console.log("🟢 Después de router.push");
    } catch (e) {
      console.error("🔴 Error en handleSubmit:", e);
      setError((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Registro de Usuario</h1>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
