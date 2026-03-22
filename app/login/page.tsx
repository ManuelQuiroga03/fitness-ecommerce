"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError("");
    setLoading(true);
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-black p-3 rounded-full mb-4">
            <Dumbbell size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-zinc-900 dark:text-white">Iniciar Sesión</h1>
          <p className="text-sm text-zinc-500 text-center mt-2">Ingresa a tu cuenta para continuar tus compras y ver tu historial.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm font-bold px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="atleta@lift.app"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 rounded hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors mt-2 shadow-lg disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          ¿No tienes cuenta? <Link href="/registro" className="text-zinc-900 dark:text-white font-bold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
