import { Product } from "@/types";

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Playera Oversize Esencial",
    description: "Algodón de alto gramaje con corte oversize, perfecta para levantar pesas o descansar.",
    price: 35,
    category: "Hombres",
    sizeOptions: ["S", "M", "L", "XL"],
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  },
  {
    id: "p2",
    name: "Shorts de Compresión Performance",
    description: "Tela absorbente de sudor con bolsillo seguro para el teléfono.",
    price: 45,
    category: "Hombres",
    sizeOptions: ["M", "L", "XL"],
    imageUrl: "https://images.unsplash.com/photo-1611004144177-8cbf6ee0dc28?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  },
  {
    id: "p3",
    name: "Leggings Esculpidos sin Costuras",
    description: "Cintura alta, ajuste contorneado diseñado para el máximo rango de movimiento.",
    price: 60,
    category: "Mujeres",
    sizeOptions: ["XS", "S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  },
  {
    id: "p4",
    name: "Top Deportivo Signature",
    description: "Soporte medio y paneles de malla transpirables.",
    price: 40,
    category: "Mujeres",
    sizeOptions: ["S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  },
  {
    id: "p5",
    name: "Straps de Levantamiento Pro",
    description: "Algodón resistente con acolchado de neopreno.",
    price: 15,
    category: "Accesorios",
    sizeOptions: ["Unitalla"],
    imageUrl: "https://images.unsplash.com/photo-1584735174965-48c48d4eff6a?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  },
  {
    id: "p6",
    name: "Mochila de Entrenamiento Diario",
    description: "Múltiples compartimentos, incluye bolsillo para equipo mojado.",
    price: 55,
    category: "Accesorios",
    sizeOptions: ["Unitalla"],
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    inStock: true,
  }
];

export async function getProducts(category?: string): Promise<Product[]> {
  // Simular latencia de base de datos
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (category && category !== 'Todos') {
    return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  
  return mockProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts.slice(0, 4);
}
