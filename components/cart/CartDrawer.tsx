"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    toggleCartDrawer, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
        onClick={toggleCartDrawer}
      />
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-white/10 z-[70] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-white/10">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 dark:text-white">Tu Carrito</h2>
          <button 
            onClick={toggleCartDrawer}
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <p className="mb-4 text-center">Tu carrito está vacío.</p>
              <button 
                onClick={toggleCartDrawer}
                className="text-zinc-900 dark:text-white border-b border-zinc-900 dark:border-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors uppercase text-sm font-bold tracking-widest"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-white/5">
                <div className="relative w-20 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{item.name}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">Talla: {item.selectedSize}</p>
                    <p className="text-zinc-900 dark:text-white font-bold text-sm mt-2">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-transparent px-2 py-1 rounded text-zinc-900 dark:text-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 hover:text-green-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex justify-between items-center mb-6 text-zinc-900 dark:text-white text-lg">
              <span className="font-bold">Total</span>
              <span className="font-black">${getTotalPrice().toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={toggleCartDrawer}
              className="block text-center w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors rounded-sm shadow-xl"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
