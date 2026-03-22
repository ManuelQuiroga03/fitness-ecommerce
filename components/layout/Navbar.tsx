"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCartDrawer);
  
  const user = useAuthStore((state) => state.user);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-zinc-900 dark:text-white">
            <Menu size={24} />
          </button>
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">
            LIFT.APP
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
          <Link href="/catalog?category=Hombres" className="hover:text-black dark:hover:text-white transition-colors">Hombres</Link>
          <Link href="/catalog?category=Mujeres" className="hover:text-black dark:hover:text-white transition-colors">Mujeres</Link>
          <Link href="/catalog?category=Accesorios" className="hover:text-black dark:hover:text-white transition-colors">Accesorios</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 text-zinc-900 dark:text-white">
          <ThemeToggle />
          
          <button className="hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4 text-sm font-bold">
              <Link href="/mis-compras" className="flex items-center gap-2 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors">
                <User size={20} />
                <span className="hidden lg:inline">Hola, {user.name}</span>
              </Link>
              <button 
                onClick={() => useAuthStore.getState().logout()}
                className="hover:text-red-500 transition-colors uppercase tracking-widest text-xs"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors text-sm font-bold">
              <User size={20} />
              <span className="hidden lg:inline">Iniciar Sesión</span>
            </Link>
          )}

          <button 
            className="flex items-center gap-2 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors relative"
            onClick={toggleCart}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
