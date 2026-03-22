"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/api/orders";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, Calendar, Tag, ArrowLeft } from "lucide-react";

export default function MisComprasPage() {
  const router = useRouter();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      // Pequeño timeout para permitir que la sesión de Zustand se rehidrate desde Supabase
      await new Promise(r => setTimeout(r, 200));
      const user = useAuthStore.getState().user;
      
      if (!user) {
        if (active) router.push("/login");
        return;
      }

      const data = await getUserOrders();
      if (active) {
        setOrders(data);
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin dark:border-white dark:border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-6">
            <ArrowLeft size={16} /> Volver a comprar
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4">
            Historial de Compras
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Todo tu equipamiento. Un solo lugar.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10">
            <Package className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Sin Compras Aún</h2>
            <p className="text-zinc-500 mb-6 font-medium">Parece que aún no tienes equipo LIFT. Es hora de empezar el entrenamiento.</p>
            <Link 
              href="/catalog"
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors inline-block rounded shadow-lg"
            >
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-zinc-100 dark:bg-zinc-950 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-bold mb-1">
                      <Calendar size={16} />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                      Orden #{order.id.split('-')[0].toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end w-full sm:w-auto">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 mb-2">
                      <span className="text-xs uppercase font-bold text-zinc-500">Total:</span>
                      <span className="text-lg font-black text-zinc-900 dark:text-white">${order.total}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-sm">
                      {order.status === 'pending' ? 'PREPARANDO' : 'COMPLETADA'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-6 group">
                        <div className="relative w-20 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <Image 
                              src={item.imageUrl} 
                              alt={item.name} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Tag size={24} className="text-zinc-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                          <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-2 md:text-lg">{item.name}</h4>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                            <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-xs uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                              Talla: {item.selectedSize}
                            </span>
                            <span>Cant: {item.quantity}</span>
                            <span className="text-zinc-900 dark:text-white">${item.price} c/u</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
