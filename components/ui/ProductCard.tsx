"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("¡Por favor, selecciona una talla primero!");
      return;
    }
    addItem(product, selectedSize);
    setSelectedSize(null);
  };

  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick Add overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-zinc-200/90 dark:from-black/80 to-transparent">
          <div className="flex gap-2 mb-3 justify-center">
            {product.sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 border flex items-center justify-center text-xs font-bold transition-colors ${
                  selectedSize === size 
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white' 
                    : 'bg-white/50 text-zinc-900 dark:bg-black/50 dark:text-white border-zinc-400 dark:border-white/20 hover:border-zinc-900 dark:hover:border-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
      
      <div className="flex flex-col">
        <h3 className="font-bold text-zinc-900 dark:text-white text-sm tracking-wide">{product.name}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">${product.price}</p>
      </div>
    </div>
  );
}
