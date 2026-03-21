"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { createOrder } from "@/lib/api/orders";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";

function CheckoutContent() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (items.length === 0 && !isProcessing) {
    if (typeof window !== 'undefined') {
      router.push("/cart");
    }
    return null;
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order creation on the mock backend
    const order = await createOrder(items, getTotalPrice());
    
    // Process success
    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-4 mb-12 border-b border-zinc-200 dark:border-white/10 pb-6">
        <ShieldCheck size={32} className="text-green-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
          Pago Seguro
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            {/* CÓDIGO DE CONTACTO */}
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-white/10">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <Truck size={20} /> Información de Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-2">Nombre Completo</label>
                  <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500" placeholder="Ej. Arnold S." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-2">Dirección Completa</label>
                  <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500" placeholder="Calle, Número, Colonia" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-2">Ciudad</label>
                  <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500" placeholder="Ciudad" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-2">Código Postal</label>
                  <input type="text" required className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-3 rounded text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500" placeholder="12345" />
                </div>
              </div>
            </div>

            {/* PAGO SIMULADO */}
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-white/10">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                <CreditCard size={20} /> Método de Pago
              </h2>
              <div className="bg-white dark:bg-zinc-950 p-4 rounded border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-4 mb-4">
                <input type="radio" checked readOnly className="mt-1" />
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white text-base">Pago de Prueba (Simulado)</p>
                  <p>No se realizarán cargos reales a ninguna tarjeta. Todas las órdenes en esta versión son simuladas localmente.</p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 rounded-lg sticky top-24">
            <h2 className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-6 border-b border-zinc-200 dark:border-white/10 pb-4">Tu Orden</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                  <div className="relative w-16 h-20 bg-zinc-200 dark:bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-zinc-500 text-xs mt-1">Talla: {item.selectedSize}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-zinc-500 text-xs mt-1">Cant: {item.quantity}</p>
                      <p className="text-zinc-900 dark:text-white font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-zinc-200 dark:border-white/10 text-xl">
              <span className="font-black text-zinc-900 dark:text-white">Total</span>
              <span className="font-black text-zinc-900 dark:text-white">${getTotalPrice().toFixed(2)}</span>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 rounded hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Procesando..." : "Confirmar Orden"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen">Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
