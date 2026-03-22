import { Product } from "@/types";
import { supabase } from "@/lib/supabase";

export async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase.from('products').select(`
    *,
    variants (
      size,
      stock
    )
  `);
  
  if (category && category !== 'Todos') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select(`
    *,
    variants (
      size,
      stock
    )
  `).limit(4);
  
  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
  
  return data.map(mapProduct);
}

function mapProduct(row: Record<string, any>): Product {
  const variants = row.variants || [];
  const sizeOptions = Array.from(new Set(variants.map((v: { size: string }) => v.size))) as string[];
  const inStock = variants.some((v: { stock: number }) => v.stock > 0);

  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: row.price,
    category: row.category || 'Accesorios',
    sizeOptions,
    imageUrl: row.image_url || row.imageUrl || '',
    inStock
  };
}
