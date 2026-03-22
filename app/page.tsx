import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] bg-zinc-900 dark:bg-black">
        <Image 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000"
          alt="Atleta entrenando"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Desafía tus Límites
          </h1>
          <p className="text-zinc-200 dark:text-zinc-300 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
            Ropa deportiva premium diseñada para elevar tu rendimiento. Creada en las sombras, lista para destacar.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/catalog?category=Hombres"
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
            >
              Comprar Hombres
            </Link>
            <Link 
              href="/catalog?category=Mujeres"
              className="px-8 py-4 bg-transparent border border-white text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
            >
              Comprar Mujeres
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12 border-b border-zinc-200 dark:border-white/10 pb-4">
          <h2 className="text-3xl font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Nuevos Lanzamientos
          </h2>
          <Link href="/catalog" className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Ver Todo
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-zinc-100 dark:bg-zinc-950 py-24 border-t border-b border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">Construidos para los Implacables</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
            No solo hacemos ropa. Forjamos armaduras para los dedicados. Cada costura y cada tejido son seleccionados para soportar los entrenamientos más agotadores sin perder el estilo en las calles.
          </p>
        </div>
      </section>
    </div>
  );
}
