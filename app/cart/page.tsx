"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag size={64} className="text-zinc-200 dark:text-zinc-800 mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Tu carrito está vacío</h1>
        <p className="text-zinc-500 mb-8 max-w-md text-center">Parece que aún no has agregado ningún artículo a tu carrito de compras.</p>
        <Link 
          href="/catalog"
          className="bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest px-8 py-4 rounded hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-12">Carrito de Compras</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <div className="col-span-6">Producto</div>
            <div className="col-span-3 text-center">Cantidad</div>
            <div className="col-span-2 text-right">Precio</div>
            <div className="col-span-1 text-right"></div>
          </div>
          
          <div className="flex flex-col gap-6 mt-6">
            {items.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg md:bg-transparent md:p-0 md:rounded-none md:border-b md:border-zinc-200 md:dark:border-white/10 md:pb-6">
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <div className="relative w-24 h-32 bg-zinc-200 dark:bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{item.name}</h3>
                    <p className="text-zinc-500 text-sm mt-1">Talla: <span className="font-bold text-zinc-900 dark:text-white">{item.selectedSize}</span></p>
                    <p className="text-zinc-900 dark:text-white font-bold md:hidden mt-2">${item.price}</p>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center mt-4 md:mt-0">
                  <div className="flex items-center gap-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-transparent px-3 py-2 rounded text-zinc-900 dark:text-white">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="hover:text-red-500 transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="hover:text-green-500 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 hidden md:flex justify-end items-center font-bold text-zinc-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="col-span-1 md:col-span-1 flex justify-end items-center absolute md:relative right-4 top-4 md:right-0 md:top-0">
                  <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-zinc-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-8 rounded-lg sticky top-24">
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-6 border-b border-zinc-200 dark:border-white/10 pb-4">Resumen</h2>
            
            <div className="flex justify-between items-center mb-4 text-zinc-600 dark:text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-900 dark:text-white font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-zinc-600 dark:text-zinc-400">
              <span>Envío</span>
              <span className="text-zinc-900 dark:text-white font-bold">Gratis</span>
            </div>
            
            <div className="flex justify-between items-center mb-8 pt-6 border-t border-zinc-200 dark:border-white/10 text-lg">
              <span className="font-black text-zinc-900 dark:text-white">Total</span>
              <span className="font-black text-zinc-900 dark:text-white">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="block text-center w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 rounded hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
            >
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
