import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterBarWrapper } from "@/components/catalog/FilterBarWrapper";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  const products = await getProducts(category);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4">
          Todos los Productos {category && `- ${category}`}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">Equípate con lo más nuevo en ropa deportiva.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <FilterBarWrapper initialCategory={category || "Todos"} />
        
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">
              <p>No se encontraron productos en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
