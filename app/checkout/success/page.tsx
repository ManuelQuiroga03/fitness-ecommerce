"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-10 rounded-xl shadow-2xl text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4">
          ¡Orden Confirmada!
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Tu pago simulado fue procesado con éxito. Gracias por unirte a la legión LIFT.
        </p>

        {orderId && (
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Número de Orden</p>
            <p className="text-lg font-mono text-zinc-900 dark:text-white font-bold">{orderId}</p>
          </div>
        )}

        <Link 
          href="/catalog"
          className="inline-block w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 rounded hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors"
        >
          Ir Al Catálogo
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
